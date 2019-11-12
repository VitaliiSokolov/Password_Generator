const { Register, Login } = require('../../routes/Auth');

const Auth = async (server) => {
  try {
    await Login(server);
    await Register(server);
  }
  catch(error){
    console.log(error);
  }
};

module.exports = Auth;
