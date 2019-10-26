import React from 'react';
import './App.css';
import logo from './vs.svg';
import Generator from './components/generator';

function App() {
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <Generator image={logo}/>
    </div>
  );
}

export default App;
