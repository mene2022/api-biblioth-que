const ValidationError = require('../error/validationError');
// eslint-disable-next-line consistent-return
const validator = (schema) => async (req, res, next) => {
  try {
    const data = req.body;

    await schema.validateAsync(data);
    next();
  } catch (error) {
    next(new ValidationError(error.details[0].message));
  }
};

module.exports = validator;
