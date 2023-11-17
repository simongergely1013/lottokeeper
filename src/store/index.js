import thunk from 'redux-thunk';
import {combineReducers, applyMiddleware} from 'redux';
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from './user';
import owner from './owner';

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['user']
  }


const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, user),
    owner
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)