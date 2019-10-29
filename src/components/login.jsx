import React from 'react';
import './sign-in.css';
const axios = require('axios');

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.handleOnChangeUser = this.handleOnChangeUser.bind(this);
    this.handleOnChangePass = this.handleOnChangePass.bind(this);
    this.userNameRef =  React.createRef();
    this.state = {
      name: 'Shadow',
      login: 'vetal',
      password: '3513',
    };
  }

  callBackendAPI = async () => {
    const { login, password} = this.state;
    let res = await axios.post('/login', { username: login, password: password } )
      .then( (res) => {
        console.log(res);
        let data = res.config.data;
        data = JSON.parse(data);
        this.setState({ name: data.username });
        return;
      })
      .catch((err) => { return err; });
    return res;
  };

  handleOnChangeUser = (e) => {
    this.setState({login: e});
  }

  handleOnChangePass = (e) => {
    this.setState({password: e});
  }

  render() {
    const { name } = this.state;
    return(
      <div className='sign-in'>
        <h1> Hello {name} </h1>
        <form className='register' action='/login' method='post'>
          <label>Login</label>
          <input
            className='reg-input'
            type='text'
            name='userName'
            ref={this.userNameRef}
            onChange={ (e)=> {this.handleOnChangeUser(e.target.value);} }
          />

          <label>Password</label>
          <input
            className='reg-input'
            type='text'
            name='userMainPassword'
            onChange={ (e)=> {this.handleOnChangePass(e.target.value);} }
          />

          <button className='reg-button' onClick={ () => {this.callBackendAPI();} } >Login</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
