const Joi = require('joi');

const loanCreateSchema = Joi.object({
  loan_date: Joi.date().required(),
  return_date: Joi.date().required().greater(Joi.ref('loan_date')),
  user_id: Joi.number().required(),
  book_id: Joi.number().required(),
  status: Joi.string().valid('borrowed').required(),
});

module.exports = loanCreateSchema;
