import React from "react";
import {Col, Container, Row} from "shards-react";

import store from "../functions/store";
// import UserDetails from "../components/profile/UserDetails";
import {withTranslation} from 'react-i18next';
import {addToCard, goToProduct} from "../functions"
import {Redirect} from "react-router-dom";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // const {_id} = props;
    this.state = {
      card: store.getState().store.card || [],
      token: store.getState().store.token || '',
      redirect: null,
      update: false
    };
  }

  onClick() {
    alert('You need to subscribe!');

  }

  componentDidMount() {
    console.log('componentDidMount')
    console.log('this.props', this.props.match.params._id);
    const {token} = this.state;
    if (this.props && this.props.match && this.props.match.params && this.props.match.params._id) {
      if (!token) {
        this.cameFromProduct(this.props.match.params._id);
        this.setState({redirect: '/login'})
      } else {
        addToCard(this.props.match.params._id).then((card) => {
          console.log('hgfds', card);
          this.setState({card})
        });
      }
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    if (this.state.update)
      this.setState({
        redirect: null,
        update: false
      })
    window.scrollTo(0, 0);
  }

  cameFromProduct(d) {
    goToProduct(d);
  }

  render() {
    const {t, _id} = this.props;
    let sum = 0;
    const {card, redirect} = this.state;
    console.log('card', card);
    if (redirect) {
      // console.log('_id', _id);
      // if (!_id) {
      //   _id = this.props.match.params._id;
      // }
      // this.cameFromProduct(_id);
      return <Redirect to={'/login/'} push={false} exact={true}/>
    } else {
      return (
        <Container fluid className="main-content-container px-4">
          <Row>

            <Col lg="4"
                 md="6"
                 sm="6"
                 xs="12"
                 className="mb-4 ad-card-col"
                 >

            </Col>
            <Col lg="4"
                 md="6"
                 sm="6"
                 xs="12"
                 className="mb-4 ad-card-col"
                 >
              <div className={'cevbgf-par'}>
                <div className={'cevbgf'}>

                  <div className={'ertyui'}>
                    <div className={'hbghj'}>Balance</div>

                  </div>

                  <div className={'ertyui'}>
                    0
                  </div>
                </div>
                <div className={'cevbgf'}>

                  <div className={'ertyui'}>
                    <div className={'hbghj'}>Bet</div>

                  </div>

                  <div className={'ertyui'}>
                   0
                  </div>
                </div>
                <div className={'cevbgf'}>

                  <div className={'ertyui'}>
                    <div className={'hbghj'}>Bet</div>

                  </div>

                  <div className={'ertyui'}>
                    0
                  </div>
                </div>

              </div>
            </Col>
            <Col lg="4"
                 md="6"
                 sm="6"
                 xs="12"
                 className="mb-4 ad-card-col"
                 >

            </Col>


          </Row>
          <Row>

            <Col lg="4"
                 md="6"
                 sm="6"
                 xs="12"
                 className="mb-4 ad-card-col txc"
                 >


            </Col>
            <Col lg="4"
                 md="6"
                 sm="6"
                 xs="12"
                 className="mb-4 ad-card-col"
                 >
              <div className={'dfghjuik'}>

                <div className={'edvefve'}>
                  0%
                </div>
              </div>
            </Col>
            <Col lg="4"
                 md="6"
                 sm="6"
                 xs="12"
                 className="mb-4 ad-card-col txc"
                 >

            </Col>


          </Row>

        </Container>
      )
        ;
    }
  }
}

export default withTranslation()(Calculator);
