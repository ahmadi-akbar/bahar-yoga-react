import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  FormCheckbox,
} from 'shards-react';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import store from '@/functions/store';
import { submitPost, CameFromPost, clearPost, deletePost } from '@/functions';
import { toast } from 'react-toastify';

class SidebarActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      terms: true,
    };
  }

  submitThePost = () => {
    let st = store.getState().store;
    var token = st.token;

    // if ((!title || !description || !mainCategory._id)) {
    //   // console.log('')
    //   alert('error');
    // } else {
    if (token) {
      console.log('token found, submit post...');
      this.saveThisPost();
    } else {
      console.log('no token found!');
      CameFromPost('true').then(() => {
        this.setState({ redirect: '/login' });
      });
      // ref.props.history.push('/login')
    }
    // }
  };

  saveThisPost = () => {
    submitPost().then(() => {
      this.setState({ redirect: '/my-posts' });
      // ref.props.history.push('/my-posts')
    });
  };

  clearForm() {
    clearPost();
    window.location.reload();
  }

  deleteThePost = () => {
    deletePost().then(() => {
      this.setState({ redirect: '/my-posts' });
    });
  };

  render() {
    const { edit, status, t } = this.props;
    const { redirect, terms } = this.state;
    let { title, description } = store.getState().store;
    if (status === 'publish') this.submitThePost();

    if (redirect) return <Redirect to={redirect} />;
    else
      return (
        <Card small className="mb-3">
          <CardHeader className="border-bottom">
            <h1 className="kjhghjk" id="TRESDFGf">
              {title}
            </h1>
          </CardHeader>

          <CardBody className="p-0">
            <div
              id={'TRESDFG'}
              className="p-4 d-inline-block item-icon-wrapper ytrerty">
              {description}
            </div>
            <ListGroup flush>
              <ListGroupItem className="p-3"></ListGroupItem>
              {!edit && (
                <ListGroupItem className="p-3">
                  <FormCheckbox
                    toggle
                    checked={terms}
                    onChange={() => this.setState({ terms: !terms })}>
                    <a href="https://blog.myteacher.mobi/agreement">
                      أقبل الشروط و الأحكام
                    </a>
                  </FormCheckbox>
                </ListGroupItem>
              )}
              <ListGroupItem className="d-flex px-3 border-0">
                {edit ? (
                  <>
                    <Button
                      outline
                      theme="danger"
                      size="sm"
                      onClick={() => this.deleteThePost()}>
                      <i className="material-icons">clear</i> {t('delete post')}
                    </Button>
                    <Button
                      theme="accent"
                      size="sm"
                      className="ml-auto"
                      onClick={() => this.saveThisPost()}>
                      <i className="material-icons">file_copy</i>{' '}
                      {t('save post')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      outline
                      theme="accent"
                      size="sm"
                      onClick={() => this.clearForm()}>
                      <i className="material-icons">delete</i> {t('reset form')}
                    </Button>
                    <Button
                      theme="accent"
                      size="sm"
                      className="ml-auto"
                      onClick={() => {
                        if (!terms)
                          return toast.error('الرجاء قبول الشروط والأحكام');
                        this.submitThePost();
                      }}>
                      <i className="material-icons">file_copy</i>{' '}
                      {t('publish post')}
                    </Button>
                  </>
                )}
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      );
  }
}

export default withTranslation()(SidebarActions);
