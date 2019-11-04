// Error Handler
const ErrorHandler = (server) => {
  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
      res.status(401).send(err);
    }
    else {
      next(err);
    }
  });
};

module.exports = ErrorHandler;
