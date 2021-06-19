import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  ListGroupItemHeading
} from "shards-react";
import {toast} from "react-toastify";

import store from "../functions/store";

import PageTitle from "../components/common/PageTitle";
import CreateForm from "../components/components-overview/CreateForm";
import pageData from "./../functions/pageData"
// import UserDetails from "../components/profile/UserDetails";
import {withTranslation} from 'react-i18next';
import {addToCard, updateCard, goToProduct} from "../functions"
import l1 from '@/images/games/1.jpg';
import l2 from '@/images/games/2.jpg';
import l3 from '@/images/games/3.jpg';
import l4 from '@/images/games/4.jpg';
import l5 from '@/images/games/5.jpg';
import l6 from '@/images/games/6.jpg';
import l7 from '@/images/games/7.jpg';
import l8 from '@/images/games/8.jpg';
import l9 from '@/images/games/9.jpg';
import {
  Redirect
} from "react-router-dom";

class Live extends React.Component {
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
    const { token}=this.state;
    if (this.props && this.props.match && this.props.match.params && this.props.match.params._id) {
      if(!token){
        this.cameFromProduct(this.props.match.params._id);
        this.setState({redirect:'/login'})
      }else {
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
          <Row noGutters className="page-header py-4">
            <PageTitle title={t('Live')} subtitle={t('/')} md="12"
                       className="ml-sm-auto mr-sm-auto"/>
          </Row>
          <Row>

            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
                 <div
                   className="drtyujhgf ad-card-main-div"
                   style={{
                     backgroundImage: `url('${l1}')`,
                   }}
                 >
                   <span className={'kjhgfghuji'}>Football</span>
                 </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l2}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Tennis</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l3}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Volleyball</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l4}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Basketball</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l5}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Table Tennis</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l6}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Air hockey</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l7}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Baseball</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l8}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Boxing</span>
              </div>
            </Col>
            <Col lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={this.onClick}>
              <div
                className="drtyujhgf ad-card-main-div"
                style={{
                  backgroundImage: `url('${l9}')`,
                }}
              >
                <span className={'kjhgfghuji'}>Chess</span>
              </div>
            </Col>


          </Row>
        </Container>
      );
    }
  }
}

export default withTranslation()(Live);
