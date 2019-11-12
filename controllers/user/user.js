const { initUser } = require('../../routes/User');

const User = async (server) => {
  try {
    await initUser(server);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = User;
