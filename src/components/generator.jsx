import React from 'react';
import './generator.css';

class Generator extends React.Component {
  constructor(props) {
    super();
    this.generate = this.generate.bind(this)
    this.copy = this.copy.bind(this)
    this.passwordRef = React.createRef();
    this.state = {
      lib: '',
      clipboard: '',
      result: ''
    }
  };

  // Imported simple function
  updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(function() {
    console.log('Password coppied: ', newClip);
    });
  };

  // Function which
  copy = () => {
    let coppied = this.passwordRef.current.innerText
    this.setState({ clipboard:coppied });
    this.updateClipboard(coppied);
  };

  // Function which generate password
  generate = () => {
    // All expected characters
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = [];
    // Generating password's length
    const length = Math.floor(Math.random() * (16 - 8) + 8);
    // Generating password's chars
    for (let i = 0; i < length; i++) {
      const genChar = Math.floor(Math.random() * 91);
      password.push(characters[genChar]);
    }
    // Array of chars to string
    password = password.join('');
    // Setting state with new password
    this.setState({ result: password, });
    console.log('Password created: ', password );
  };

  render() {
    return(
      <div className="generator">
        <div className="info">
          <object className="logo" data={this.props.image} type="image/svg+xml"></object>
          <p>New Password: <code className="result" ref={this.passwordRef}> {this.state.result} </code> </p>
        </div>
        <div className="buttons">
          <button className="gen" onClick={ () => { this.generate();} } >Generate password</button>
          <button className="copy" onClick={ () => { this.copy();} } >Copy to clipboard</button>
        </div>
        <input className="check" type="text" placeholder="Check Your Result: " />
      </div>
    );
  }
}

export default Generator;
