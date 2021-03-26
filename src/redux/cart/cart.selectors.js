import { createSelector } from 'reselect';

// input selector - gets whole state and just returns a slice of it
const selectCart = state => state.cart;

// not really used here, just here for demonstration purposes
// const selectUser = state => state.user;

// 1st arg, array of input selectors
// 2nd arg, func that returns the value we want from the input selectors
// that func will have args of the output of each selector
export const selectCartItems = createSelector(
  // [selectCart, selectUser],
  //(cart, user) => {
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems], 
  (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem) => {
    return accumulatedQuantity + cartItem.quantity
  }, 0)
)
