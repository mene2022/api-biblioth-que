// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const authorSchema = Joi.object({
  author_name: Joi.string(),
  author_nationality: Joi.string(),
  author_dob: Joi.date(),
}).min(1);

module.exports = authorSchema;
