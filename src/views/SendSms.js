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
import {
  Redirect
} from "react-router-dom";

class SendSms extends React.Component {
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

  async removeItem(idx) {
    console.log('removeItem', idx)
    const {t} = await this.props;
    let {card} = await this.state;
    let arr = [];
    await card.map(async (c, i) => {

      if (idx !== i) {
        console.log(i, idx);
        await arr.push(c)

      }
      return;
    })
    console.log('cardddd', arr);

    await updateCard(arr).then(() => {
      this.setState({
        card: arr
      })
      console.log('toasts,,', arr);

      toast(t('Deleted successfully!'), {
        type: 'success'
      })
    });


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
            <PageTitle title={t('Submit order')} subtitle={t('order details')} md="12"
                       className="ml-sm-auto mr-sm-auto"/>
          </Row>
          <Row>
            {/*<Col lg="4">*/}
            {/*<UserDetails />*/}
            {/*</Col>*/}
            <Col lg="1"></Col>

            <Col lg="3">



            </Col>
            <Col lg="4">

              <Card className="mb-3">
                <CardHeader>
                  <h1 className="kjhghjk">
                    <div
                      className="d-inline-block item-icon-wrapper ytrerty"
                      dangerouslySetInnerHTML={{__html: t('Send sms')}}
                    />
                  </h1>
                </CardHeader>
                <CardBody>
                  <Card className="mb-3">

                    <CardBody>
                      <Col lg="12">
                        <Row>
                          <CreateForm
                            buttons={[]}
                            fields={pageData.sendSms.add.fields}/>
                        </Row>
                      </Col>
                    </CardBody>
                  </Card>

                  <Col className={"empty " + "height50"} sm={12} lg={12}>

                  </Col>
                  <CreateForm
                    buttons={pageData.sendSms.add.buttons}
                    fields={[]}/>
                  {/*</Row>*/}
                  {/*</Col>*/}
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">



            </Col>
            <Col lg="1"></Col>

          </Row>
        </Container>
      );
    }
  }
}

export default withTranslation()(SendSms);
