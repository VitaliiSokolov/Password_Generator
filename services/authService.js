const {encrypt} = require('../utils/encrypter');
const { UserModel, passwordModel } = require('../models');
const {Op} = require('sequelize');

const checkEmailLogin = async (username, email)  => {
  console.log(UserModel);
  const user = await UserModel.findOne({where:{
    [Op.or]: [ {username}, {email} ]
  }});
  return user;
};

const login = async (body) => {
  const { username, password } = body;
  const cryptedPassword = encrypt(password);
  const user = await UserModel.findOne({ where: { username, password: cryptedPassword }, include: [ { model: passwordModel } ] });
  return user;
};

module.exports = { checkEmailLogin, login };
