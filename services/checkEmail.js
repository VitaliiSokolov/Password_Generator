
const checkEmail = (body, userModel)  => {
  const { email } = body;
  let user = userModel.findOne({where: {email}});
  return user;
};

module.exports = {
  checkEmail,
};
