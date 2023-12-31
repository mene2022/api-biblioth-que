const CustomError = require('./customError');

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

module.exports = NotFoundError;
