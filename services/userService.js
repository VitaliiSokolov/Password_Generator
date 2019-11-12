const { encrypt, decrypt } = require('../utils/encrypter');

const createUser = (body, userModel) => {
  const { username, password, email } = body;
  const encrUsername = encrypt(username);
  const encrEmail = encrypt(email);
  const encrPassword = encrypt(password);
  const newUser = userModel.create({ username: encrUsername, email: encrEmail, password: encrPassword, });
  return newUser;
};

const findUser = async (username, userModel, passwordModel) => {
  const encrUsername = encrypt(username);
  const user = await userModel.findOne({ where: { username: encrUsername }, include: [ { model: passwordModel } ] });

  const usernameDecr = decrypt(user.dataValues.username);

  const emailDecr = decrypt(user.dataValues.email);

  const passwordDecr = decrypt(user.dataValues.password);

  let itemsFormated = user.dataValues.items;
  itemsFormated = itemsFormated.map((item) => {
    item.dataValues.title = decrypt(item.dataValues.title);
    item.dataValues.value = decrypt(item.dataValues.value);
    return item.dataValues;
  });

  let decrUser = {
    id: user.dataValues.id,
    username: usernameDecr,
    email: emailDecr,
    password: passwordDecr,
    items: itemsFormated
  };

  return decrUser;
};

module.exports = {
  createUser, findUser
};
