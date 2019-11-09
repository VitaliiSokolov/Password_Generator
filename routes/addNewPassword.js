// const UserModel = require('../db/users');
const { passwordModel}  = require('../models/index');
const { createPassword } = require('../services/createPassword');
// const errorHandler = require('../services/errorHandler');

// CREATE NEW PASSWORD
const NewPassword = async (server) => {
  server.post('/gen', async (req, res) => {
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

module.exports = NewPassword;
