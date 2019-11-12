const { encrypt } = require('../utils/encrypter');

const createPassword = (body, userModel) => {
  const { userId, title, value } = body;
  const encrTitle = encrypt(title);
  const encrValue = encrypt(value);
  const newPassword =  userModel.create({ userId, title: encrTitle, value: encrValue });
  return newPassword;
};

module.exports = {
  createPassword
};
