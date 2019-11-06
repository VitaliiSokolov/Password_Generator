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
    this.callBackendAPIPost = this.callBackendAPIPost.bind(this);
    this.handleOnChangeMin = this.handleOnChangeMin.bind(this);
    this.handleOnChangeMax = this.handleOnChangeMax.bind(this);
    this.handleOnChangeSpecial = this.handleOnChangeSpecial.bind(this);
    this.state = {
      result: '',
      copied: false,
      name: 'User',
      reload: false,
      passwords: [],
      min: 8,
      max: 16,
      special: false,
      storage: true,
      storeList: [],
    };
  }
  async componentDidMount(){
    await this.callBackendAPIGet();
    this.setState({name: sessionStorage.getItem('userName')});
  }
  redirect = async () => {
    await this.props.history.push('/home');
  };
  callBackendAPIGet = async () => {
    const localToken = sessionStorage.getItem('token');
    // const localToken = this.props.token;
    await axios.get('/gen', {headers: {key: localToken}} )
      .then( (res) => {
        // console.log(res);
        this.setState({ name: this.props.name });
        // console.log('local',localToken);
        if(!localToken){
          console.log('redirect');
          this.props.history.push('/home');
        }
        return;
      })
      .catch((err) => { console.log(err); });
  };
  callBackendAPIPost = async () => {
    const localToken = sessionStorage.getItem('token');
    await axios.post('/gen', { headers: {key: localToken}, body: {username: this.state.name} } )
      .then( (res) => {
        console.log(res.data.message);
        this.setState({ storeList: [] });
        return;
      })
      .catch((err) => { console.log(err); });
  }
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
    // console.log('Password coppied');
  };
  // Generating password
  generate = async () => {
    const { min, max, special } = this.state;
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let extentendedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = [];
    // Generating password's length
    // const length = Math.floor(Math.random() * (16 - 8) + 8);
    const length = Math.random() * (max - min) + min;
    // Generating password's chars
    if(special){
      for (let i = 0; i < length; i++) {
        const genChar = Math.floor(Math.random() * 91);
        password.push(extentendedCharacters[genChar]);
      }
    } else {
      for (let i = 0; i < length; i++) {
        const genChar = Math.floor(Math.random() * 68);
        password.push(characters[genChar]);
      }
    }
    password = password.join('');
    await this.setState({result: password, passwords: [...this.state.passwords, {id: this.state.passwords + 1, password}] });
  };
  // Logout from account
  logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    this.setState({reload: true});
    this.props.parentCallback(false);
    this.callBackendAPIGet();
  }
  handleOnChangeMin = (e) => {
    const min = e.toString();
    this.setState({min});
  }
  handleOnChangeMax = (e) => {
    const max = e.toString();
    this.setState({max});
  }
  handleOnChangeSpecial = (e) => {
    this.setState({special: !this.state.special});
  }

  render() {
    let storeList = [
      { name: 'Google', value: '0', position: 0 },
      { name: 'Google', value: '1', position: 1 },
      { name: 'Google', value: '2', position: 2 },
      { name: 'Google', value: '3', position: 3 },
      { name: 'Google', value: '4', position: 4 },
    ];
    const { result, passwords, special, storage } = this.state;
    return(
      <div className='generator'>
        <nav>
          <button className='myButtonSwitcher' onClick={ () => { this.setState({ ...this.state, storage: !storage }); } } >{!storage? 'Storage' : 'Generator'}</button>
          <button className='copy logout myButtonLogout' onClick={ () => { this.logout(); } } >Logout</button>
        </nav>
        <div className='popup' ref={this.popupRef} >
          <h1>Coppied!</h1>
        </div>
        {storage?
          <div className='store'>
            <ul className='storeList' >
              <button className='gen create myButtonGen' onClick={ () => { this.callBackendAPIPost(); } } >
                Create   <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
              {storeList.map( (item) => {
                return <li className='profile' key={item.position}>
                  <h3>{item.name} :</h3>
                  <h5>{item.value}</h5>
                  <CopyToClipboard onCopy={this.onCopy} text={item.value} >
                    <button className='copy myButtonCopy listbutton' >
                      <i className="fa fa-clipboard" aria-hidden="true"></i>
                    </button>
                  </CopyToClipboard>
                </li>;
              } )}
            </ul>
          </div>
          :
          <div className='generate'>
            <div className='info'>
              <h1> Hello {this.props.name} </h1>
              <p className='text'> New Password: </p>
              <div className="min-max">
                <input className='inputMinMax' type="text" defaultValue={8} onChange={ (e)=> {this.handleOnChangeMin(e.target.value);} } />
                <input className='inputMinMax' type="text" defaultValue={16} onChange={ (e)=> {this.handleOnChangeMax(e.target.value);} } />
                <input type="checkbox" id="radioButton" placeholder='##' onChange={ (e)=> {this.handleOnChangeSpecial(e.target.value);} } />
                <label htmlFor="radioButton"
                  className='radioButtonLabel'
                  style={special? {'color':'#006600'}:{'color':'#ff0000'}}
                >Special</label>
              </div>
              <code className='result' ref={this.passwordRef}>{result}</code>
            </div>
            <div className='buttons'>
              <button className='gen myButtonGen' onClick={ () => { this.generate();} } >Generate password</button>
              <CopyToClipboard onCopy={this.onCopy} text={result} >
                <button className='copy myButtonCopy' > Copy to clipboard </button>
              </CopyToClipboard>
            </div>
            <ul className='passList'>
              { passwords.map( (pass) => {
                return <li key={pass.id} className='pass'>
                  <p>{pass.password}</p>
                  <CopyToClipboard onCopy={this.onCopy} text={pass.password} >
                    <button className='copy myButtonCopy listbutton' >
                      <i className="fa fa-clipboard" aria-hidden="true"></i>
                    </button>
                  </CopyToClipboard>
                </li>;
              } )}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Generator);
