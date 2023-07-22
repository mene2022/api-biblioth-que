const Joi = require('joi');

const commentSchema = Joi.object({
  content: Joi.string().min(5).max(255),

}).min(1);

module.exports = commentSchema;
