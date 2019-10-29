import React from 'react';
import './sign-in.css';
const axios = require('axios');

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.callBackendAPIGet = this.callBackendAPI.bind(this);
    this.state = {
      name: 'Vasyl'
    }
  }

  componentDidMount() {
    // Future data-handler
    // .then( (res) => { this.setState({ userName: res.user }); })
    this.callBackendAPI()
      .then( (res) => { console.log('Server response: ',res); })
      .catch( (err) => console.log(err) );

    this.callBackendAPIGet()
      .then( (res) => {
        let data = res.config.data;
        data = JSON.parse(data);
        this.setState({ name: data.username });
        return data;
      })
      .catch( (err) => console.log(err) );
  }

  callBackendAPI = async () => {
    let res = await axios.post('/login', { username: 'guest', password: '3513' } )
      .then( (response) => { return response; } )
      .catch( (err) => console.log(err) );
    return res;
  };

  callBackendAPIGet = async () => {
    let res = await axios.get('/login')
      .then( (response) => { console.log(response); } )
      .catch( (err) => console.log(err) );
    return res;
  }

  render() {
    const { name } = this.state;
    return(
      <div className='sign-in'>
        <h1> Hello {name} </h1>
        <form className='register' action='/login' method='post'>
          <label>Login</label>
          <input className='reg-input' type='text' name='userName' />

          <label>Password</label>
          <input className='reg-input' type='text' name='userMainPassword' />

          <input className='reg-button' type='submit' value='Sign In' />
        </form>
      </div>
    );
  }
}

export default SignIn;
