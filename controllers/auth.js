const Login = require('../services/login');
const Register = require('../services/register');

const Auth = async (server) => {
  try {
    await Login(server);
    await Register(server);
  } catch(error){
    console.log(error);
  }
};

module.exports = Auth;
