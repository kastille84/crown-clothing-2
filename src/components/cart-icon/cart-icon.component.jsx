import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss'

const CartIcon = ({toggleCartHidden, itemCount}) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
)

// Problem, this component will rerender even if nothing changes here
// simply because it's connected to the store and the store returns new state all the time
// causing mapStateToProps to rerun even when theres no changes here

// Reselect/ Caching/ Memoization
// if the cartItems value doesnt change 
// and the output doesnt change
// we DONT want to rerender our component

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () =>dispatch(toggleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);