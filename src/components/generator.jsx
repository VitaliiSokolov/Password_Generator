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
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeValue = this.handleOnChangeValue.bind(this);
    this.state = {
      name: 'User',
      title: '',
      value: '',
      result: '',
      min: 8,
      max: 16,
      passwords: [],
      storeList: [],
      copied: false,
      special: false,
      storage: false,
      reload: false,
      createPopup: false
    };
  }
  async componentDidMount(){
    const localToken = sessionStorage.getItem('token');
    if(!localToken && this.state.reload === true ){
      console.log('redirect to /home');
      this.props.history.push('/home');
    }
    await this.callBackendAPIGet();
  }
  callBackendAPIGet = async () => {
    const localToken = await sessionStorage.getItem('token');
    const username = await sessionStorage.getItem('userName');
    if(!localToken || this.state.reload === true ){
      this.props.history.push('/home');
    }
    await axios.get('/gen', {headers: {key: localToken, username: username}} )
      .then( (res) => {
        const user =  res.data.user;
        if(user){
          this.setState({storeList: user.items, name: user.username});
        }
        return;
      })
      .catch((err) => { console.log(err); });
  };
  callBackendAPIPost = async () => {
    const userId = sessionStorage.getItem('userId');
    await axios.post('/gen', { userId, title: this.state.title, value: this.state.value } )
      .then( (res) => {
        console.log(res);
        this.setState({createPopup: !this.state.createPopup});
        this.callBackendAPIGet();
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
  logout = async() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    this.setState({ reload: true });
    this.props.parentCallback(false);
    await this.callBackendAPIGet();
  }
  handleOnChangeMin = (e) => {
    const min = Number(e);
    if(min > 0){
      this.setState({min});
    } else {
      this.setState({min:8});
    }
  }
  handleOnChangeMax = (e) => {
    const max = Number(e);
    if(max < 38){
      this.setState({max});
    } else {
      this.setState({max:16});
    }
  }
  handleOnChangeSpecial = () => {
    this.setState({special: !this.state.special});
  }
  handleOnChangeTitle = (e) => {
    const title = e.toString();
    this.setState({title});
  }
  handleOnChangeValue = (e) => {
    const value = e.toString();
    this.setState({value});
  }

  render() {
    const { result, passwords, special, storage, storeList, name, createPopup } = this.state;
    return(
      <div className='generator'>
        <nav>
          <button className='myButtonSwitcher' onClick={ () => { this.setState({ ...this.state, storage: !storage, createPopup: false }); } } >{!storage? 'Storage' : 'Generator'}</button>
          {storage? <button className={!createPopup? 'createShowBtn' : 'createShowBtn cansel'} onClick={ () => { this.setState({createPopup: !createPopup}); } } >
            {!createPopup? 'Create' : 'Cancel'}   <i className='fa fa-plus-circle' aria-hidden='true'></i>
          </button> : null}
          <button className='copy logout myButtonLogout' onClick={ () => { this.logout(); } } >Logout</button>
        </nav>
        <div className='popup' ref={this.popupRef} >
          <h1>Coppied!</h1>
        </div>
        {storage?
          <div className='store'>
            <h1> Hello {name} </h1>
            {createPopup?
              <div className='createPopupWrapper'>
                {/* <div className="close">
                  <button className="closeBtn" onClick={ () => {this.setState({createPopup: !createPopup}); } } >X</button>
                </div> */}
                <div className='createPopup'>
                  <input className='titleInput' type='text' placeholder='Title' onChange={ (e)=> {this.handleOnChangeTitle(e.target.value);} } />
                  <input className='valueInput' type='text' placeholder='Value' onChange={ (e)=> {this.handleOnChangeValue(e.target.value);} } />
                  <button className='gen create myButtonGen' onClick={ () => { this.callBackendAPIPost(); } } >
                    Create   <i className='fa fa-plus-circle' aria-hidden='true'></i>
                  </button>
                </div>
              </div>
              : null}
            <ul className='storeList' >
              {storeList.map( (item, index) => {
                return <li className='profile' key={index}>
                  <h3>{item.title} :</h3>
                  <h5>{item.value}</h5>
                  <CopyToClipboard onCopy={this.onCopy} text={item.value} >
                    <button className='copy myButtonCopy listbutton' >
                      <i className='fa fa-clipboard' aria-hidden='true'></i>
                    </button>
                  </CopyToClipboard>
                </li>;
              } )}
            </ul>
          </div>
          :
          <div className='generate'>
            <div className='info'>
              <h1> Hello {name} </h1>
              <p className='text'> New Password: </p>
              <div className='min-max'>
                <input className='inputMinMax' type='text' defaultValue={8} onChange={ (e)=> {this.handleOnChangeMin(e.target.value);} } />
                <input className='inputMinMax' type='text' defaultValue={16} onChange={ (e)=> {this.handleOnChangeMax(e.target.value);} } />
                <input type='checkbox' id='radioButton' placeholder='##' onChange={ (e)=> {this.handleOnChangeSpecial();} } />
                <label htmlFor='radioButton'
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
                  <p className='passResult'>{pass.password}</p>
                  <CopyToClipboard onCopy={this.onCopy} text={pass.password} >
                    <button className='copy myButtonCopy listbutton' >
                      <i className='fa fa-clipboard' aria-hidden='true'></i>
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
