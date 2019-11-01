import React from 'react';
import { withRouter } from 'react-router-dom';
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
      login: 'x',
      password: 'x',
      token: 'ssss',
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
        console.log(res);
        this.props.parentCallback(res.data.token);
        let data = res.config.data;
        data = JSON.parse(data);
        this.setState({ name: data.username });
        if(res.data.token){
          this.props.history.push('/gen');
          this.setState({ validation: !validation });
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
    const { name, validation } = this.state;
    return(
      <div className='sign-in'>
        <h1> Hello {name} </h1>
        <form className='register'>
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
          {validation? <p className='wrong'>Incorrect login or password!</p>:null}
          <button className='reg-button' onClick={ (e) => { this.callBackendAPI(e); } } >Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
