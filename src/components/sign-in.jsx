import React from 'react';
import './sign-in.css';
import { withRouter } from 'react-router-dom';
const axios = require('axios');
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangeUser = this.handleOnChangeUser.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePass = this.handleOnChangePass.bind(this);
    this.popupRef = React.createRef();
    this.state = {
      login: '',
      email: '',
      password: '',
      inputValidationLogin: false,
      inputValidationEmail: false,
      inputValidationPassword: false,
      errorMessage: ''
    };
  }
  callBackendAPI = async (e) => {
    e.preventDefault();
    const { login, password, email } = this.state;

    if(login == '' && password == ''){
      if(password.splt('').length > 5) {
        this.setState({inputValidationLogin: true, inputValidationPassword: true});
      }
    } else if(login && password) {
      this.setState({inputValidationLogin: false, inputValidationEmail: false, inputValidationPassword: false});
    }

    await axios.post('/register', { username: login, email, password } )
      .then( (res) => {
        console.log(res);
        this.setState({errorMessage: ''});
        let poppupElement = this.popupRef.current;
        poppupElement.classList.add('active');
        const hidden = () => {
          poppupElement.classList.remove('active');
          this.props.history.push('/login');
        };
        setTimeout(hidden, 2500);
      })
      .catch( (error) => {
        console.log(error);
        this.setState({errorMessage: 'Incorrect input(s)', inputValidationLogin: true, inputValidationEmail: true});
      });
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
    const { inputValidationLogin, inputValidationEmail, inputValidationPassword, errorMessage } = this.state;
    return(
      <div className='sign-in'>
        <div className='popup' ref={this.popupRef} >
          <h1>Welcome!</h1>
        </div>
        <h1>Hello</h1>
        <form className='register'>
          <label>Login</label>
          <input className={inputValidationLogin? 'reg-input bad':'reg-input'} type='text' name='userName' ref={this.userNameRef} onChange={ (e)=> {this.handleOnChangeUser(e.target.value);} } />
          <label>Email</label>
          <input className={inputValidationEmail? 'reg-input bad':'reg-input'} type='text' name='userEmail' ref={this.userNameRef} onChange={ (e)=> {this.handleOnChangeEmail(e.target.value);} } />
          <label>Password</label>
          <input className={inputValidationPassword? 'reg-input bad':'reg-input'} type='password' name='userMainPassword' onChange={ (e)=> {this.handleOnChangePass(e.target.value);} } />
          {inputValidationLogin || inputValidationEmail || inputValidationPassword? <p style={{'width':'85%', 'margin':'0'}}>{errorMessage}</p> : null }
          <button className='reg-button' onClick={ (e) => { this.callBackendAPI(e); } } >Sign In</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
