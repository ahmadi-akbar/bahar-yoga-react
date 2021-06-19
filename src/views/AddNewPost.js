import React from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'shards-react';

import { toast } from 'react-toastify';

import PageTitle from '@/components/common/PageTitle';
import Step1 from '@/components/add-new-post/Step1';
import Step2 from '@/components/add-new-post/Step2';

// import Price from '@/components/add-new-post/Price';
import FileUpload from '@/components/components-overview/FileUpload';
import SidebarActions from '@/components/add-new-post/SidebarActions';

import store from '@/functions/store';
import { withTranslation } from 'react-i18next';
import { clearPost } from '@/functions';

import ChooseCountry from '@/components/ChooseCountry';
import CreateForm from '@/components/components-overview/CreateForm';
import pageData from '@/functions/pageData';

import { $ } from '@/functions/utils';

var mainCategory = store.getState().store.mainCategory;
var catChoosed = store.getState().store.catChoosed;
var tx = '';
if (catChoosed && catChoosed[0] && catChoosed[0]._id) tx = catChoosed[0]._id;
var mainCountry = store.getState().store.mainCountry;
var type = store.getState().store.type;

class AddNewPost extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      render: true,
      activePage: 1,
      parts: null,
      type: type || 'normal',
    };
  }

  nextStep = () => {
    let activePage = this.state.activePage + 1;
    this.setState({ activePage });
    window.scrollTo(0, 0);
  };

  prevStep = () => {
    let activePage = this.state.activePage - 1;
    this.setState({ activePage });
    window.scrollTo(0, 0);
  };

  addTANDD() {
    let { title, description } = store.getState().store;
    $('#TRESDFG').innerHTML = description;
    $('#TRESDFGf').innerHTML = title;
  }

  clearForm() {
    clearPost();
    window.location.reload();
  }

  BackBtn = () => {
    const { t } = this.props;
    return (
      <Button className="mb-3" theme="white" onClick={this.prevStep}>
        <i className="material-icons">{'chevron_' + t('right')}</i>
        {t('last step')}
      </Button>
    );
  };

  ClearButton = () => {
    const { t } = this.props;
    return (
      <Button outline theme="accent" size="sm" onClick={this.clearForm}>
        <i className="material-icons">delete</i>
        {t('reset form')}
      </Button>
    );
  };

  // }
  render() {
    // const {stthis.props;
    const { activePage, type } = this.state;
    const { t, match } = this.props;

    let status = false;

    if (match.params && match.params._status) status = match.params._status;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title={t('add new post')}
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col lg="6" className="m-auto">
            <div className={'activePage d' + activePage}>
              <div className="asdf d1">
                <Step1
                  onMainCategory={(cont) => {
                    if (cont && cont.name) {
                      $('#clickOnFirst').click();
                      $('#CategoryLabel').innerHTML = ' ' + cont.name;
                    }
                  }}
                  onCatChoosed={(catChoosed) => {
                    var l = catChoosed.length;
                    if (
                      catChoosed &&
                      l &&
                      catChoosed[l - 1] &&
                      catChoosed[l - 1]._id
                    )
                      tx = catChoosed[l - 1]._id;
                  }}
                />

                <ButtonGroup className="mb-3 left disabled">
                  {this.ClearButton()}
                  <Button
                    theme="primary"
                    type="submit"
                    id="clickOnFirst"
                    onClick={() => {
                      if (!mainCategory)
                        mainCategory = store.getState().store.mainCategory;

                      console.log('mainCategory', mainCategory);

                      if (mainCategory && mainCategory.name) this.nextStep();
                      else toast.error(t('please choose category...'));
                    }}>
                    {t('next step')}
                    <i className="material-icons">{'chevron_' + t('left')}</i>
                  </Button>
                </ButtonGroup>
              </div>

              <div className="asdf d2">
                <div className="w-100">
                  {this.BackBtn()}

                  <Button className="mb-3 left" theme="primary" outline>
                    <i className="material-icons">category</i>
                    {/* {t('in category') + " "} */}
                    <span id="CategoryLabel">
                      {mainCategory && mainCategory.name}
                    </span>
                  </Button>
                </div>

                {tx && (
                  <Row>
                    {pageData['x' + tx] && (
                      <CreateForm
                        id={tx}
                        buttons={pageData['x' + tx].add.buttons}
                        fields={pageData['x' + tx].add.fields}
                      />
                    )}
                  </Row>
                )}
                <Step2 nextStep={this.nextStep} />
              </div>

              <div className="asdf d3">
                {this.BackBtn()}

                <Row>
                  <Col lg="4" md="4">
                    <FileUpload
                      add={true}
                      label={t('add image')}
                      icon={<i className="material-icons">add_a_photo</i>}
                      kind="image"
                    />
                  </Col>
                  <Col lg="4" md="4">
                    <FileUpload
                      add={true}
                      icon={<i className="material-icons">add_box</i>}
                      kind="video"
                      label={t('add video')}
                    />
                  </Col>
                  <Col lg="4" md="4"></Col>
                </Row>
                <Row>
                  <div className="sdcfvg">
                    <ButtonGroup className="mb-3 left">
                      <Button
                        theme="primary"
                        onClick={() => {
                          this.nextStep();
                          this.addTANDD();
                        }}>
                        {t('next step')}
                        <i className="material-icons">
                          {'chevron_' + t('left')}
                        </i>
                      </Button>
                    </ButtonGroup>
                  </div>
                </Row>
              </div>

              <div className="asdf d4">
                {this.BackBtn()}

                <ChooseCountry
                  add={true}
                  onMainCountry={(cont) => {
                    if (cont && cont.name) {
                      $('#clickOnSecond').click();
                      // $('#CountryLabel').innerHTML = ' ' + mainCountry.name;
                    }
                  }}
                />

                <ButtonGroup className="mb-3 left disabled">
                  {this.ClearButton()}
                  <Button
                    theme="primary"
                    type="submit"
                    id="clickOnSecond"
                    onClick={() => {
                      if (!mainCountry)
                        mainCountry = store.getState().store.mainCountry;

                      if (mainCountry && mainCountry.name) this.nextStep();
                      else toast.error(t('please choose country...'));
                    }}>
                    {t('next step')}
                    <i className="material-icons">{'chevron_' + t('left')}</i>
                  </Button>
                </ButtonGroup>
              </div>

              {/* <div className="asdf d5">
                {this.BackBtn()}

                <Row>
                  <Col lg="12">
                    <Price add={true} />
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <ButtonGroup className="mb-3 left">
                      <Button
                        theme="primary"
                        onClick={() => {
                          let price = store.getState().store.price;
                          if (!price)
                            return toast.error(t('please enter price...'));

                          this.nextStep();
                        }}>
                        {t('next step')}
                        <i className="material-icons">
                          {'chevron_' + t('left')}
                        </i>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div> */}

              <div className="asdf d5">
                {this.BackBtn()}
                <SidebarActions add={true} status={status} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation()(AddNewPost);
