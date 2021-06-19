import React from 'react';

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button,
} from 'shards-react';
import { withTranslation } from 'react-i18next';
import store from '@/functions/store';
import { submitProfile, Logout } from '@/functions';

// const UserAccountDetails  = ({ title }) => (
class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    let st = store.getState().store;
    this.state = {
      phoneNumber: st.phoneNumber,
      firstName: st.firstName,
      lastName: st.lastName,
    };
  }

  submitForm = () => {
    const { phoneNumber, firstName, lastName } = this.state;
    const { t } = this.props;
    if (phoneNumber) {
      submitProfile({
        phoneNumber,
        firstName,
        lastName,
      }).then((d) => {
        alert(t('successfully done!'));
      });
    }
  };

  render() {
    const { phoneNumber, firstName, lastName } = this.state;
    const { title, t } = this.props;
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">{t('name')}</label>
                      <FormInput
                        id="feFirstName"
                        placeholder={t('name')}
                        value={firstName}
                        onChange={(event) => {
                          this.setState({
                            firstName: event.target.value,
                          });
                        }}
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">{t('last name')}</label>
                      <FormInput
                        id="feLastName"
                        placeholder={t('last name')}
                        value={lastName}
                        onChange={(event) => {
                          this.setState({
                            lastName: event.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Password */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feLastName">{t('phone number')}</label>
                      <FormInput
                        placeholder={t('phone number')}
                        value={phoneNumber}
                        disabled
                        onChange={(event) => {
                          this.setState({
                            phoneNumber: event.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button theme="accent" onClick={this.submitForm}>
                        {t('update')}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mgt10"></Col>
                  </Row>
                  <Row>
                    <Col className="mgt10">
                      <Button
                        theme="error"
                        className="dfg ml-2"
                        onClick={Logout}>
                        {t('logout')}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

export default withTranslation()(LoginForm);
