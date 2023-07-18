const Joi = require('joi');

const raitingSchemeupdate = Joi.object({
  user_id: Joi.number().integer(),
  book_id: Joi.number().integer(),
  rating: Joi.number().integer().min(1).max(5),

});

module.exports = raitingSchemeupdate;
