const {encrypt} = require('../utils/encrypter');

const login = async (body, userModel, passwordModel) => {
  const { username, password } = body;
  const cryptedPassword = encrypt(password);
  const cryptedLogin = encrypt(username);
  const user = await userModel.findOne({ where: { username: cryptedLogin, password: cryptedPassword }, include: [ { model: passwordModel } ] });
  return user;
};

module.exports = {
  login
};
