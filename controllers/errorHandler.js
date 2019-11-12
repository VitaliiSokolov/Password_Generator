// Error Handler
const ErrorHandler = (server) => {
  server.use(function (err, req, res, next) {
    // if (err.name === 'UnauthorizedError') {
    //   res.status(401).send(err);
    // }
    // else {
    //   next(err);
    // }
    next(err);
  });
};

module.exports = ErrorHandler;
