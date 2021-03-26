import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user/user.actions";
// selectors
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // sets up a subscription with firebase
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })

          console.log(this.state)
        });
      } else {
        this.props.setCurrentUser(userAuth); // in this case, userAuth = null;
      }

    })
  }

  componentWillUnmount() {
    // closes the subscription
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => {
            return this.props.currentUser? (
              <Redirect to="/" />
            ):
              <SignInAndSignUpPage />
          }} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, {
  setCurrentUser
})(App);
