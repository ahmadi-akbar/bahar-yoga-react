import React from 'react';
import store from '@/functions/store';
import {
  Button,
  Col,
  Form,
  FormInput,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
  Row,
} from 'shards-react';
import {
  active,
  authCustomerWithPassword,
  CameFromPost,
  goToProduct,
  register,
  setPassWithPhoneNumber,
} from '@/functions';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fNum } from '@/functions/utils';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    let st = store.getState().store;
    this.state = {
      phoneNumber: null,
      activationCode: null,
      enterActivationCodeMode: false,
      showSecondForm: false,
      isDisplay: true,
      setPassword: false,
      countryCode: st.countryCode,
      getPassword: false,
      firstName: '',
      lastName: '',
      email: '',
      goToProfile: false,
      token: st.token,
      CameFromPost: st.CameFromPost,
      goToProduct: st.goToProduct,
    };
  }

  fd(d) {
    CameFromPost(d);
  }

  fc(d) {
    goToProduct(d);
  }

  handleRegister = (e) => {
    e.preventDefault();
    let fd = this.state.countryCode || '966';
    let number = this.state.phoneNumber || '0';

    let phoneNumber = fd + fNum(number);

    register(phoneNumber).then((r) => {
      // new user
      if (r.shallWeSetPass) {
        this.setState({
          enterActivationCodeMode: true,
          isDisplay: false,
        });
      } else if (!r.shallWeSetPass && r.userWasInDbBefore) {
        this.setState({
          isDisplay: false,
          getPassword: true,
        });
      }
    });
  };

  render() {
    const {
      isDisplay,
      goToProfile,
      token,
      CameFromPost,
      goToProduct,
      setPassword,
      getPassword,
      enterActivationCodeMode,
    } = this.state;
    const { t } = this.props;
    console.log('render Login form...', token);
    console.log('did we come from a post while publishing?', CameFromPost);
    if (token && goToProduct) {
      this.fc(false);

      return <Redirect to={'/submit-order/' + goToProduct} />;
    }
    if (token && CameFromPost && !setPassword) {
      this.fd(false);
      return <Redirect to="/add-new-post/publish" />;
    } else if ((token && !CameFromPost && !setPassword) || goToProfile) {
      // window.location.replace('/my-posts');
      console.log('go to my-posts...', token, CameFromPost, setPassword);
      return <Redirect to="/my-posts" />;
      // window.location.reload();
    } else {
      return (
        <ListGroup flush>
          {isDisplay && (
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      <Col md="12" className="form-group ltr">
                        <label htmlFor="thepho">{t('phone number')}</label>

                        <InputGroup className="mb-3">
                          <InputGroupAddon type="prepend">
                            <FormSelect
                              onChange={(e) =>
                                this.setState({ countryCode: e.target.value })
                              }>
                              <option value="966">+966</option>
                              <option value="353">+353</option>
                              <option value="98">+98</option>
                            </FormSelect>
                          </InputGroupAddon>
                          <FormInput
                            placeholder="**********"
                            id="thepho"
                            type="tel"
                            dir="ltr"
                            onChange={(e) =>
                              this.setState({ phoneNumber: e.target.value })
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      className="center btn-block"
                      onClick={this.handleRegister}>
                      {t('get enter code')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          )}
          {enterActivationCodeMode && (
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      <Col md="12" className="form-group">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <label htmlFor="feEmailAddress">
                            {t('get enter code')}
                          </label>
                          <label
                            style={{ fontSize: 9 }}
                            htmlFor="feEmailAddress">
                            {t('enter sent code')}
                          </label>
                        </div>

                        <InputGroup className="mb-3">
                          <FormInput
                            placeholder="_ _ _ _ _ _"
                            type="tel"
                            dir="ltr"
                            onChange={(e) =>
                              this.setState({ activationCode: e.target.value })
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row form>
                      <Col md="12" className="form-group"></Col>
                    </Row>
                    <Button
                      type="button"
                      className="center btn-block"
                      onClick={() => {
                        const {
                          activationCode,
                          countryCode = '966',
                          phoneNumber = '0',
                        } = this.state;

                        let req = {
                          activationCode,
                          phoneNumber: countryCode + fNum(phoneNumber),
                        };
                        active(req).then((res = {}) => {
                          console.log('==> activate account()', res);
                          if (!res.success) return toast.error(t(res.message));

                          if (res.shallWeSetPass) {
                            this.setState({
                              token: res.token,
                              enterActivationCodeMode: false,
                              setPassword: true,
                            });
                          } else this.setState({ token: res.token });
                        });
                      }}>
                      {t('login')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          )}
          {setPassword && (
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="olfirstname">
                          {t('Your first name')}
                        </label>

                        <InputGroup className="mb-3">
                          <FormInput
                            placeholder={t('First name')}
                            type="text"
                            id="olfirstname"
                            dir="rtl"
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col md="12" className="form-group">
                        <label htmlFor="ollastname">
                          {t('Your last name')}
                        </label>

                        <InputGroup className="mb-3">
                          <FormInput
                            placeholder={t('Last name')}
                            type="text"
                            id="ollastname"
                            dir="rtl"
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col md="12" className="form-group">
                        <label htmlFor="oiuytpaswword">
                          {t('set new password')}
                        </label>

                        <InputGroup className="mb-3">
                          <FormInput
                            placeholder="******"
                            type="password"
                            id="oiuytpaswword"
                            dir="ltr"
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row form>
                      <Col md="12" className="form-group"></Col>
                    </Row>
                    <Button
                      type="button"
                      className="center btn-block"
                      onClick={(e) => {
                        e.preventDefault();

                        const {
                          countryCode,
                          phoneNumber,
                          firstName,
                          lastName,
                          email,
                          password,
                        } = this.state;

                        let fd = countryCode || '966';

                        setPassWithPhoneNumber({
                          phoneNumber: fd + phoneNumber,
                          firstName,
                          lastName,
                          email,
                          password,
                        }).then((res) => {
                          // console.log('store.getState().store', store.getState().store.token, res.token);
                          if (res.success) {
                            this.setState({
                              // token: res.token,
                              setPassword: false,
                              goToProfile: true,
                            });
                          }
                        });
                      }}>
                      {t('Register')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          )}
          {getPassword && (
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="oiuytgpaswword">
                          {t('Enter password')}
                        </label>

                        <InputGroup className="mb-3">
                          <FormInput
                            placeholder="******"
                            type="password"
                            id="oiuytgpaswword"
                            dir="ltr"
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row form>
                      <Col md="12" className="form-group"></Col>
                    </Row>
                    <Button
                      type="button"
                      className="center btn-block"
                      onClick={(e) => {
                        e.preventDefault();
                        let fd = this.state.countryCode || '966';
                        let ph = fd + this.state.phoneNumber;
                        authCustomerWithPassword({
                          phoneNumber: ph,
                          password: this.state.password,
                        })
                          .then((res) => {
                            // console.log('store.getState().store', store.getState().store.token, res.token);
                            if (res.success) {
                              this.setState({
                                token: res.customer.token,
                                goToProfile: true,
                              });
                            } else {
                              if (res.message) alert(res.message);
                            }
                          })
                          .then((e) => {
                            console.log('eee', e);
                          });
                      }}>
                      {t('Login')}
                    </Button>
                    <Button
                      type="button"
                      className="center btn-block"
                      onClick={(e) => {
                        e.preventDefault();
                      }}>
                      {t('Forgot Password')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup>
      );
    }
  }
}
export default withTranslation()(LoginForm);
