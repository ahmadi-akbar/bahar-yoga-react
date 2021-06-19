import React from 'react';
import { Container, Row, Col } from 'shards-react';
import { CircularProgress } from '@material-ui/core';

import { withTranslation } from 'react-i18next';
import { createLink } from '../functions';
import { Redirect } from 'react-router-dom';

class CreateLink extends React.Component {
  // const CreateLink = ({t}) => (

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      redirect: null,
    };

    // if (props && props.match && props.match.params && props.match.params._id) {
    createLink().then((data) => {
      window.location.replace('/make-money');
      // console.log('set _id to edit:', data);
      // savePost(data)
      //   this.setState({
      //     load: true
      //   })

      // this.props.history.push('/edit-new-post/'+_id)
    });
    // }
  }

  render() {
    var { t } = this.props;
    var { redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    } else {
      return (
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4"></Row>
          <Row>
            {/*<Col lg="4">*/}
            {/*<UserDetails />*/}
            {/*</Col>*/}
            <Col lg="3"></Col>
            <Col lg="6">
              <Row>
                {/*<Col lg="12">*/}
                <div className={'d-block marginAuto'}>
                  <CircularProgress
                    disableShrink
                    className={'d-block marginAuto'}
                  />
                  <div className={'d-block marginAuto mT20'}>
                    {t('Creating link...')}
                  </div>
                </div>
                {/*</Col>*/}
              </Row>
            </Col>
            <Col lg="3"></Col>
          </Row>
        </Container>
      );
    }
  }
}

export default withTranslation()(CreateLink);
