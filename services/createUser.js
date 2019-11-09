const createUser = (body, userModel) => {
  const { username, password, email } = body;
  const newUser = userModel.create({ username: username, email: email, password: password, });
  return newUser;
};

module.exports = {
  createUser
};