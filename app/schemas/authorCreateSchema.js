// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const authorSchema = Joi.object({
  author_name: Joi.string().required(),
  author_nationality: Joi.string().required(),
  author_dob: Joi.date().required(),
});

module.exports = authorSchema;
