const { passwordModel, UserModel } = require('../models/index');
const { findUser } = require('../services/findUser');
const { decrypt } = require('../utils/encrypter');

// const errorHandler = require('../services/errorHandler');

// GENERATOR'S VIEW ROUTE
const User = (server) => {
  server.get('/gen', async (req, res) => {
    const { username, key } = req.headers;
    const user = await findUser(username, UserModel, passwordModel);
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
