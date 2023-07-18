const Joi = require('joi');

const raitingScheme = Joi.object({
  user_id: Joi.number().integer().required(),
  book_id: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5)
    .required(),

});

module.exports = raitingScheme;
