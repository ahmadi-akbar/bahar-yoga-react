import React from "react";
import {Container, Row, Col} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CreateForm from "../components/components-overview/CreateForm";
import pageData from "./../functions/pageData"
// import UserDetails from "../components/profile/UserDetails";
import {withTranslation} from 'react-i18next';
const Resume = ({t}) => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title={t('Recruitment questionnaire')} subtitle={t('edit details')} md="12" className="ml-sm-auto mr-sm-auto"/>
    </Row>
    <Row>
      {/*<Col lg="4">*/}
      {/*<UserDetails />*/}
      {/*</Col>*/}
      <Col lg="3"></Col>
      <Col lg="6">
        <Row>
          <CreateForm
            buttons={pageData.estekhdam.add.buttons}
            fields={pageData.estekhdam.add.fields}/>
        </Row>
      </Col>
      <Col lg="3"></Col>

    </Row>
  </Container>
);

export default withTranslation()(Resume);
