import React from 'react';
import './generator.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const axios = require('axios');
class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.popupRef = React.createRef();
    this.callBackendAPIGet = this.callBackendAPIGet.bind(this);
    this.state = {
      result: '',
      copied: false,
      name: 'User'
    };
  }

  componentDidMount() {
    this.callBackendAPIGet();
  }

  callBackendAPIGet = async () => {
    const {token} = this.props;
    await axios.get('/gen', {headers: {key: token}} )
      .then( (res) => {
        console.log(res);
        let data = res.data.message;
        console.log('new data', data);
        this.setState({ name: data });
        return;
      })
      .catch((err) => { console.log(err); });
  };

  // React-Copy-to-Clipboard
  onCopy = () => {
    let poppupElement = this.popupRef.current;
    this.setState({copied: true});
    poppupElement.classList.add('active');
    const hidden = () => {
      poppupElement.classList.remove('active');
    };
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
    const { name } = this.state;
    return(
      <div className='generator'>
        <div className='popup' ref={this.popupRef} >
          <h1>Coppied!</h1>
        </div>
        <div className='info'>
          <h1> Hello {name} </h1>
          <p className='text'>New Password: <code className='result' ref={this.passwordRef}>{result}</code> </p>
        </div>
        <div className='buttons'>
          <button className='gen' onClick={ () => { this.generate();} } >Generate password</button>
          <CopyToClipboard onCopy={this.onCopy} text={result} >
            <button className='copy' >Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <input className='check' type='text' placeholder='Check Your Result: ' />
      </div>
    );
  }
}

export default Generator;
