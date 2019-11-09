const createPassword = (body, userModel) => {
  const { userId, title, value } = body;
  const newPassword =  userModel.create({ userId, title, value });
  return newPassword;
};

module.exports = {
  createPassword
};
