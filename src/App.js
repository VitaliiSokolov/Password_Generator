import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import logo from './vs.svg';
import Generator from './components/generator/generator';
import SignIn from './components/sign-in/sign-in';
import Login from './components/login/login';
import Error from './components/error';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.callbackFunctionUsername = this.callbackFunctionUsername.bind(this);
    this.callbackFunctionUser = this.callbackFunctionUser.bind(this);
    this.state = {
      userName: '',
      logged: false,
      user: {}
    };
  }

  callbackFunction = (childData) => {
    console.log('logged', childData);
    if(childData) {
      this.setState({logged: true});
    } else {
      this.setState({logged: false});
    }
  }
  callbackFunctionUsername = (childUserName) => {
    sessionStorage.setItem('userName', childUserName);
    this.setState({userName: childUserName});
  }
  callbackFunctionUser = (childUser) => {
    this.setState({user: childUser});
  }

  render() {
    const { userName, logged } = this.state;
    const token = sessionStorage.getItem('token');
    return (
      <div className='App'>
        <div className='header'>
          <a href='/home'>
            <h3>Password </h3>
          </a>
          <object className='logo' data={logo} type='image/svg+xml' alt='VS'></object>
          <a href='/home'>
            <h3> Generator</h3>
          </a>
        </div>

        <Router >
          <Route exact path='/' render={() => (<Redirect to='/home' />)} />
          <Switch>
            <Route path='/home'>
              {!token && !logged ? <Link to='/auth/register' className='log-button'> <h4>Register new account</h4> </Link>:null }
              {token && !logged ? <Link to='/user' className='log-button'> <h4> Generator</h4> </Link> : <Link to='/auth/login' className='log-button'> <h4>Login to account</h4> </Link> }
            </Route>

            <Route path='/auth/register'>
              <SignIn/>
            </Route>

            <Route path='/auth/login'>
              <Login name={userName} parentCallback = {this.callbackFunction}  parentCallbackUsername = {this.callbackFunctionUsername}  parentCallbackUser={this.callbackFunctionUser}/>
            </Route>

            <Route path='/user'>
              <Generator parentCallback = {this.callbackFunction}  image={logo}  />
            </Route>

            <Route path='/*' component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
