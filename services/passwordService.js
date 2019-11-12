const { encrypt } = require('../utils/encrypter');
const { passwordModel } = require('../models/index');

const createPassword = (body) => {
  const { userId, title, value } = body;
  const encryptedValue = encrypt(value);
  const newPassword = passwordModel.create({ userId, title, value: encryptedValue });
  return newPassword;
};

module.exports = { createPassword };
