const { passwordModel, UserModel } = require('../models/index');
const { login } = require('../services/databaseServices/login');

const Login = async (server) => {
  // LOGIN ROUTE
  server.post('/login', async (req, res) => {
    const user = await login(req.body, UserModel, passwordModel);
    if ( user ) {
      let token = 'Govno';
      res.json({
        user,
        token
      });
      console.log('Token sent');
      return;
    }
    else {
      console.log('Unauthorized');
      res.status(404).json({
        err: 'Username or password is incorrect'
      });
    }
  });
};

module.exports = Login;
