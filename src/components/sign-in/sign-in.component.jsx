import React, {Component} from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    }catch(error) {
      console.log(error.message);
    }
    this.setState({email: '', password: ''});
  }

  handleChange = (e) => {
    const { value,  name} = e.target;
    // dynamically set our state
    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            type="email" 
            name="email" 
            value={this.state.email} 
            handleChange={this.handleChange}
            label="Email"
            required />
          <FormInput 
            type="password" 
            name="password" 
            value={this.state.password} 
            handleChange={this.handleChange}
            label="Password"
            required />

          <div className="buttons">
            <CustomButton type="submit" >Sign In</CustomButton>
            <CustomButton 
              type="button"
              isGoogleSignIn 
              onClick={() => signInWithGoogle()} 
            >Sign In with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn