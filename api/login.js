const UserModel = require('../db/database');

const Login = async (server) => {
  // LOGIN ROUTE
  server.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({where: {username: username, password: password}});
    if ( user ) {
      let token = 'Govno';
      res.json({
        sucess: true,
        err: null,
        token,
      });
      console.log('Token sent');
      return;
    }
    else {
      console.log('Unauthorized');
      res.status(404).json({
        sucess: false,
        token: null,
        err: 'Username or password is incorrect'
      });
    }
  });
};

module.exports = Login;