import React from 'react';
import './generator.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
class Generator extends React.Component {
  constructor(props) {
    super(props);
    // fnx for generating password
    this.generate = this.generate.bind(this);
    // fnx for native react-copy-to-clipboard
    this.onCopy = this.onCopy.bind(this);
    // popup Ref
    this.popupRef = React.createRef();
    // State
    this.state = {
      result: '',
      copied: false,
    }
  };

  // React-Copy-to-Clipboard
  onCopy = () => {
    // Declaring ref
    let poppupElement = this.popupRef.current;
    // Toogle copy
    this.setState({... {copied: true} });
    // Displaying popup
    poppupElement.classList.add('active');
    const hidden = () => {
      poppupElement.classList.remove('active');
    }
    // Timeout for hidding popup
    setTimeout(hidden, 500);
    console.log('Password coppied');
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
    console.log('Created: ', password );
  };

  render() {
    return(
      <div className="generator">
        <div className="popup" ref={this.popupRef} >
          <h1>Coppied!</h1>
        </div>
        <div className="info">
          <object className="logo" data={this.props.image} type="image/svg+xml"></object>
          <p>New Password: <code className="result" ref={this.passwordRef}>{this.state.result}</code> </p>
        </div>
        <div className="buttons">
          <button className="gen" onClick={ () => { this.generate();} } >Generate password</button>
          <CopyToClipboard onCopy={this.onCopy} text={this.state.result} >
            <button className="copy" >Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <input className="check" type="text" placeholder="Check Your Result: " />
      </div>
    );
  }
}

export default Generator;
