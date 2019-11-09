const addNewPassword = require('../routes/addNewPassword');

const Passwords = async (server) => {
  try{
    addNewPassword(server);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = Passwords;
