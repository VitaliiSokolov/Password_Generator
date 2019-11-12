const { NewPassword } = require('../../routes/User');

const Passwords = async (server) => {
  try{
    NewPassword(server);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = Passwords;
