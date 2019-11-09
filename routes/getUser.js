const { passwordModel, UserModel } = require('../models/index');
const { getUser } = require('../services/findUser');
// const errorHandler = require('../services/errorHandler');

// GENERATOR'S VIEW ROUTE
const User = (server) => {
  server.get('/gen', async (req, res) => {
    const { username, key } = req.headers;
    const user = await getUser(username, UserModel, passwordModel);
    if( key === 'Govno'){
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
