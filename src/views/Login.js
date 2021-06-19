import React from 'react';
import { Container, Row, Col, Card, CardHeader } from 'shards-react';
import { withTranslation } from 'react-i18next';

import PageTitle from '@/components/common/PageTitle';
import LoginForm from '@/components/components-overview/LoginForm';
import { defaultImg } from '@/assets';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        phoneNumber: '',
      },
      noImage: defaultImg,
    };
  }

  render() {
    const { t } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="12"
            title={t('login / register')}
            subtitle={t('user account')}
            className="text-sm-left"
          />
        </Row>

        <div className="w-100">
          <Col lg="4" className="mx-auto mb-4">
            <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">{t('login / register')}</h6>
              </CardHeader>
              <LoginForm />
            </Card>
          </Col>
        </div>
      </Container>
    );
  }
}

export default withTranslation()(Login);
