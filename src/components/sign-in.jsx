import React from 'react';
import './sign-in.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="sign-in">
        <h1>Hello User!</h1>
      </div>
    );
  };
}

export default SignIn;