const Joi = require('joi');

const bookSchemaUpdate = Joi.object({
  book_summary: Joi.string().min(5),
  title: Joi.string().min(5),
  publication_year: Joi.number().integer().min(1900).max(new Date().getFullYear()),

}).min(1);

module.exports = bookSchemaUpdate;
