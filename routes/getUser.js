const { passwordModel, UserModel } = require('../models/index');
const { findUser } = require('../services/findUser');
const { decrypt } = require('../utils/encrypter');

// const errorHandler = require('../services/errorHandler');

// GENERATOR'S VIEW ROUTE
const User = (server) => {
  server.get('/gen', async (req, res) => {
    const { username, key } = req.headers;
    // console.log('ZZZ', username);

    const user = await findUser(username, UserModel, passwordModel);
    // console.log('BBB', user);

    // const usernameDecr = await decrypt(user.dataValues.username);
    // const emailDecr = await decrypt(user.dataValues.email);
    // const passwordDecr = await decrypt(user.dataValues.password);
    // const usernameDecr = user.dataValues.username;
    // const emailDecr = user.dataValues.email;
    // const passwordDecr = user.dataValues.password;
    // let itemsForrmated = user.dataValues.items;
    // let decrUser = {
    //   id: user.dataValues.id,
    //   username: usernameDecr,
    //   email: emailDecr,
    //   password: passwordDecr,
    //   items: itemsForrmated
    // };
    if( key === 'Govno'){
      res.send({
        user
      });
    }
    else {
      res.send({
        message: 'Unauthorized'
      });
    }
  });
};

module.exports = User;
