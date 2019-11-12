const { passwordModel, UserModel } = require('../models/index');
const { findUser } = require('../services/userService');
const { createPassword } = require('../services/passwordService');
const errorHandler = require('../controllers/errorHadler/errorHandler');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});
// GENERATOR'S VIEW ROUTE
const initUser = (server) => {
  try {
    server.get('/user', jwtMW, async (req, res) => {
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
// CREATE NEW PASSWORD
const NewPassword = async (server) => {
  server.post('/user/add-pass', async (req, res) => {
    const newPassword = await createPassword(req.body, passwordModel);
    if(newPassword) {
      res.send({
        newPassword
      });
    } else {
      res.status(400).send({
        error: 'Creating password error'
      });
    }
  });
};

module.exports = { initUser, NewPassword };
