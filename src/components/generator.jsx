import React from 'react';
import './generator.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.popupRef = React.createRef();
    this.state = {
      result: '',
      copied: false,
    }
  };
  // React-Copy-to-Clipboard
  onCopy = () => {
    let poppupElement = this.popupRef.current;
    this.setState({copied: true});
    poppupElement.classList.add('active');
    const hidden = () => {
      poppupElement.classList.remove('active');
    }
    // Hidding popup
    setTimeout(hidden, 500);
    console.log('Password coppied');
  };
  // Generating password
  generate = () => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = [];
    // Generating password's length
    const length = Math.floor(Math.random() * (16 - 8) + 8);
    // Generating password's chars
    for (let i = 0; i < length; i++) {
      const genChar = Math.floor(Math.random() * 91);
      password.push(characters[genChar]);
    }
    password = password.join('');
    this.setState({ result: password, });
    console.log('Created: ', password );
  };

  render() {
    const { result,  } = this.state;
    return(
      <div className="generator">
        <div className="popup" ref={this.popupRef} >
          <h1>Coppied!</h1>
        </div>
        <div className="info">
          {/* <object className="logo" data={this.props.image} type="image/svg+xml"></object> */}
          <p className="text">New Password: <code className="result" ref={this.passwordRef}>{result}</code> </p>
        </div>
        <div className="buttons">
          <button className="gen" onClick={ () => { this.generate();} } >Generate password</button>
          <CopyToClipboard onCopy={this.onCopy} text={result} >
            <button className="copy" >Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <input className="check" type="text" placeholder="Check Your Result: " />
      </div>
    );
  };
}

export default Generator;
