const getUser = (username, userModel, passwordModel) => {
  const user = userModel.findOne({ where: { username }, include: [ { model: passwordModel } ] });
  return user;
};

module.exports = {
  getUser
};
