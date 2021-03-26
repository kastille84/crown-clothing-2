import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //to user localstorage as persisted storage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

// persist config
const persistConfig = {
  key: 'root', // at what point in our reducer do we want to start persisting
  storage: storage, // storage type
  // array containing strings name of reducers we want to persist
  // 'cart', for cartReducer
  // user is being persisted by firebase so we don't include it
  whitelist: ['cart'] 
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

// exporting a modified version of our root reducer
// but now with persistence capabilities
export default persistReducer(persistConfig, rootReducer);