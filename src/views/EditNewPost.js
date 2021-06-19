import React from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'shards-react';
import { withTranslation } from 'react-i18next';

import PageTitle from '@/components/common/PageTitle';
import Title from '@/components/add-new-post/Title';
// import Price from '../components/add-new-post/Price';

import Editor from '@/components/add-new-post/Editor';
import FileUpload from '@/components/components-overview/FileUpload';
import SidebarActions from '@/components/add-new-post/SidebarActions';
import SidebarCategories from '@/components/add-new-post/Step2';
import { savePost, getMyPost, clearPost } from '@/functions';
// import {Store} from "../flux";
import store from '@/functions/store';

class EditNewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      load: true,
      activePage: 1,
      type: store.getState().store.type || 'normal',
    };
    const { match = {} } = props;
    if (match.params && match.params._id) {
      getMyPost(match.params._id).then((data) => {
        console.log('set _id to edit:', data);
        savePost(data);
        this.setState({ load: false });
      });
    }
  }

  clickOnNext(n) {
    this.setState({ activePage: n });
    window.scrollTo(0, 0);
  }

  clickOnPrev(n) {
    this.setState({ activePage: n });
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    clearPost();
    window.location.reload();
  }

  addTANDD() {
    let { title, description } = store.getState().store;
    document.getElementById('TRESDFG').innerHTML = description;
    document.getElementById('TRESDFGf').innerHTML = title;
  }

  render() {
    const { load, activePage, type } = this.state;
    const { t } = this.props;
    if (load)
      return (
        <Container fluid className="main-content-container px-4 pb-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="12"
              title={t('edit post')}
              className="text-sm-left"
            />
          </Row>
        </Container>
      );
    else
      return (
        <Container fluid className="main-content-container px-4 pb-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="12"
              title={t('edit post')}
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="3"></Col>
            <Col lg="6">
              <div className={'activePage d' + activePage}>
                <div className="asdf d1">
                  <SidebarCategories edit={true} />
                  <ButtonGroup className="mb-3 left">
                    <Button
                      theme="primary"
                      onClick={() => {
                        this.clickOnNext(2);
                      }}>
                      {t('next step')}
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="asdf d2">
                  <Row>
                    <Col lg="12">
                      <ButtonGroup className="mb-3">
                        <Button
                          theme="white"
                          onClick={() => {
                            this.clickOnPrev(1);
                          }}>
                          {t('previous step')}
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <Title edit={true} />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <Editor edit={true} />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <ButtonGroup className="mb-3 left">
                        <Button
                          theme="primary"
                          onClick={() => this.clickOnNext(3)}>
                          {t('next step')}
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </div>
                <div className="asdf d3">
                  <Row>
                    <ButtonGroup className="mb-3">
                      <Button theme="white" onClick={() => this.clickOnPrev(2)}>
                        {t('previous step')}
                      </Button>
                    </ButtonGroup>
                  </Row>
                  <Row>
                    <Col lg="4" md="4">
                      <FileUpload
                        edit={true}
                        label={t('add image')}
                        icon={<i className="material-icons">add_a_photo</i>}
                        kind="image"
                      />
                    </Col>
                    <Col lg="4" md="4">
                      <FileUpload
                        edit={true}
                        icon={<i className="material-icons">add_box</i>}
                        kind="video"
                        label={t('add video')}
                      />
                    </Col>
                    <Col lg="4" md="4">
                      <FileUpload
                        className="audio"
                        edit={true}
                        icon={<i className="material-icons">add_box</i>}
                        kind="audio"
                        label={t('add voice')}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <div className="sdcfvg">
                      <ButtonGroup className="mb-3 left">
                        <Button
                          theme="primary"
                          onClick={() => {
                            this.clickOnNext(4);
                            this.addTANDD();
                          }}>
                          {t('next step')}
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Row>
                </div>

                {type && type === 'product' && (
                  <div className="asdf d4">
                    <ButtonGroup className="mb-3">
                      <Button theme="white" onClick={() => this.clickOnPrev(3)}>
                        {t('previous step')}
                      </Button>
                    </ButtonGroup>
                    {/* <Row>
                      <Col lg="12">
                        <Price edit={true} />
                      </Col>
                    </Row> */}
                    <Row>
                      <div className="sdcfvg">
                        <ButtonGroup className="mb-3 left">
                          <Button
                            theme="primary"
                            onClick={() => {
                              this.clickOnNext(5);
                              this.addTANDD();
                            }}>
                            {t('next step')}
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Row>
                  </div>
                )}
                {type && type === 'product' && (
                  <div className="asdf d5">
                    <ButtonGroup className="mb-3">
                      <Button theme="white" onClick={() => this.clickOnPrev(3)}>
                        {t('previous step')}
                      </Button>
                    </ButtonGroup>
                    <SidebarActions edit={true} />
                  </div>
                )}
                {type && type === 'normal' && (
                  <div className="asdf d4">
                    <ButtonGroup className="mb-3">
                      <Button theme="white" onClick={() => this.clickOnPrev(3)}>
                        {t('previous step')}
                      </Button>
                    </ButtonGroup>
                    <SidebarActions edit={true} />
                  </div>
                )}
              </div>
            </Col>
            <Col lg="3"></Col>
          </Row>
        </Container>
      );
  }
}

export default withTranslation()(EditNewPost);
