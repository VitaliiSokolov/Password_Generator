
const login = (body, userModel, passwordModel) => {
  const { username, password } = body;
  const user = userModel.findOne({ where: { username, password }, include: [ { model: passwordModel } ] });
  return user;
};

module.exports = {
  login
};
