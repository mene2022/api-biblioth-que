const Joi = require('joi');

const loanUpdateSchema = Joi.object({
  loan_date: Joi.date(),
  return_date: Joi.date().required().greater(Joi.ref('loan_date')),
  status: Joi.string().valid('borrowed', 'returned'),
}).min(1); // Au moins un des champs doit être fourni

module.exports = loanUpdateSchema;
