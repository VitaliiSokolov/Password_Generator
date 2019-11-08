const UserModel = require('../models/users');
const PasswordList = require('../models/passwords');

const Gener = (server) => {
  // GENERATOR'S VIEW ROUTE
  server.get('/gen', async (req, res) => {
    const { username, key } = req.headers;
    const user = await UserModel.findOne({ where: { username }, include: [ { model: PasswordList } ] });
    if( key === 'Govno'){
      res.setHeader('Cache-Control', 'private');
      res.send({
        message: 'Tester',
        user
      }); //Sending some response when authenticated
    }
    else {
      res.send({
        message: 'Unauthorized',
        user: null
      }); //Sending some response when NOT authenticated
    }
  });
};

module.exports = Gener;
