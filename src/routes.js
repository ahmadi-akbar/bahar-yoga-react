// Layout Types
import { DefaultLayout } from './layouts';
// Route Views
import Post from './views/Post';
import Page from './views/Page';
import Home from './views/Home';
import Archive from './views/Archive';

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    // component: () => <Redirect to="/blog-posts" />
    component: Home,
  },
  // {
  //   path: '/category/:_id/:name',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Categories,
  // },
  //
  // {
  //   path: '/submit-order',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: SubmitOrder,
  // },
  // {
  //   path: '/prematch',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: PreMatch,
  // },
  // {
  //   path: '/live',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Live,
  // },  {
  //   path: '/subscription',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Subscription,
  // },{
  //   path: '/wallet',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Wallet,
  // },{
  //   path: '/calculator',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Calculator,
  // },{
  //   path: '/bonus',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Bonus,
  // },
  // {
  //   path: '/submit-order/:_id',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: SubmitOrder,
  // },
  // {
  //   path: '/choose-country',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: ChooseCountryView,
  // },
  // {
  //   path: '/send-sms',
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: SendSms,
  // },
  //
  // {
  //   path: '/profile',
  //   layout: DefaultLayout,
  //   component: Profile,
  // },
  // {
  //   path: '/add-new-post/',
  //   layout: DefaultLayout,
  //   component: AddNewPost,
  // },
  // {
  //   path: '/add-new-post/:_status',
  //   layout: DefaultLayout,
  //   component: AddNewPost,
  // },
  // {
  //   path: '/edit-new-post/:_id',
  //   layout: DefaultLayout,
  //   component: EditNewPost,
  // },
  // {
  //   path: '/resume',
  //   layout: DefaultLayout,
  //   component: Resume,
  // },
  // {
  //   path: '/create-link',
  //   layout: DefaultLayout,
  //   component: CreateLink,
  // },
  // {
  //   path: '/link/:_id',
  //   layout: DefaultLayout,
  //   component: Link,
  // },
  // {
  //   path: '/customer/link/:_id',
  //   layout: DefaultLayout,
  //   component: Link,
  // },
  // {
  //   path: '/customer/transaction/order/:_token/:_id',
  //   layout: DefaultLayout,
  //   component: PlaceOrder,
  // },
  // {
  //   path: '/my-posts',
  //   layout: DefaultLayout,
  //   component: MyPosts,
  // },
  // {
  //   path: '/my-orders',
  //   layout: DefaultLayout,
  //   component: MyOrders,
  // },
  // {
  //   path: '/my-sells',
  //   layout: DefaultLayout,
  //   component: MySells,
  // },
  // {
  //   path: '/post',
  //   layout: DefaultLayout,
  //   component: AddNewPost,
  // },
  // {
  //   path: '/p/:_id/:title',
  //   layout: DefaultLayout,
  //   exact: true,
  //   component: Post,
  // },
  // {
  //   path: '/saved-posts',
  //   layout: DefaultLayout,
  //   component: SavedPosts,
  // },
  // {
  //   path: '/login',
  //   layout: DefaultLayout,
  //   component: Login,
  // },
  // {
  //   path: '/privacy-policy',
  //   layout: DefaultLayout,
  //   component: Page,
  // },

  //
  // {
  //   path: '/category/:_id',
  //   layout: DefaultLayout,
  //   component: Archive,
  // },
  {
    path: '/:_slug/:_id',
    layout: DefaultLayout,
    exact: true,
    component: Archive,
  },
  {
    path: '/:_id',
    layout: DefaultLayout,
    exact: true,
    component: Post,
  },

];
