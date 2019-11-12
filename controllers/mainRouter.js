const Auth = require('../routes/Auth');
const User = require('../routes/User');
const ErrorHandler = require('./errorHadler/errorHandler');

module.exports = (server) => {
  Auth(server);
  User(server);
  ErrorHandler(server);
};
