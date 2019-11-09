const { passwordModel, UserModel } = require('../models/index');
const { login } = require('../services/login');
// const errorHandler = require('../services/errorHandler');

const Login = async (server) => {
  // LOGIN ROUTE
  server.post('/login', async (req, res) => {
    const user = await login(req.body, UserModel, passwordModel);
    if ( user ) {
      let token = 'Govno';
      res.send({
        user,
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

module.exports = Login;
