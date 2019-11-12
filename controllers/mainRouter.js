const Auth = require('./auth/auth');
const User = require('./user/user');
const Passwords = require('./passwords/passwords');
const ErrorHandler = require('./errorHadler/errorHandler');

module.exports = (server) => {
  Auth(server);
  User(server);
  Passwords(server);
  ErrorHandler(server);
};
