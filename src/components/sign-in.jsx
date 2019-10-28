import React from 'react';
import './sign-in.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return(
      <div className="sign-in">
        <h1> Hello {name} </h1>
      </div>
    );
  };
}

export default SignIn;
