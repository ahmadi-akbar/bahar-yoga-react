import React, {useEffect, useState} from 'react';
import {Container, Row} from 'shards-react';
import {Grid} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

import LoadingComponent from '@/components/components-overview/LoadingComponent';
import Post from '@/views/Post.js';

import {enableAgent, enableSell, getPosts, getPostsByCat, getStoryList, setCountry,} from '@/functions';

import {withTranslation} from 'react-i18next';
import PostCard from '@/components/Category/PostCard';
import StoryCard from '@/components/Category/StoryCard';
import StoryModalComponent from '@/components/Category/StoryModal';
import {toast} from 'react-toastify';

const Archive = ({match, location, history, t}) => {
  const [tracks, settracks] = useState([]);

  const [storyList, setStoryList] = useState([]);
  const [storyModal, setStoryModal] = useState({});

  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [single, set_single] = useState(false);
  const [single_id, set_single_id] = useState('');
  const [offset, setoffset] = useState(-24);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [catid, setcatid] = useState(match.params._id);
  const [search, setsearch] = useState(location.search || '');
  const [load, setLoad] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') setLocationKeys([location.key]);

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          console.log('handle back');
          set_single_id('');
          set_single(false);
          // Handle back event
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    var url = new URL(window.location.href);
    var country = url.searchParams.get('country') || '';
    var eS = url.searchParams.get('enableSell') || '';
    if (eS) enableSell(true);

    var eA = url.searchParams.get('enableAgent') || '';
    if (eA) enableAgent(true);

    if (country) {
      if (country === 'ir') setCountry('ir', false);
      if (country === 'tu') setCountry('tu', false);
      if (country === 'en') setCountry('en', false);
      location.replace('/');
    }
    //
    // getStoryList()
    //   .then((res = []) => {
    //     setStoryList(res);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });

  }, []);

  const loadItems = async (page, catId = catid) => {
    console.log('==> loadItems():', offset, search,page,catId,match.params._slug);

    // if(!loadingMoreItems){
    let newOffset = (await offset) + 24;
    await setoffset(newOffset);
    await setInitialLoad(false);
    await setLoadingMoreItems(true);
    if (catId)
      getPostsByCat(newOffset, 24, match.params._slug,catId, search || '').then((resp) => {
        setLoadingMoreItems(false);
        afterGetData(resp);
      });
    else
      getPosts(newOffset, 24, match.params._slug, search || '').then((resp) => {
        setLoadingMoreItems(false);
        afterGetData(resp);
      });

    // }
  };

  useEffect(() => {
    loadItems(0, catid);
  }, [catid]);

  useEffect(() => {
    console.log('location.search changed:', location);
    sethasMoreItems(true);
    settracks([]);
    setsearch(location.search || '');
    setoffset(-24);
  }, [location.search]);

  useEffect(() => {
    console.log('match.params._id', match, 'and:', catid);
    if (match.params._id !== catid) {
      setcatid(match.params._id);
      sethasMoreItems(true);
      settracks([]);
      setsearch(location.search || '');
      setoffset(-24);
    }
  }, [match.params._id, catid]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.location.search !== this.props.location.search) {
  //     this.setState({
  //       hasMoreItems: true,
  //       tracks: [],
  //       search: this.props.location.search || '',
  //       offset: -24
  //     });
  //   }
  //   if (this.props.match.params._id !== this.state.catid) {
  //     console.log('set state...')
  //     this.setState({
  //       catid: this.props.match.params._id,
  //       hasMoreItems: true,
  //       tracks: [],
  //       search: this.props.location.search || '',
  //       offset: -24
  //     });
  //   }
  // }

  const afterGetData = (resp) => {
    let trackss = [...tracks];
    if (resp.length < 24) sethasMoreItems(false);
console.log('resp',resp);
    if (resp && resp.length) {
      resp.forEach((item) => {
        trackss.push(item);
      });
      settracks(trackss);
      if (resp && resp.length < 1) sethasMoreItems(false);
    } else {
      sethasMoreItems(false);
      setLoad(false);
    }
  };

  useEffect(() => {
    console.log('hasMoreItems changedddddd:', hasMoreItems);
  }, [hasMoreItems]);

  const goToPage = (post) => {
    // alert('You need to subscribe!');
    console.log('post',post);
    history.push('/' + post.post_name);
    // set_single_id(post._id);
    // set_single(true);
  };

  // console.log('oiuytfrghjk',props);
  const loader = (
    <div className="loadNotFound loader " key={23}>
      {t('loading...')}
      <LoadingComponent height={30} width={30} type="spin" color="#3d5070"/>
    </div>
  );
  return (
    <Container fluid className="main-content-container px-4 fghjkjhgf">
      {/*<StoryModalComponent*/}
        {/*open={Boolean(storyModal.title)}*/}
        {/*item={storyModal}*/}
        {/*onClose={() => setStoryModal({})}*/}
      {/*/>*/}
      {/*<SidebarNavItems {...this.props} />*/}

      {/*<Grid container spacing={2} className="rowList stories">*/}
        {/*{storyList.map((i, idx) => (*/}
          {/*<StoryCard item={i} key={idx} onClick={() => setStoryModal(i)}/>*/}
        {/*))}*/}
      {/*</Grid>*/}

      <Row noGutters className="page-header py-4">
        {/*<PageTitle*/}
        {/*sm="12"*/}
        {/*title={t('Daily posts')}*/}
        {/*subtitle={t('all categories')}*/}
        {/*className="text-sm-left"*/}
        {/*/>*/}
      </Row>
      <Row className="ddd">
        <InfiniteScroll
          pageStart={0}
          initialLoad={initialLoad}
          loadMore={() =>
            !initialLoad && !loadingMoreItems ? loadItems() : null
          }
          hasMore={hasMoreItems}
          catid={catid}
          loader={loader}
          offset={offset}
          element="div">
          {tracks.map((i, idx) => (
            <PostCard item={i} key={idx} onClick={() => goToPage(i)}/>
          ))}
        </InfiniteScroll>
        {/*{single && (*/}
          {/*<div className={'kjuyhgfdfgh modallllll ' + single}>*/}
            {/*<div className="col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">*/}
              {/*<Post match={{params: {_id: single_id}}}></Post>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*)}*/}
      </Row>
    </Container>
  );
};

export default withTranslation()(Archive);
