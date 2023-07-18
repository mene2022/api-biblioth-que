const Joi = require('joi');

const bookGender = Joi.object({
  book_id: Joi.number().integer().min(1).required(),
  gender_id: Joi.number().integer().min(1).required(),
});

module.exports = bookGender;
