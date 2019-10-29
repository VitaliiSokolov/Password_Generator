import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Redirect } from 'react-router'
import './App.css';
import logo from './vs.svg';
import Generator from './components/generator';
import SignIn from './components/sign-in';
import Login from './components/login';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null
    };
  }

  componentDidMount() {
    this.callBackendAPI()
      .then( (res) => { this.setState({ userName: res.user }); })
      .catch( (err) => console.log(err) );
  }

  callBackendAPI = async () => {
    let res = await axios.get('/generator')
    .then( (response) => { return response.data } )
    .catch( (err) => console.log(err) );
    console.log('response data', res);
    return res;
  };

  render() {
    const { userName } = this.state;
    return (
      <div className="App">
        <div className="header">
          <object className="logo" data={logo} type="image/svg+xml"></object>
          <a href="/home">
            <h3> Password Generator </h3>
          </a>
        </div>

        <Router >

          <Route exact path="/" render={() => (<Redirect to="/home" />)} />

          <Route path="/home">
            <Link to="/register" className="log-button">
              <h4 > Register new account </h4>
            </Link>
            <Link to="/login" className="log-button">
              <h4 > Login to account </h4>
            </Link>
          </Route>

          <Route path="/register">
            <SignIn />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/generator">
            <Generator name={userName} image={logo}/>
          </Route>

        </Router>

      </div>
    );
  }
}

export default App;
