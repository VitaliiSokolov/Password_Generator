const { passwordModel, UserModel } = require('../models/index');
const { getUser } = require('../services/databaseServices/findUser');

// GENERATOR'S VIEW ROUTE
const User = (server) => {
  server.get('/gen', async (req, res) => {
    const { username, key } = req.headers;
    const user = await getUser(username, UserModel, passwordModel);
    if( key === 'Govno'){
      res.setHeader('Cache-Control', 'private');
      res.send({
        user
      });
    }
    else {
      res.send({
        message: 'Unauthorized'
      });
    }
  });
};

module.exports = User;
