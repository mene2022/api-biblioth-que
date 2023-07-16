const ValidationError = require('../error/validationError');

module.exports = (id) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(id)) {
    throw new ValidationError("l'id doit être un nombre valide");
  }
};
