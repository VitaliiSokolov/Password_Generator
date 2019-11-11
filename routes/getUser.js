const { passwordModel, UserModel } = require('../models/index');
const { findUser } = require('../services/findUser');
const errorHandler = require('../services/errorHandler');
const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});

// GENERATOR'S VIEW ROUTE
const User = (server) => {
  try {
    server.get('/gen', jwtMW, async (req, res) => {
      const { username, key } = req.headers;
      const user = await findUser(username, UserModel, passwordModel);

      res.send({
        user,
        key
      });
    });
  } catch(e) {
    errorHandler(server);
  }
};

module.exports = User;
