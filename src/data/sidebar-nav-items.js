import store from '@/functions/store';

export default function SidebarItem() {
  const {
    token,
    phoneNumber,
    firstName,
    lastName,
    enableSell,
    enableAgent,
  } = store.getState().store;

  let profile = phoneNumber;
  if (firstName || lastName) profile = firstName + ' ' + lastName;

  if (token) {
    let c = [
      {
        title: 'posts',
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: '/',
      },
      //  {
      //   title: "products",
      //   htmlBefore: '<i class="material-icons">shopping_cart</i>',
      //   to: "/products",
      // },

      {
        title: profile,
        htmlBefore: '<i class="material-icons">&#xE7FD;</i>',
        to: '/profile',
      },
      {
        title: 'my posts',
        htmlBefore: '<i class="material-icons">&#xE8B8;</i>',
        to: '/my-posts',
      },
      {
        title: 'my orders',
        htmlBefore: '<i class="material-icons">list_alt</i>',
        to: '/my-orders',
      },
    ];
    if (enableSell) {
      c.push({
        title: 'my sells',
        htmlBefore: '<i class="material-icons">list_alt</i>',
        to: '/my-sells',
      });
    }
    if (enableAgent) {
      c.push({
        title: 'make money',
        htmlBefore: '<i class="material-icons">money</i>',
        to: '/make-money',
      });
    }
    return c;
  } else {
    console.log('running menu without user login');
    // return [
    //
    //   {
    //     title: 'login / register',
    //     htmlBefore: '<i class="material-icons">person</i>',
    //     to: '/login',
    //   },
    //   {
    //     title: 'Home',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/',
    //   },
    //   {
    //     title: 'Prematch',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/prematch',
    //   },
    //   {
    //     title: 'Live',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/live',
    //   },
    //   {
    //     title: '',
    //     type:'hr',
    //     to: '/',
    //   },
    //   {
    //     title: 'Subscription',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/subscription',
    //   },
    //   {
    //     title: 'Wallet',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/wallet',
    //   },
    //   {
    //     title: 'Bonus',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/bonus',
    //   },
    //   {
    //     title: '',
    //     type:'hr',
    //     to: '/',
    //   }
    //   , {
    //     title: 'Calculator',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/calculator',
    //   },
    //
    //   {
    //     title: 'Settings',
    //     htmlBefore: '<i class="material-icons">vertical_split</i>',
    //     to: '/settings',
    //   },
    // ];
    let ujh=[];
    window.globalTS.menu.mainmenu.items.map((item,i)=>{
      ujh.push( {
        title: item.title,
        // htmlBefore: '<i class="material-icons">person</i>',
        to: item.url,
      });

    })
    return ujh;
  }
}
