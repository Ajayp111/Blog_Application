const notFoundMiddleware = (req, res, next) => {
  const error = new Error(
    `The requested route '${req.originalUrl}' does not exist`
  );

  error.statusCode = 404;

  next(error);
};

module.exports = notFoundMiddleware;
