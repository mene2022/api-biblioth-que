const CustomError = require('../error/customError');

// eslint-disable-next-line consistent-return
module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
  }
  next(err);
};
