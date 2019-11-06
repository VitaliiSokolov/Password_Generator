const UserModel = require('../db/database');

const NewPassword = async (server) => {
  // CREATE NEW PASSWORD
  // server.post('/gen', async (req, res) => {
  //   const { username, name, value } = req.body;
  //   // const userList = await UserModel.findOne({where: { username, name, value}});
  //   if ( req.body ) {
  //     res.json({
  //       sucess: true,
  //       passList: [],
  //       err: null,
  //       message: 'New password saved'
  //     });
  //     console.log('New Password created');
  //     return;
  //   }
  //   else {
  //     console.log('Type error');
  //     res.status(404).json({
  //       sucess: false,
  //       passList: null,
  //       err: 'Name or password is incorrect'
  //     });
  //   }
  // });
};

module.exports = NewPassword;
