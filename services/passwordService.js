const { encrypt } = require('../utils/encrypter');
const { passwordModel } = require('../models/index');

const createPassword = (body) => {
  const { userId, title, value } = body;
  const encryptedValue = encrypt(value);
  const newPassword = passwordModel.create({ userId, title, value: encryptedValue });
  return newPassword;
};

const editPassword = (body) => {
  const { id, title, value } = body;
  const encryptedValue = encrypt(value);
  const editedPassword = passwordModel.update( { title, value:encryptedValue }, { where: { id } , returning:true} );
  return editedPassword;
};

const deletePassword = (body) => {
  const { Id, title, value } = body;
  const encryptedValue = encrypt(value);
  const editedPassword = passwordModel.update( { title, value:encryptedValue }, { where: { id: Id } } );
  return editedPassword;
};

module.exports = { createPassword, editPassword, deletePassword };
