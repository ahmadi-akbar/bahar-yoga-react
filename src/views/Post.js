import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'shards-react';
import {Redirect} from 'react-router-dom';

import {IconButton} from '@material-ui/core';
import { MainUrl } from '@/functions';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import PageTitle from "../components/common/PageTitle";
import SidebarActions from '../components/single-post/SidebarActions';
import SidebarCategories from '../components/single-post/SidebarCategories';
import {clearPost, getPost, savePost} from '../functions';

import Swiper from 'react-id-swiper';
import {withTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
// import {SnapChatIcon} from '@/assets';

import * as NT from '@/functions/NativeHelper';

const SwiperParams = {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
};

const getShareLink = () =>
  window.globalTS.home_url+'/' + encodeURI(window.location.hash);

class Post extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
      title: {},
      description: '',
      post_content: "",
      files: [],
      _id: '',
      customer: '',
      catChoosed: [],
      countryChoosed: [],
      updatedAt: '',
      photos: [],
      nextPost: {
        title: '',
        _id: '',
      },
      redirect: null,
      update: false,
      type: 'normal',
      price: 0,
      allPostData: {},
    };
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  getThePost(_id) {
    console.log('set _id to show:', _id);
    console.log('set encodeURIComponent to show:', encodeURIComponent(_id));

    getPost(_id).then((d) => {
      console.log('get d to show:', d);
      // savePost({
      //   // mainList: d.mainList,
      //   // catChoosed: d.catChoosed,
      //   // countryChoosed: d.countryChoosed,
      //   // categories: d.categories,
      //   // mainCategory: d.mainCategory,
      // });
      if(d)
      this.setState({
        load: true,
        title: d.title,
        description: d.description,
        post_content: d.post_content,
        files: d.files,
        photos: d.photos,
        _id: d._id,
        customer: d.customer,
        catChoosed: d.catChoosed,
        countryChoosed: d.countryChoosed,
        updatedAt: d.updatedAt,
        nextPost: d.nextPost,
        type: d.type,
        price: d.price,
        allPostData: d.data,
      });
    });
  }

  handleNextPost() {
    console.log('handleNextPost');
    let {nextPost} = this.state;
    console.log('next post', nextPost);
    if (nextPost) {
      // this.getThePost(nextPost._id)
      // this.props.history.push("/p/" + nextPost._id + "/" + nextPost.title.trim().replace(/\s+/g, '_'));
      // this.setState({
      //   redirect: '/p/' + nextPost._id + '/' + nextPost.title.trim().replace(/\s+/g, '_'),
      //   update:true,
      //   load:false
      // })
      // window.location.
    }
  }

  componentWillUnmount() {
    clearPost();
  }

  componentDidMount() {
    console.log('componentDidMount');

    console.log('this.props', this.props.match.params._id);
    if (
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params._id
    ) {
      this.getThePost(this.props.match.params._id);
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    if (this.state.update)
      this.setState({
        redirect: null,
        update: false,
      });
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps',nextProps.location.pathname,this.props.location.pathname);
    if(nextProps.location.pathname!=this.props.location.pathname){
      this.getThePost(nextProps.match.params._id);
    }

    //call your api and update state with new props
  }
  render() {
    const ShareLink = getShareLink();

    let {
      load,
      title,
      description,
      post_content,
      files,
      photos,
      _id,
      customer,
      catChoosed,
      updatedAt,
      redirect,
      nextPost,
      countryChoosed,
      price,
      type,
      allPostData,
    } = this.state;
    console.log('catChoosed allPostData', catChoosed, allPostData);
    const {t} = this.props;
    // const {t} = this.props;
    // console.log('title', title, 'description', description, files);
    let images = [],
      videos = [],
      sounds = [],
      aparat = null;
    // files.map((file) => {
    //   if (file && (file.type === 'image/png' || file.type === 'image/jpeg'))
    //     images.push(file);
    //
    //   if (
    //     file &&
    //     (file.type === 'video/quicktime' || file.type === 'video/mp4')
    //   )
    //     videos.push(file);
    //
    //   if (file && file.type === 'video/embed') aparat = file.url;
    //
    //   if (file && file.type === 'audio/mp3') sounds.push(file);
    //
    //   return 0;
    // });
    // photos.map((file) => {
    //   // if (file && (file.type === 'image/png' || file.type === 'image/jpeg'))
    //   images.push(file);
    //   //
    //   // if (
    //   //   file &&
    //   //   (file.type === 'video/quicktime' || file.type === 'video/mp4')
    //   // )
    //   //   videos.push(file);
    //   //
    //   // if (file && file.type === 'video/embed') aparat = file.url;
    //   //
    //   // if (file && file.type === 'audio/mp3') sounds.push(file);
    //   //
    //   // return 0;
    // });
    // if (post_content.en)
    //   post_content = post_content.en.split('\n').map((des, i) => {
    //     return <p key={i}>{des}</p>;
    //   });

    if (redirect) return <Redirect to={redirect}/>;
    if (!load)
      return (
        <Container className="thisisssssss">
          <Row noGutters className="page-header py-4"></Row>
          <Row>
            <Col lg="8" md="12">
              <Row>
                <Col lg="12" md="12">
                  <div className="sfdgf"></div>
                </Col>
              </Row>

              <Row>
                <Col lg="12" md="12">
                  <Card small className="mb-3">
                    <CardHeader></CardHeader>
                    <CardBody></CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg="4" md="12">
              {/*/!*<SidebarActions add={false} edit={true} _id={_id} customer={customer} updatedAt={updatedAt} countryChoosed={countryChoosed}  type={type} price={price}/>*!/*/}
              {/*<Button theme="white" className="mb-2 mr-1 ml-1 dondevide tty" onClick={() => {*/}
              {/*this.handleNextPost();*/}
              {/*}*/}
              {/*}><i className="material-icons">keyboard_arrow_right</i>{t('Next post')}*/}
              {/*<span>*/}
              {/*{nextPost['title']}*/}
              {/*</span></Button>*/}
            </Col>
          </Row>
        </Container>
      );
    else
      return (
        <Container
          fluid
          className="main-content-container px-4 pb-4 thisisssssss">
          {/* Page Header */}
          <Row noGutters className="page-header py-4"></Row>

          <Row>
            <Col lg="8" md="12">
              <Row>
                <Col lg="12" md="12">
                  <Button
                    theme="white"
                    className="mb-2 mr-1 ml-1 dondevide"
                    onClick={() => this.handleBack()}>
                    <i className="material-icons">keyboard_arrow_right</i>
                    {t('back')}
                  </Button>

                  {/*{catChoosed &&*/}
                  {/*catChoosed.map((cat, d) => {*/}
                    {/*// return (<Link key={d} to={"/category/" + cat._id + "/" + cat.name}>*/}
                    {/*// <Button theme="white" className="mb-2 mr-1 ml-1">*/}
                    {/*// <i className="material-icons">keyboard_arrow_right</i>{cat.name}</Button></Link>)*/}
                  {/*})}*/}
                </Col>
              </Row>
              <Row>
                {/*<Col lg="6" md="12" className="img100">*/}
                {/*<Swiper {...SwiperParams}>*/}
                {/*{images.map((img, idx) => (*/}
                {/*<div key={idx}>*/}
                {/*<img alt={title.en} src={img.url}/>*/}
                {/*</div>*/}
                {/*))}*/}
                {/*</Swiper>*/}
                {/*</Col>*/}
                <Col lg="12" md="12" className="img100">
                  {aparat && (
                    <div dangerouslySetInnerHTML={{__html: aparat}}/>
                  )}
                  {!aparat && (
                    <Swiper {...SwiperParams}>
                      {videos.map((video, id) => (
                        <div key={id}>
                          <video controls>
                            <source src={video.url} type={video.type}/>
                            Your browser does not support the audio element.
                          </video>
                        </div>
                      ))}
                    </Swiper>
                  )}
                </Col>
              </Row>
              <Row>
                <Col lg="12" md="12">
                  <div className="sfdgf"></div>
                </Col>
              </Row>
              <Row>
                <Col lg="12" md="12">
                  <Card small className="mb-3">
                    <CardHeader>
                      <h1 className="kjhghjk">
                        <div
                          className="d-inline-block item-icon-wrapper ytrerty"
                          dangerouslySetInnerHTML={{__html: post_content}}
                        />
                      </h1>
                    </CardHeader>
                    <CardBody>
                      <div
                        className="d-inline-block item-icon-wrapper ytrerty"
                        // dangerouslySetInnerHTML={{__html: description}}
                      >
                        {}
                        {/*{post_content}*/}
                      </div>
                      {allPostData && (
                        <div className="tsxable">
                          {Object.keys(allPostData).map((e, c0) => (
                            <div className="wscwxee">
                              <div className="wscw">{e}</div>
                              <div className="wscw2">
                                {Array.isArray(allPostData[e])
                                  ? allPostData[e].join(', ')
                                  : allPostData[e]}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg="12" md="12">
                  <div className="sfdgf"></div>
                </Col>
              </Row>
            </Col>
            <Col lg="4" md="12">
              <Row>
                <Col lg="12" md="12" className="img100">
                  <Swiper {...SwiperParams}>
                    {sounds.map((sound, id) => (
                      <div key={id}>
                        <audio controls={true}>
                          <source src={sound.url} type={sound.type}/>
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ))}
                  </Swiper>
                </Col>
              </Row>

              {/*<SidebarCategor ies/>*/}

              {/*<SidebarActions*/}
              {/*add={false}*/}
              {/*edit={true}*/}
              {/*_id={_id}*/}
              {/*customer={customer}*/}
              {/*updatedAt={updatedAt}*/}
              {/*countryChoosed={countryChoosed}*/}
              {/*type={type}*/}
              {/*price={price}*/}
              {/*/>*/}
              <Col lg="6" md="12" className="img100">

              </Col>
              <Row>
                <Col lg="12" md="12">
                  <Swiper {...SwiperParams}>
                    {images.map((img, idx) => {
                      console.log('jhgfghjkl',img);
                      return(
                        <div key={idx}>
                          <img alt={title.en} src={MainUrl+'/'+img.url}/>
                        </div>
                      )
                    })}
                  </Swiper>

                  <InputGroup
                    className="TextToCopydd"
                    onClick={() => {
                      NT.CopyToClipboard(ShareLink);
                      toast.success(t('link copied!'));
                    }}>
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i className="material-icons">share</i> {t('share')}
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput className="ltr" value={ShareLink} disabled/>
                  </InputGroup>

                  <div className="d-flex justify-content-center">
                    {/* <a
                      href={'whatsapp://send?text=' + ShareLink}
                      data-action="share/whatsapp/share"> */}
                    <IconButton onClick={() => NT.ShareAPI(ShareLink)}>
                      <WhatsAppIcon/>
                    </IconButton>
                    {/* </a>
                    <a
                      href={'whatsapp://send?text=' + ShareLink}
                      data-action="share/whatsapp/share"> */}
                    {/*<IconButton onClick={() => NT.ShareAPI(ShareLink)}>*/}
                      {/*<img src={SnapChatIcon} alt="snapchat"/>*/}
                    {/*</IconButton>*/}
                    {/* </a> */}
                  </div>
                </Col>
              </Row>
              {/*{nextPost && <Button theme="white" className="mb-2 mr-1 ml-1 dondevide tty" onClick={() => {*/}
              {/*this.handleNextPost();*/}
              {/*}*/}
              {/*}><i className="material-icons">keyboard_arrow_right</i>{t('Next post')}*/}
              {/*<div className={'frgh'}>*/}
              {/*{nextPost['title']}*/}
              {/*</div>*/}
              {/*</Button>}*/}
            </Col>
          </Row>
        </Container>
      );
  }
}

export default withTranslation()(Post);
