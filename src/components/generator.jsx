import React from 'react';
import './generator.css';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const axios = require('axios');
class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.logout = this.logout.bind(this);
    this.popupRef = React.createRef();
    this.callBackendAPIGet = this.callBackendAPIGet.bind(this);
    this.state = {
      result: '',
      copied: false,
      name: 'User',
      reload: false
    };
  }

  componentDidMount(){
    this.callBackendAPIGet();
  }
  componentDidUpdate(){
    if(this.state.reload){
      console.log('Logout');
      this.props.history.push('/');
    }
  }

  callBackendAPIGet = async () => {
    const localToken = localStorage.getItem('token');
    await axios.get('/gen', {headers: {key: localToken}} )
      .then( (res) => {
        console.log(res);
        this.setState({ name: this.props.name });
        console.log('local',localToken);
        if(localToken !== 'Govno'){
          console.log('redirect');
          this.props.history.push('/home');
        }
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
  // Logout from account
  logout = () => {
    localStorage.removeItem('token');
    this.setState({reload: true});
    this.props.parentCallback(false);
  }

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
        <button className='copy' onClick={ () => { this.logout(); } } >Logout</button>
      </div>
    );
  }
}

export default withRouter(Generator);
