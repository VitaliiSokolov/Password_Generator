const { encrypt, decrypt } = require('../utils/encrypter');

const findUser = async (username, userModel, passwordModel) => {

  const encrUsername = encrypt(username);
  const user = await userModel.findOne({ where: { username: encrUsername }, include: [ { model: passwordModel } ] });
  // console.log('CCC', user);

  const usernameDecr = decrypt(user.dataValues.username);
  // console.log('XXX', usernameDecr);

  const emailDecr = decrypt(user.dataValues.email);
  // console.log('XXX', emailDecr);

  const passwordDecr = decrypt(user.dataValues.password);
  // console.log('XXX', passwordDecr);

  let itemsFormated = user.dataValues.items;
  itemsFormated = itemsFormated.map((item) => {
    item.dataValues.title = decrypt(item.dataValues.title);
    item.dataValues.value = decrypt(item.dataValues.value);
    return item.dataValues;
  });
  // itemsFormated = itemsFormated.map((item) => {return item.dataValues.value = decrypt(item.dataValues.value);});

  console.log(itemsFormated);


  let decrUser = {
    id: user.dataValues.id,
    username: usernameDecr,
    email: emailDecr,
    password: passwordDecr,
    items: itemsFormated
  };
  console.log(decrUser);


  return decrUser;
};

module.exports = {
  findUser
};
