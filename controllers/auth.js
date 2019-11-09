const Login = require('../routes/login');
const Register = require('../routes/register');

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
