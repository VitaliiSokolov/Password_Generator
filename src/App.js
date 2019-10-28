import React from 'react';
import './App.css';
import logo from './vs.svg';
import Generator from './components/generator';
import SignIn from './components/sign-in';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.callBackendAPI()
      .then( (res) => { this.setState({ data: res.express }); })
      .catch( (err) => console.log(err) );
  }

  callBackendAPI = async () => {
    let res = await axios.get('/xxx')
    .then( (response) => { return response.data } )
    .catch( (err) => console.log(err) );
    return res;
  };

  render() {
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
}

export default App;
