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
import Generator from './components/generator';
import SignIn from './components/sign-in';
import Login from './components/login';
import Error from './components/error';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.callbackFunctionUsername = this.callbackFunctionUsername.bind(this);
    this.state = {
      userName: '',
      logged: false,
    };
  }

  callbackFunction = (childData) => {
    sessionStorage.setItem('logged', childData);
    this.setState({logged: childData});
  }
  callbackFunctionUsername = (childUserName) => {
    sessionStorage.setItem('userName', childUserName);
    this.setState({userName: childUserName});
  }
  componentDidUpdate(){
    // console.log(this.state.logged);
  }

  render() {
    const { userName, logged } = this.state;
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('userName');
    return (
      <div className='App'>
        <div className='header'>
          <object className='logo' data={logo} type='image/svg+xml' alt='VS'></object>
          <a href='/home'>
            <h3>Password Generator</h3>
          </a>
        </div>

        <Router >
          <Route exact path='/' render={() => (<Redirect to='/home' />)} />
          <Switch>
            <Route path='/home'>
              {!token && !logged ? <Link to='/register' className='log-button'> <h4>Register new account</h4> </Link>:null }
              {token && !logged ? <Link to='/gen' className='log-button'> <h4> Generator</h4> </Link> : <Link to='/login' className='log-button'> <h4>Login to account</h4> </Link> }
            </Route>

            <Route path='/register'>
              <SignIn/>
            </Route>

            <Route path='/login'>
              <Login name={userName} parentCallback = {this.callbackFunction}  parentCallbackUsername = {this.callbackFunctionUsername} />
            </Route>

            <Route path='/gen'>
              <Generator parentCallback = {this.callbackFunction} name={name} image={logo} />
            </Route>

            <Route path='/*' component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
