const CustomError = require('./customError');

class DatabaseError extends CustomError {
  constructor(message) {
    super(500, message);
  }
}
module.exports = DatabaseError;
