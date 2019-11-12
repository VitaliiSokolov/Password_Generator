const {encrypt} = require('../utils/encrypter');

const checkEmailLogin = (email, username, userModel)  => {
  let user = userModel.findOne({where: {email, username }});
  return user;
};

const login = async (body, userModel, passwordModel) => {
  const { username, password } = body;
  const cryptedPassword = encrypt(password);
  const user = await userModel.findOne({ where: { username, password: cryptedPassword }, include: [ { model: passwordModel } ] });
  return user;
};

module.exports = {
  checkEmailLogin, login
};
