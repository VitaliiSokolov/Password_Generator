// const UserModel = require('../db/users');
const { passwordModel}  = require('../models/index');
const { createPassword } = require('../services/databaseServices/createPassword');

// CREATE NEW PASSWORD
const NewPassword = async (server) => {
  server.post('/gen', async (req, res) => {
    const newPassword = await createPassword(req.body, passwordModel);
    if(newPassword) {
      res.json({
        newPassword
      });
    } else {
      res.status(400).json({
        error: 'Creating password error'
      });
    }
  });
};

module.exports = NewPassword;
