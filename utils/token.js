const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 1000 });
  return token;
};

module.exports = generateToken;