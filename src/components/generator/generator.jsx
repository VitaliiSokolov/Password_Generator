import React from 'react';
import './generator.scss';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const axios = require('axios');
const generating = require('../../utils/generate');
const createPassValidation = require('../../utils/createPassValidation');

class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.edit = this.edit.bind(this);
    this.logout = this.logout.bind(this);
    this.popupRef = React.createRef();
    this.callBackendAPIGet = this.callBackendAPIGet.bind(this);
    this.callBackendAPIPost = this.callBackendAPIPost.bind(this);
    // this.callBackendAPIPut = this.callBackendAPIPut.bind(this);
    // УБРАТЬ ЛИШНИЕ БАЙНДЫ
    this.handleOnChangeMin = this.handleOnChangeMin.bind(this);
    this.handleOnChangeMax = this.handleOnChangeMax.bind(this);
    this.handleOnChangeSpecial = this.handleOnChangeSpecial.bind(this);
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeValue = this.handleOnChangeValue.bind(this);
    this.createPass = this.createPass.bind(this);
    this.state = {
      name: 'User',
      title: '',
      value: '',
      result: '',
      min_max_err: '',
      createPopupMessage: '',
      id: -1,
      min: 0,
      max: 0,
      passwords: [],
      storeList: [],
      buttonMethodPost: false,
      copied: false,
      special: false,
      storage: true,
      reload: false,
      createPopup: false,
    };
  }
  async componentDidMount(){
    const localToken = await sessionStorage.getItem('token');
    if(!localToken && this.state.reload === true ){
      console.log('redirect to /home');
      this.props.history.push('/home');
    }
    await this.callBackendAPIGet();
  }
  // GetUser
  callBackendAPIGet = async () => {
    let localToken = await sessionStorage.getItem('token');
    localToken = 'Bearer ' + localToken;
    const username = await sessionStorage.getItem('userName');
    if(!localToken){
      this.props.history.push('/home');
    }
    await axios.get('/user', { headers: { Authorization: localToken, username }} )
      .then( async (res) => {
        const user = res.data.user;
        if(user){
          this.setState({ storeList: user.passwords, name: user.username });
        }
        return;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
  // Record new password
  callBackendAPIPost = async () => {
    const userId = sessionStorage.getItem('userId');
    const { title, value, createPopup } = this.state;
    const responseArray = await createPassValidation(title, value);
    this.setState({ createPopupMessage: responseArray[0] });
    if(responseArray[0].length < 1) {
      await axios.post('/user/password/:id', { userId, title, value } )
        .then( (res) => {
          const newPassword = res.data.newPassword;
          console.log('Created', newPassword);
          this.setState({ createPopup: !createPopup });
          this.callBackendAPIGet();
          return;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  }
  // Edit password
  callBackendAPIPut = async () => {
    const { title, value, createPopup, id } = this.state;
    const responseArray = await createPassValidation(title, value);
    this.setState({ createPopupMessage: responseArray[0] });
    if(responseArray[0].length < 1) {
      await axios.put(`/user/password/:${id}`, { id, title, value } )
        .then( (res) => {
          const newPassword = res.data.newPassword;
          console.log('Edited', newPassword);
          this.setState({ createPopup: !createPopup });
          this.callBackendAPIGet();
          return;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  }
  // React-Copy-to-Clipboard
  onCopy = () => {
    let poppupElement = this.popupRef.current;
    this.setState({copied: true});
    poppupElement.classList.add('active');
    const hidden = () => {
      poppupElement.classList.remove('active');
    };
    setTimeout(hidden, 500);
  };
  // Edit password
  edit = (id) => {
    this.setState({createPopup: true, buttonMethodPost:false, id});
  }
  // Generating password
  generate = async () => {
    const { min, max, special } = this.state;
    const password = await generating( min, max, special );
    if(password[1].length > 1) {
      await this.setState({
        result: password[1],
        min_max_err: password[0],
        passwords: [...this.state.passwords,
          {id: this.state.passwords + 1,
            password: password[1]
          }]
      });
    } else {
      await this.setState({
        min_max_err: password[0],
      });
    }
  };
  // Create password
  // ????????? first time works good, then repeats the same result ????????
  createPass = async () => {
    const val = await this.state.value.replace(/\s/g, '');
    if(val === ''){
      const { min, max, special } = this.state;
      const password = generating(min, max, special);
      this.setState({ value: password });
    }
    this.callBackendAPIPost();
  }
  // Logout from account
  logout = async() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    this.setState({ reload: true });
    this.props.parentCallback(false);
    // switched this
    this.props.history.push('/home');
    // switched
    // this.callBackendAPIGet();
  }
  // setState inputs onChange
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
    const { result, passwords, special, storage, storeList, name, createPopup, min_max_err, createPopupMessage, buttonMethodPost } = this.state;
    return(
      <div className='generator'>
        <nav>
          <button className='myButtonSwitcher' onClick={ () => { this.setState({ ...this.state, storage: !storage, createPopup: false }); } } >{!storage? 'Storage' : 'Generator'}</button>
          {storage? <button className={!createPopup? 'createShowBtn' : 'createShowBtn cansel'} onClick={ () => { this.setState({createPopup: !createPopup, createPopupMessage: '', buttonMethodPost: true }); } } >
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
                <div className='createPopup'>
                  <input className='titleInput' type='text' placeholder='Title' onChange={ (e)=> {this.handleOnChangeTitle(e.target.value);} } />
                  <input className='valueInput' type='text' placeholder='Value' onChange={ (e)=> {this.handleOnChangeValue(e.target.value);} } />
                  <p className='createPopupMessage'>{createPopupMessage}</p>
                  <button className='create myButtonGen' onClick={ () => {buttonMethodPost? this.callBackendAPIPost() : this.callBackendAPIPut(); } } >
                    Create   <i className='fa fa-plus-circle' aria-hidden='true'></i>
                  </button>
                </div>
              </div>
              : null}
            <ul className='storeList' >
              {storeList.map( (item) => {
                const { id, title, value } = item;
                return (<li className='profile' key={id}>
                  <h3>{title} :</h3>
                  <h5>{value}</h5>
                  <CopyToClipboard onCopy={this.onCopy} text={value} >
                    <button className='copy myButtonCopy listbutton' >
                      <i className='fa fa-clipboard' aria-hidden='true'></i>
                    </button>
                  </CopyToClipboard>
                  <button className='copy myButtonCopy listbutton' onClick={ () => { this.edit(id); } } >
                    <i className="fa fa-pencil-square" aria-hidden="true"></i>
                  </button>
                  <button className='copy myButtonCopy listbutton' onClick={ () => {  } } >
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </li>
                );
              })}
            </ul>
          </div>
          :
          <div className='generate'>
            <div className='info'>
              <h1> Hello {name} </h1>
              <p className='text'> New Password: </p>
              <div className='min-max'>
                <input className='inputMinMax' type='text'  onChange={ (e)=> {this.handleOnChangeMin(e.target.value);} } />
                <input className='inputMinMax' type='text'  onChange={ (e)=> {this.handleOnChangeMax(e.target.value);} } />
                <input type='checkbox' id='radioButton' placeholder='##' onChange={ (e)=> {this.handleOnChangeSpecial(e);} } />
                <label htmlFor='radioButton'
                  className='radioButtonLabel'
                  style={special? {'color':'#006600'}:{'color':'#ff0000'}}
                >Special</label>
                <p className='min_max_err' > {min_max_err} </p>
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
                return (<li key={pass.id} className='pass'>
                  <p className='passResult'>{pass.password}</p>
                  <CopyToClipboard onCopy={this.onCopy} text={pass.password} >
                    <button className='copy myButtonCopy listbutton' >
                      <i className='fa fa-clipboard' aria-hidden='true'></i>
                    </button>
                  </CopyToClipboard>
                </li>
                );
              })}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Generator);
