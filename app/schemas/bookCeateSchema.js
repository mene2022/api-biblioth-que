const Joi = require('joi');

const bookSchema = Joi.object({
  book_summary: Joi.string().min(5).max(300).required(),
  title: Joi.string().min(5).max(255).required(),
  publication_year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  author_id: Joi.number().integer().required(),

});

module.exports = bookSchema;
