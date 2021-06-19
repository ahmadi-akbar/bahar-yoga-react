import store from './store';
import moment from 'jalali-moment';
import axios from 'axios';

export const postData = (url = '', data = {}, f = false) => {
  return new Promise(function (resolve, reject) {
    let option = {
      headers: {
        lan: store.getState().store.lan,
      },
    };
    if (f) {
      let token = store.getState().store.token;
      if (token) option['headers']['token'] = token;
      else window.location.replace('/login');
    }
    axios
      .post(url, data, option)
      .then(function (response) {
        resolve(response);
        // response.json();
      })
      .catch(function (error) {
        console.log('post error()', error);
        reject(error);
      });
  });
};
export const putData = (url = '', data = {}, f = false) => {
  return new Promise(function (resolve, reject) {
    // Default options are marked with *
    // return fetch(url, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, cors, *same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
    //   headers: {
    //     "Content-Type": "application/json"
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: "follow", // manual, *follow, error
    //   referrer: "no-referrer", // no-referrer, *client
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    // }).then(response => {
    //   }); // parses JSON response into native JavaScript objects
    let option = {
      headers: {
        lan: store.getState().store.lan,
      },
    };
    if (f) option['headers']['token'] = store.getState().store.token;

    axios
      .put(url, data, option)
      .then(function (response) {
        resolve(response);
        // response.json();
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
export const deleteData = (url = '', f = false) => {
  return new Promise(function (resolve, reject) {
    // Default options are marked with *
    // return fetch(url, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, cors, *same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
    //   headers: {
    //     "Content-Type": "application/json"
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: "follow", // manual, *follow, error
    //   referrer: "no-referrer", // no-referrer, *client
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    // }).then(response => {
    //   }); // parses JSON response into native JavaScript objects
    let option = {
      headers: {
        lan: store.getState().store.lan,
      },
    };
    if (f) option['headers']['token'] = store.getState().store.token;

    axios
      .delete(url, option)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export const getData = (
  url = '',
  option = { headers: { token: '' }, params: {} },
  f = false
) => {
  // Default options are marked with *
  return new Promise(function (resolve, reject) {
    if (!option) option = {};

    if (!option.headers) option.headers = {};

    // option['headers']['access-control-allow-origin'] = "*";
    option['headers']['lan'] = store.getState().store.lan;
    if (f) option['headers']['token'] = store.getState().store.token;

    axios
      .get(url, option)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
  // return fetch(url, option).then(response => response.json()); // parses JSON response into native JavaScript objects
};

export const clearState = () => {
  try {
    localStorage.clear();
  } catch {
    // ignore write errors
  }
};

export const timeDifference = (date1, date2) => {
  var difference = date1 - date2;
  return {
    daysDifference: Math.floor(difference / 86400),
    hoursDifference: Math.floor(difference / 3600),
    minutesDifference: Math.floor(difference / 60),
    secondsDifference: Math.floor(difference),
  };
};

export const timeDifferenceTextForAds = (createdAtTimeStamp) => {
  var newDate = Math.floor(new Date().getTime() / 1000);
  var diff = timeDifference(newDate, createdAtTimeStamp / 1000);
  if (
    diff.daysDifference <= 0 &&
    diff.hoursDifference <= 0 &&
    diff.minutesDifference <= 0 &&
    diff.secondsDifference <= 15
  ) {
    return 'لحظاتی پیش';
  } else if (
    diff.daysDifference <= 0 &&
    diff.hoursDifference <= 0 &&
    diff.minutesDifference <= 0 &&
    diff.secondsDifference > 15
  ) {
    return `${diff.secondsDifference} ثانیه پیش`;
  } else if (diff.daysDifference <= 0 && diff.hoursDifference <= 0) {
    return `${diff.minutesDifference} دقیقه پیش`;
  } else if (diff.daysDifference <= 0 && diff.hoursDifference > 0) {
    return `${diff.hoursDifference} ساعت پیش`;
  } else if (diff.daysDifference > 0 && diff.daysDifference / 7 < 1) {
    return `${diff.daysDifference} روز پیش`;
  } else if (
    diff.daysDifference > 0 &&
    diff.daysDifference / 7 >= 1 &&
    diff.daysDifference / 7 < 4
  ) {
    return `${Math.floor(diff.daysDifference / 7)} هفته پیش`;
  } else if (
    diff.daysDifference > 0 &&
    diff.daysDifference / 7 >= 1 &&
    diff.daysDifference / 7 >= 4
  ) {
    return `${Math.floor(diff.daysDifference / 7 / 4)} ماه پیش`;
  }
};

export const dFormat = (date, t) => {
  let ti = '';
  let now = new moment();
  let d = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

  let obj = moment.duration(now.diff(d))._data;

  const { days, hours, minutes } = obj;
  if (days) {
    if (days === 1) ti = `${t('ago')} ${days} ${t('Day')}`;
    else ti = `${t('ago')} ${days} ${t('Days')}`;
  } else if (!days && hours) ti = hours + ' ' + t('Hours') + ' ' + t('ago');
  else if (!days && !hours && minutes) {
    if (minutes < 60) ti = t('Half an hour') + ' ' + t('ago');
    if (minutes < 30) ti = t('A quarter') + ' ' + t('ago');
    if (minutes < 15) ti = t('Minutes') + ' ' + t('ago');
  } else ti = t('A few moments') + ' ' + t('ago');

  return ti;
};

export const PriceFormat = (p = 0) =>
  p
    .toString()
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

export const $ = (el) => document.querySelector(el);

export const fNum = (p = '') => p.replace(/^0+(?=\d)/, '');

export const dateFormat = (d) =>
  moment(d, 'YYYY-MM-DDTHH:mm:ss.SSSZ').locale('en').format('YYYY/MM/DD HH:mm');
