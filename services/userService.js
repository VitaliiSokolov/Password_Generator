const { encrypt, decrypt } = require('../utils/encrypter');

const createUser = (body, userModel) => {
  const { username, password, email } = body;
  const encrPassword = encrypt(password);
  const newUser = userModel.create({ username, email, password: encrPassword, });
  return newUser;
};

const findUser = async (username, userModel, passwordModel) => {
  const user = await userModel.findOne({ where: { username }, include: [ { model: passwordModel } ] });
  const passwordDecr = decrypt(user.dataValues.password);

  let itemsFormated = user.dataValues.items;
  itemsFormated = itemsFormated.map((item) => {
    item.dataValues.value = decrypt(item.dataValues.value);
    return item.dataValues;
  });

  let decryptedUser = {
    id: user.dataValues.id,
    username: user.dataValues.username,
    email: user.dataValues.email,
    password: passwordDecr,
    items: itemsFormated
  };

  return decryptedUser;
};

module.exports = {
  createUser, findUser
};
