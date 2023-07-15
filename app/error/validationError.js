const CustomError = require('./customError');

class ValidationError extends CustomError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = ValidationError;
