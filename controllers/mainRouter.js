const Auth = require('./auth');
const User = require('./user');
const Passwords = require('./passwords');

module.exports = (server) => {
  Auth(server);
  User(server);
  Passwords(server);
};
