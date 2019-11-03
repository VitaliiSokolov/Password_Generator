import React from 'react';
import './sign-in.css';
const axios = require('axios');
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangeUser = this.handleOnChangeUser.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePass = this.handleOnChangePass.bind(this);
    this.state = {
      login: '',
      email: '',
      password: '',
      inputValidation: false
    };
  }

  // componentDidUpdate(){
  //   console.log(this.state.login.split(''));
  // }

  callBackendAPI = async (e) => {
    e.preventDefault();
    const { login, password, email } = this.state;
    if(login == '' && password == ''){
      if(password.splt('').length > 5) {
        this.setState({inputValidation: true});
      }
    } else if(login && password) {
      this.setState({inputValidation: false});
    }
    axios.post('/register', { username: login, email, password } )
      .then( (res) => {console.log(res);})
      .catch( (error) => {console.log(error);});
  };
  handleOnChangeUser = (e) => {
    this.setState({login: e});
  }
  handleOnChangeEmail = (e) => {
    this.setState({email: e});
  }
  handleOnChangePass = (e) => {
    this.setState({password: e});
  }

  render() {
    const { inputValidation } = this.state;
    return(
      <div className='sign-in'>
        <h1>Hello NewBee!</h1>
        <form className='register'>
          <label>Login</label>
          <input
            className={inputValidation? 'reg-input bad':'reg-input'}
            type='text'
            name='userName'
            ref={this.userNameRef}
            onChange={ (e)=> {this.handleOnChangeUser(e.target.value);} }
          />

          <label>Email</label>
          <input className='reg-input'
            type='text'
            name='userEmail'
            ref={this.userNameRef}
            onChange={ (e)=> {this.handleOnChangeEmail(e.target.value);} }
          />

          <label>Password</label>
          <input
            className={inputValidation? 'reg-input bad':'reg-input'}
            type='password'
            name='userMainPassword'
            onChange={ (e)=> {this.handleOnChangePass(e.target.value);} }
          />
          {inputValidation? <p>Please enter correct login and password</p> : null }
          <button className='reg-button' onClick={ (e) => { this.callBackendAPI(e); } } >Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
