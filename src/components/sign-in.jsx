import React from 'react';
import './sign-in.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
  }

  render() {
    return(
      <div className='sign-in'>
        <h1>Hello NewBee!</h1>
        <form className='register'>
          <label>Login</label>
          <input className='reg-input' type='text' name='userName' />

          <label>Email</label>
          <input className='reg-input' type='text' name='userEmail' />

          <label>Password</label>
          <input className='reg-input' type='text' name='userMainPassword' />

          <button className='reg-button' onClick={ (e) => { this.callBackendAPI(e); } } >Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
