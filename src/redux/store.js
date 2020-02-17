import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
  key: 'redux-reselect-immutable-normalizr',
  storage, // localStorage
  // blacklist: ['session'],
  // whitelist: ['auth', 'category', 'error', 'video'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store);
  return { store, persistor };
};