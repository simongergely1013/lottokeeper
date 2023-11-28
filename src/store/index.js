import thunk from 'redux-thunk';
import {combineReducers, applyMiddleware} from 'redux';
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import data from './data';

const dataPersistConfig = {
    key: 'data',
    storage,
  }

const rootReducer = combineReducers({
    data: persistReducer(dataPersistConfig, data),
});

const persistedReducer = persistReducer(dataPersistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)