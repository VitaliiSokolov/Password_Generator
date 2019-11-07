// const UserModel = require('../db/db-users');
const PasswordList = require('../db/db-passwords');

const NewPassword = async (server) => {
  // CREATE NEW PASSWORD
  server.post('/gen', async (req, res) => {
    const { userId, title, value } = req.body;
    const newPassword = await PasswordList.create({ userId, title, value });
    console.log(newPassword);
    if(newPassword) {
      res.json({
        success: 'true',
        err: null,
        newPassword
      });
    } else {
      res.status(400).json({
        success: 'false',
        error: 'Creating error',
        newPassword: null
      });
    }
  });
};

module.exports = NewPassword;
