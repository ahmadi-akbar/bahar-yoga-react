import React from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import ChooseCountry from '../components/ChooseCountry';
// import {Store} from "../flux";
import store from '../functions/store';
import { withTranslation } from 'react-i18next';

var mainCountry = store.getState().store.mainCountry;

class ChooseCountryView extends React.Component {
  constructor(props) {
    super(props);

    window.scrollTo(0, 0);
    this.state = {
      load: true,
      activePage: 1,
    };

    // if (props && props.match && props.match.params && props.match.params._id) {
    //   getMyPost(props.match.params._id).then((data) => {
    //     console.log('set _id to edit:', data);
    //     savePost(data).then((d) => {
    //       this.setState({
    //         load: true
    //       })
    //     });
    //     // this.props.history.push('/edit-new-post/'+_id)
    //
    //   });
    // }
  }

  // clickOnNext(n) {
  //   this.setState({
  //     activePage: n
  //   })
  //   window.scrollTo(0,0);
  // }
  //
  // clickOnPrev(n) {
  //   this.setState({
  //     activePage: n
  //   })
  //   window.scrollTo(0,0);
  // }

  // addTANDD(){
  //   let {title,description}=store.getState().store;
  //   document.getElementById('TRESDFG').innerHTML=description;
  //   document.getElementById('TRESDFGf').innerHTML=title;
  // }
  f(MC) {
    mainCountry = MC;
    if (mainCountry && mainCountry['name']) {
      // document.getElementById('clickOnFirst').click();
      // document.getElementById('CountryLabel').innerHTML = " " + MC.name;
    }
    // this.setState({
    //   mainCountry:mainCountry,
    //   activePage: 2
    // })
    // this.clickOnNext(2);
  }

  render() {
    const { load } = this.state;
    const { t } = this.props;
    if (!load)
      return (
        <Container fluid className="main-content-container px-4 pb-4">
          {' '}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="12"
              title={t('Change Country')}
              className="text-sm-left"
            />
          </Row>
        </Container>
      );
    else
      return (
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="12"
              title={t('Change Country')}
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="3"></Col>
            <Col lg="6">
              <ChooseCountry onMainCountry={this.f} />
            </Col>
            <Col lg="3"></Col>
          </Row>
        </Container>
      );
  }
}

export default withTranslation()(ChooseCountryView);
