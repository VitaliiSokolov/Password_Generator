import React from 'react';
import { withRouter } from 'react-router-dom';
import './login.scss';
const axios = require('axios');
const loginValidate = require('../utils/loginValidation');


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.handleOnChangeUser = this.handleOnChangeUser.bind(this);
    this.handleOnChangePass = this.handleOnChangePass.bind(this);
    this.userNameRef =  React.createRef();
    this.state = {
      name: 'default name',
      userId: '',
      login: 'wrong login',
      password: 'wrong password',
      token: 'empty token',
      errorMessage: '',
      logValidation: false,
      passValidation: false,
      serverValidation: false
    };
  }
  componentDidMount() {
  }
  callBackendAPI = async (e) => {
    e.preventDefault();
    const { login, password } = this.state;
    this.setState({ validation: false, passValidation: false, serverValidation: false });
    const responseArray = await loginValidate(login, password);
    this.setState({ errorMessage: responseArray[0], logValidation: responseArray[1], passValidation: responseArray[2] });

    if(responseArray[0].length < 1) {
      axios.post('/login', { username: login, password: password } )
        .then( (res) => {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userId', res.data.user.id);
          const user = res.data.user;
          this.props.parentCallbackUser(user);
          this.props.parentCallback(true);
          let data = res.config.data;
          data = JSON.parse(data);
          this.setState({ name: data.username });
          this.props.parentCallbackUsername(this.state.name);
          if(res.data.token === null){
            this.setState({ serverValidation: true });
          } else {
            this.setState({ serverValidation: false });
            this.props.history.push('/gen');
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ serverValidation: true });
        });
    }
  };

  handleOnChangeUser = (e) => {
    this.setState({login: e});
  }
  handleOnChangePass = (e) => {
    this.setState({password: e});
  }

  render() {
    const { errorMessage, logValidation, passValidation, serverValidation } = this.state;
    return(
      <div className='sign-in'>
        <form className='register'>
          <label className='login' >Login</label>
          <input className={logValidation? 'reg-input bad':'reg-input'} type='text' name='userName' ref={this.userNameRef} onChange={ (e)=> {this.handleOnChangeUser(e.target.value);} } />
          <label className='password' >Password</label>
          <input className={passValidation? 'reg-input bad':'reg-input'} type='password' name='userMainPassword' onChange={ (e)=> {this.handleOnChangePass(e.target.value);} } />
          {logValidation? <p className='wrong'>{errorMessage}</p> : null}
          {passValidation? <p className='wrong'>{errorMessage}</p> : null}
          {serverValidation? <p className='wrong'>Incorrect login or password!</p> : null}
          <button className='reg-button myButtonLogin' onClick={ (e) => { this.callBackendAPI(e); } } >Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
