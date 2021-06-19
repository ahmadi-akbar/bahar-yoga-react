import { combineReducers } from 'redux';
import Types from './types';

const initialState = {
  menuVisible: false,
  data: {},
  loading: true,
  phoneNumber: null,
  firstName: '',
  lastName: '',
  token: null,
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case Types.Home:
      return Object.assign({}, state, {
        data: {},
        loading: true,
      });

    case Types.Receive:
      return Object.assign({}, state, {
        data,
        loading: false,
      });
    case Types.Error:
      return Object.assign({}, state, {
        loading: false,
      });
    case Types.SaveData: {
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
};

export default combineReducers({
  store: reducer,
});
