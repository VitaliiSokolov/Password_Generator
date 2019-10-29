import React from 'react';
import './sign-in.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return(
      <div className='sign-in'>
        <h1> Hello {name} </h1>
        <form className='register' action='/login' method='post'>
          <label>Login</label>
          <input className='reg-input' type='text' name='userName' />

          <label>Email</label>
          <input className='reg-input' type='text' name='userEmail' />

          <label>Password</label>
          <input className='reg-input' type='text' name='userMainPassword' />

          <input className='reg-button' type='submit' value='Sign In' />
        </form>
      </div>
    );
  }
}

export default SignIn;
