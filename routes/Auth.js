const { passwordModel, UserModel } = require('../models/index');
const { login, checkEmailLogin } = require('../services/authService');
const { createUser } = require('../services/userService');
const generateToken = require('../utils/token');

// REGISTRATION ROUTE
const Register = (server) => {
  server.post('/auth/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = await checkEmailLogin(username, email, UserModel);
    if(user === null) {
      if(username && password){
        await createUser(req.body, UserModel)
          .then(res=>{
            const user = {id: res.id, username: res.username, email: res.email, password: res.password};
            console.log(user);
          })
          .catch(err=>console.log(err));
        res.send({
          username,
          email,
          password,
        });
      } else {
        res.status(400).send({
          error: 'Registration Declined: Username and password are empty'
        });
      }
    } else {
      res.status(400).send({
        error: 'Registration Declined: User already exist'
      });
    }
  });
};

const Login = async (server) => {
  // LOGIN ROUTE
  server.post('/auth/login', async (req, res) => {
    const user = await login(req.body, UserModel, passwordModel);
    if ( user ) {
      let token = generateToken(user);
      res.send({
        user: user,
        token
      });
      console.log('Token sent');
      return;
    }
    else {
      console.log('Unauthorized');
      res.status(404).send({
        err: 'Username or password is incorrect'
      });
    }
  });
};

module.exports = {
  Register, Login
};
