const Auth = require('../routes/Auth');
const User = require('../routes/User');
const ErrorHandler = require('./errorHandler');

module.exports = (server) => {
  Auth(server);
  User(server);
  ErrorHandler(server);
};
