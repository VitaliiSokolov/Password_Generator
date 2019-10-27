import React from 'react';
import './App.css';
import logo from './vs.svg';
import Generator from './components/generator';
import SignIn from './components/sign-in';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then( (res) => {
        // console.log(res);
        // this.setState({ data: res.express });
      })
      .catch(err => console.log(err));
      // console.log(this.state);
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/');
    console.log(response);

    const body = await response.body;
    console.log(body);

    // if (response.status !== 200) {
    //   throw Error(body.message)
    // }
    return body;
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
