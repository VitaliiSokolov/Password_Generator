const getuser = require('../routes/getUser');

const User = async (server) => {
  try {
    await getuser(server);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = User;
