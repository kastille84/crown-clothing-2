import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

// import the svg
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// selectors
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({currentUser, hidden}) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/contact">CONTACT</Link>
      {
        currentUser? 
          <div className="option" onClick={()=> auth.signOut()}>SIGN OUT</div>
        : 
          <Link className="option" to="/signin">SIGN IN</Link>
      }
      <CartIcon />
    </div>
    {
      hidden?
        null: <CartDropdown />
    }
  </div>
)

// this is fine to do for our selectors, but if we have many pieces of state it can get repetitive
// therefore use 'createStructuredSelector'
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// })
// createStructuredSelector will take care of passing the state to each selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);