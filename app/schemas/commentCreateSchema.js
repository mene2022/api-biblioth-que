const Joi = require('joi');

const commentSchema = Joi.object({
  content: Joi.string().min(5).max(255).required(),
  book_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

module.exports = commentSchema;
