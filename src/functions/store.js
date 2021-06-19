import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const devMode = process.env.NODE_ENV === 'development';

const persistConfig = {
  key: 'tm-ksa',
  storage,
};

const pReducer = persistReducer(persistConfig, reducer);
const middleware = devMode
  ? applyMiddleware(thunk, logger)
  : applyMiddleware(thunk);

const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };

export default store;
