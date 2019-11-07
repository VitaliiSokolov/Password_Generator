const UserModel = require('../db/db-users');
const PasswordList = require('../db/db-passwords');

const Login = async (server) => {
  // LOGIN ROUTE
  server.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // const user = await UserModel.findOne({where: {username: username, password: password}});
    const user = await UserModel.findOne({ where: { username, password }, include: [ { model: PasswordList } ] });
    if ( user ) {
      let token = 'Govno';
      res.json({
        sucess: true,
        user,
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
        user: null,
        err: 'Username or password is incorrect',
        token: null
      });
    }
  });
};

module.exports = Login;