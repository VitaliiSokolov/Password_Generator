const {encrypt} = require('../utils/encrypter');

const checkEmailLogin = (email, username, userModel)  => {
  const cryptedEmail = encrypt(email);
  const cryptedLogin = encrypt(username);
  let user = userModel.findOne({where: {email: cryptedEmail, username: cryptedLogin}});
  return user;
};

const login = async (body, userModel, passwordModel) => {
  const { username, password } = body;
  const cryptedPassword = encrypt(password);
  const cryptedLogin = encrypt(username);
  const user = await userModel.findOne({ where: { username: cryptedLogin, password: cryptedPassword }, include: [ { model: passwordModel } ] });
  return user;
};

module.exports = {
  checkEmailLogin, login
};
