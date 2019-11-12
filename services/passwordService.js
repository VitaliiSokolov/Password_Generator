const { encrypt } = require('../utils/encrypter');

const createPassword = (body, userModel) => {
  const { userId, title, value } = body;
  const encryptedValue = encrypt(value);
  const newPassword =  userModel.create({ userId, title, value: encryptedValue });
  return newPassword;
};

module.exports = {
  createPassword
};
