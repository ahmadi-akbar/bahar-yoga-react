import axios from 'axios';
import Types from './types';
import store from './store';

import { postData, getData, putData, deleteData, clearState } from './utils';

// clearState
export const MainUrl = window.globalTS.rest_url;
// export const MainUrl = "http://localhost:3003";
export const ApiUrl = window.globalTS.rest_url;
// export const ApiUrl = "http://localhost:3003/customer";

export const Home = () => ({
  type: Types.Home,
});

export const receive_data = (data) => ({
  type: Types.Receive,
  data,
});

export const receive_error = (data) => ({
  type: Types.Error,
  data,
});

export const SaveData = (data) =>
  store.dispatch({
    type: Types.SaveData,
    data,
  });

const handleErr = (err) => {
  console.error('err => ', err);
  store.dispatch(receive_error(err));
};

export const Logout = () => {
  clearState();
  window.location.replace('/');
};

export const LevelCategoriesData = (i = '') =>
  getData(`${ApiUrl}/category/level/${i}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const LevelCountriesData = (i = '') =>
  getData(`${ApiUrl}/country/level/${i}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });
export const getAllSidebarCategoriesData = (i = '') =>
  getData(`${ApiUrl}/category/all/0/300`, {}, true)
    .then(({ data }) => {
      return data || [];
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const SidebarCategoriesData = (i = '') =>
  getData(`${ApiUrl}/category/sidebar/${i}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getMyPost = (_id) =>
  getData(`${ApiUrl}/game/myPost/${_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getMyPosts = (offset = 0, limit = 100) =>
  getData(`${ApiUrl}/game/myPosts/mine/${offset}/${limit}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getMyOrders = (offset = 0, limit = 100) =>
  getData(`${ApiUrl}/order/myOrders/mine/${offset}/${limit}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getStoryList = (offset = 0, limit = 24) =>
  getData(`${ApiUrl}/story/${offset}/${limit}`, {}, true)
    .then((res) => res.data)
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const PlaceOrderF = (token, _id) =>
  getData(`${ApiUrl}/transaction/order/${token}/${_id}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getMySells = (offset = 0, limit = 100) =>
  getData(`${ApiUrl}/order/mySells/mine/${offset}/${limit}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getLink = (i) =>
  getData(`${ApiUrl}/link/view/${i}`, {}, false)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getLinks = (offset = 0, limit = 100) =>
  getData(`${ApiUrl}/link/myLinks/mine/${offset}/${limit}`, {}, true)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
      return err;
    });

export const getHome = (offset = 0, limit = 24, search, filter = {}) => {
  return new Promise(function (resolve, reject) {
    // console.log('getHome...',store.getState().store.country)
    let params = {};
    const { country } = store.getState().store;
    if (country) {
      params = {
        country: country,
      };
    }
    if (filter) {
      if (filter['type']) params['type'] = filter['type'];
    }
    getData(`${ApiUrl}akbar/v1/home`, { params }, true)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        handleErr(err);
        reject(err);
      });
  });
};
export const getPosts = (offset = 0, limit = 24, _slug,search, filter = {}) => {
  return new Promise(function (resolve, reject) {
    // console.log('getPosts...',store.getState().store.country)
    let params = {};
    const { country } = store.getState().store;
    if (country) {
      params = {
        country: country,
      };
    }
    if (filter) {
      if (filter['type']) params['type'] = filter['type'];
    }
    postData(`${ApiUrl}akbar/v1/archive/${_slug}/${offset}/${limit}`, { params }, false)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        handleErr(err);
        reject(err);
      });
  });
};

export const getPostsByCat = (
  offset = 0,
  limit = 24,
  _slug,
  _id,
  search,
  filter = {}
) => {
  return new Promise(function (resolve, reject) {
    let params = {};
    const { country } = store.getState().store;
    if (country) {
      params = {
        country: country,
      };
    }
    if (_id) {
      params = {
        slug: _id,
      };
    }
    if (filter) {
      if (filter['type']) params['type'] = filter['type'];
    }
    postData(
      `${ApiUrl}akbar/v1/archive/${_slug}/${offset}/${limit}`,
      { params },
      false
    )
      .then((data) => {
        let mainD = data['data'];
        if (mainD.success === false) {
          mainD = [];
        }
        resolve(mainD);
      })
      .catch((err) => {
        handleErr(err);
        reject(err);
      });
  });
};

export const sendExtra = (d, obj) => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/game/${d}`, obj, false)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const contactBoy = (d, obj) => {
  return new Promise(function (resolve, reject) {
    getData(`${MainUrl}/${d}`, obj, false)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addBookmark = (_id) => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/customer/wishlist/${_id}`, {}, true)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateCard = (card) => {
  return new Promise(async function (resolve) {
    await SaveData({ card });
    resolve({});
  });
};
export const addToCard = (_id) => {
  return new Promise(async function (resolve, reject) {
    await getData(`${ApiUrl}/game/f/${_id}`, {}, true)
      .then(async (data) => {
        let mainD = await data['data'];
        // let {card} = await store.getState().store;
        // if (!card) {
        //   card = [];
        // }
        let card = [];
        await card.push(mainD);
        let sum = 0;
        await card.map(async (item) => {
          if (item.price) sum += item.price;
          return;
        });
        console.log(card, sum);
        await SaveData({ card, sum });

        await resolve(card);
      })
      .catch((err) => {
        handleErr(err);
        reject(err);
      });
  });
};
export const createLink = () => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/link`, {}, true)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const createOrder = (obj) => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/order`, obj, true)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const sendSms = (obj) => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/sms`, obj, true)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const buy = (_id) => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/transaction/buy/${_id}`, {}, true)
      .then((data) => {
        let mainD = data['data'];

        resolve(mainD);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getPost = (i) =>
  postData(`${ApiUrl}akbar/v1/post`, {slug:i}, false)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErr(err);
    });

export const getContactData = (i) => {
  return new Promise(function (resolve, reject) {
    getData(`${ApiUrl}/game/getContactData/${i}`, {}, true)
      .then((data) => {
        let mainD = data['data'];
console.log(mainD);
        resolve(mainD);
      })
      .catch((err) => {
        handleErr(err);
        reject(err);
      });
  });
};

export const uploadPostFile = (file = {}, onUploadProgress, id) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', file.type);

  let cancel;

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      token: store.getState().store.token,
    },
    cancelToken: new axios.CancelToken((c) => {
      cancel = c;
    }),
    onUploadProgress: (ev) => {
      const percent = (ev.loaded / ev.total) * 100;
      onUploadProgress(percent, id, cancel);
    },
  };
  return axios
    .post(`${ApiUrl}/game/fileUpload`, formData, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error('err in axios => ', err);
      return err;
    });
};

export const CameFromPost = (bool) => {
  return new Promise(async function (resolve, reject) {
    await SaveData({ CameFromPost: bool });
    await resolve(true);
  });
};

export const enableAgent = (enableAgent) => {
  return new Promise(async function (resolve, reject) {
    await SaveData({ enableAgent: enableAgent });
    window.location.replace('/make-money');

    await resolve(true);
  });
};
export const enableSell = (enableSell) => {
  return new Promise(async function (resolve, reject) {
    await SaveData({ enableSell: enableSell });
    window.location.reload();
    await resolve(true);
  });
};
export const updateAgent = (agent_id, link_id) => {
  return new Promise(async function (resolve, reject) {
    console.log('agent_id', agent_id);
    await SaveData({ agent: agent_id, link: link_id });
    await resolve(true);
  });
};
export const goToProduct = (bool) => {
  return new Promise(async function (resolve, reject) {
    console.log('set goToProduct ' + bool);
    await SaveData({ goToProduct: bool });
    await resolve(true);
  });
};
export const setLanguage = (lan) => {
  return new Promise(async function (resolve, reject) {
    SaveData({ lan: 'en' });
  });
};
export const setCountry = (country, d = true) => {
  return new Promise(async function (resolve, reject) {
    await SaveData({ country: country });
    if (d) await window.location.reload();
  });
};
export const addToDataArray = (obj) => {
  return new Promise(async function (resolve, reject) {
    let arr = (await store.getState().store.allPostData) || {};
    arr[obj.name] = obj.value;
    await SaveData({ allPostData: arr });
  });
};
export const pushArrayToDataArray = (obj) => {
  return new Promise(async function (resolve, reject) {
    let arr = (await store.getState().store.allPostData) || {};

    if (arr[obj.name] && arr[obj.name].length) {
      if (!arr[obj.name].includes(obj.value)) arr[obj.name].push(obj.value);
      else {
        const index = arr[obj.name].indexOf(obj.value);
        if (index > -1) {
          arr[obj.name].splice(index, 1);
        }
      }
      // console.log('arr[obj.name] exist',arr[obj.name]);
    } else {
      arr[obj.name] = [obj.value];
    }
    await SaveData({ allPostData: arr });
  });
};
export const savePost = (obj) => SaveData({ ...obj });

export const toggleSidebar = (menuVisible) =>
  SaveData({ menuVisible: !menuVisible });

export const saveCountryPost = (obj) => {
  const { countries, mainCountryList, mainCountry, countryChoosed } = obj;

  SaveData({
    countries,
    mainCountryList,
    mainCountry,
    countryChoosed,
  });
};

export const clearPost = () =>
  SaveData({
    mainList: [],
    mainCategory: {},
    files: [],
    catChoosed: [],
    title: '',
    description: '',
    countryChoosed: [],
    mainCountryList: [],
    mainCountry: {},
    countries: [],
    price: '',
    type: '',
    virtual: '',
    categories: [],
  });

export const clearPP = (obj) => {
  return new Promise(async function (resolve, reject) {
    SaveData({ ...obj });

    await resolve({});
  });
};
export const submitPost = () => {
  let {
    mainCategory,
    catChoosed,
    mainList,
    categories,
    mainCountry,
    countryChoosed,
    mainCountryList,
    countries,
    description,
    title,
    files,
    _id,
    country,
    type,
    price,
    allPostData,
  } = store.getState().store;

  let req = {
    description,
    title,
    mainCategoryId: mainCategory,
    mainCategory: mainCategory,
    catChoosed,
    mainList,
    categories,
    // mainCountry: mainCountry,
    // countryChoosed: countryChoosed,
    // mainCountryList: mainCountryList,
    // countries: countries,
    // country:country,

    firstCategory: catChoosed[0],
    secondCategory: catChoosed[1],
    thirdCategory: catChoosed[2],
    files,
    price,
  };

  return new Promise(function (resolve, reject) {
    console.log('hytrfgh', mainCategory);

    if (mainCategory && mainCategory._id) {
      if (_id) {
        putData(`${ApiUrl}/game/${_id}`, req, true)
          .then((data) => {
            let mainD = data['data'];

            SaveData({
              description: '',
              title: '',
              mainCategory: {},
              categories: [],
              mainList: [],
              catChoosed: [],
              price: '',
            });

            // }
            resolve(mainD);
          })
          .catch((err) => {
            console.log('sdf', err);
            handleErr(err);
            reject(err);
          });
      } else {
        postData(
          `${ApiUrl}/post`,
          {
            description,
            title,
            mainCategoryId: mainCategory,
            mainCategory,
            catChoosed,
            mainList,
            categories,
            firstCategory: catChoosed[0],
            secondCategory: catChoosed[1],
            thirdCategory: catChoosed[2],
            mainCountry,
            countryChoosed,
            mainCountryList,
            countries,
            country,
            files,
            type,
            price,
            data: allPostData,
          },
          true
        )
          .then((data) => {
            let mainD = data['data'];

            SaveData({
              description: '',
              title: '',
              mainCategory: {},
              categories: [],
              mainList: [],
              catChoosed: [],
              price: '',
              allPostData: {},
            });

            // }
            resolve(mainD);
          })
          .catch((err) => {
            console.log('sdf', err);
            handleErr(err);
            reject(err);
          });
      }
    } else {
      reject({
        success: false,
      });
    }
  });
};
export const deletePost = (id) => {
  let _id = id;

  if (!id) _id = store.getState().store._id;

  return new Promise(function (resolve, reject) {
    if (_id) {
      deleteData(`${ApiUrl}/game/${_id}`, true)
        .then((data) => {
          let mainD = data['data'];

          SaveData({
            description: '',
            title: '',
            mainCategory: {},
            categories: [],
            mainList: [],
            catChoosed: [],
          });

          // }
          resolve(mainD);
        })
        .catch((err) => {
          console.log('sdf', err);
          handleErr(err);
          reject(err);
        });
    } else {
      reject({
        success: false,
      });
    }
  });
};

export const register = (number) => {
  return postData(`${ApiUrl}/customer/authCustomer`, { phoneNumber: number })
    .then(({ data }) => {
      if (data.success) SaveData({ phoneNumber: number });

      return data;
    })
    .catch((err) => {
      console.log('sdf', err);
      handleErr(err);
      return err;
    });
};

export const setPassWithPhoneNumber = (data) => {
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/customer/setPassword`, data, true)
      .then((data) => {
        let mainD = data['data'];
        if (mainD.success) {
          SaveData({
            // phoneNumber: mainD.customer.phoneNumber,
            firstName: mainD.customer.firstName,
            lastName: mainD.customer.lastName,
            email: mainD.customer.email,
            // token: mainD.customer.token,
          });
        }
        resolve(mainD);
      })
      .catch((err) => {
        console.log('sdf', err);
        handleErr(err);
        reject(err);
      });
  });
};

export const authCustomerWithPassword = (data) => {
  console.log('==> authCustomerWithPassword()');
  return new Promise(function (resolve, reject) {
    postData(`${ApiUrl}/customer/authCustomerWithPassword`, data)
      .then((data) => {
        let mainD = data['data'];
        if (mainD.success) {
          SaveData({
            phoneNumber: mainD.customer.phoneNumber,
            firstName: mainD.customer.firstName,
            lastName: mainD.customer.lastName,
            email: mainD.customer.email,
            token: mainD.customer.token,
          });
        }
        resolve(mainD);
      })
      .catch((err) => {
        console.log('sdf', err);
        handleErr(err);
        reject(err);
      });
  });
};

export const submitProfile = (obj) => {
  return new Promise(function (resolve, reject) {
    putData(`${ApiUrl}/customer`, obj, true)
      .then((data) => {
        let mainD = data['data'];
        if (mainD.success) {
          SaveData(obj);
        }
        resolve(mainD);
      })
      .catch((err) => {
        console.log('sdf', err);
        handleErr(err);
        reject(err);
      });
  });
};

export const active = (req) => {
  return postData(`${ApiUrl}/customer/activateCustomer`, req)
    .then(({ data = {} }) => {
      console.log('data', data);
      if (data.success) {
        const { token } = data;

        SaveData({ token });
      }

      return data;
    })
    .catch((err) => {
      handleErr(err);
    });
};
