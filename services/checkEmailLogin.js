const {encrypt} = require('../utils/encrypter');

const checkEmailLogin = (email, username, userModel)  => {
  const cryptedEmail = encrypt(email);
  const cryptedLogin = encrypt(username);
  let user = userModel.findOne({where: {email: cryptedEmail, username: cryptedLogin}});
  console.log(user, 'SSSSSSSSSSSSSSSSSSSSSSSS');

  return user;
};

module.exports = {
  checkEmailLogin
};
