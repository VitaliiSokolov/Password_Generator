import React from 'react';
import './App.css';
import logo from './vs.svg';
import Generator from './components/generator';
import SignIn from './components/sign-in';

function App() {
  return (
    <div className="App">
      <div className="header">
        <object className="logo" data={logo} type="image/svg+xml"></object>
        <h3> Password Generator </h3>
      </div>
      <SignIn />
      <Generator image={logo}/>
    </div>
  );
}

export default App;
