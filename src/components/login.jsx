import React from 'react';
import { withRouter } from 'react-router-dom';
import './login.css';
const axios = require('axios');

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
      validation: false
    };
  }
  componentDidMount() {
  }
  callBackendAPI = async (e) => {
    e.preventDefault();
    const { login, password, validation} = this.state;
    axios.post('/login', { username: login, password: password } )
      .then( (res) => {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userId', res.data.user.id);
        // console.log(res.data.user);
        const user = res.data.user;
        this.props.parentCallbackUser(user);
        this.props.parentCallback(true);
        let data = res.config.data;
        data = JSON.parse(data);
        this.setState({ name: data.username });
        this.props.parentCallbackUsername(this.state.name);
        if(res.data.token){
          this.setState({ validation: !validation });
          this.props.history.push('/gen');
        } else {
          this.setState({ validation: !validation });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ validation: !validation });
      });
  };

  handleOnChangeUser = (e) => {
    this.setState({login: e});
  }
  handleOnChangePass = (e) => {
    this.setState({password: e});
  }

  render() {
    const { validation } = this.state;
    return(
      <div className='sign-in'>
        <form className='register'>
          <label className='login' >Login</label>
          <input className='reg-input' type='text' name='userName' ref={this.userNameRef} onChange={ (e)=> {this.handleOnChangeUser(e.target.value);} } />
          <label className='password' >Password</label>
          <input className='reg-input' type='password' name='userMainPassword' onChange={ (e)=> {this.handleOnChangePass(e.target.value);} } />
          {validation? <p className='wrong'>Incorrect login or password!</p> : null}
          <button className='reg-button myButtonLogin' onClick={ (e) => { this.callBackendAPI(e); } } >Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
