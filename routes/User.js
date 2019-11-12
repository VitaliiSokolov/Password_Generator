const { passwordModel, UserModel } = require('../models/index');
const { findUser } = require('../services/userService');
const { createPassword } = require('../services/passwordService');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});

const userRouter = (server) => {
  // GENERATOR'S VIEW ROUTE
  server.get('/user', jwtMW, async (req, res, next) => {
    try{
      const { username, key } = req.headers;
      const user = await findUser(username, UserModel, passwordModel);
      res.send({
        user,
        key
      });
    } catch(e) {
      next(e);
    }
  });
  // CREATE NEW PASSWORD
  server.post('/user/add-pass', async (req, res, next) => {
    try {
      const newPassword = await createPassword(req.body, passwordModel);
      if(newPassword){
        res.send({
          newPassword
        });
      }
    } catch(e) {
      next(e);
    }
  });
};

module.exports = userRouter;