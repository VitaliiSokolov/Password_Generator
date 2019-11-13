// Error Handler
const ErrorHandler = (server) => {
  server.use(function (err, req, res, next) {
    next(err);
  });
};

module.exports = ErrorHandler;
