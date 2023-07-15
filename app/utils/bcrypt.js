const bcrypt = require('bcrypt');

module.exports = {

  async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  },
  async comparePassword(password, passwordHash) {
    const result = await bcrypt.compare(password, passwordHash);
    return result;
  },

};
