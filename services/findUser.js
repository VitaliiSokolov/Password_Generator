const { encrypt, decrypt } = require('../utils/encrypter');

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
  findUser
};
