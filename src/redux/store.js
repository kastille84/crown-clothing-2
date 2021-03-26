import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from "redux-logger";

import RootReducer from './root-reducer';

const middlewares = [logger]

export const store = createStore(RootReducer, applyMiddleware(...middlewares));
// this is a persisted version of our store
export const persistor = persistStore(store);

export default {store, persistor};
