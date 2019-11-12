const { encrypt, decrypt } = require('../utils/encrypter');
const { UserModel, passwordModel } = require('../models/index');

const createUser = (body) => {
  const { username, password, email } = body;
  const encrPassword = encrypt(password);
  const newUser = UserModel.create({ username, email, password: encrPassword });
  return newUser;
};

const findUser = async (username) => {
  const user = await UserModel.findOne({ where: { username }, include: [ { model: passwordModel } ] });
  const passwordDecr = decrypt(user.dataValues.password);
  let passwordsFormated = user.dataValues.passwords;
  passwordsFormated = passwordsFormated.map((item) => {
    item.dataValues.value = decrypt(item.dataValues.value);
    return item.dataValues;
  });
  let decryptedUser = {
    id: user.dataValues.id,
    username: user.dataValues.username,
    email: user.dataValues.email,
    password: passwordDecr,
    passwords: passwordsFormated
  };
  return decryptedUser;
};

module.exports = {
  createUser, findUser
};
