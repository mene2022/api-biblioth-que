const CustomError = require('./customError');

class AuthenticationError extends CustomError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = AuthenticationError;
