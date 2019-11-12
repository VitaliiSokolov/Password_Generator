const passwordModel = require('./passwords');
const UserModel = require('./users');

passwordModel.belongsTo(UserModel);
UserModel.hasMany(passwordModel);

module.exports = {
  UserModel,
  passwordModel
};


