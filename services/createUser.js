const {encrypt} = require('../utils/encrypter');

const createUser = (body, userModel) => {
  const { username, password, email } = body;
  const encrUsername = encrypt(username);
  const encrEmail = encrypt(email);
  const encrPassword = encrypt(password);
  const newUser = userModel.create({ username: encrUsername, email: encrEmail, password: encrPassword, });
  return newUser;
};

module.exports = {
  createUser
};
