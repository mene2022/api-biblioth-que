const CustomError = require('./customError');

class ResourceConflictError extends CustomError {
  constructor(message) {
    super(409, message);
  }
}

module.exports = ResourceConflictError;
