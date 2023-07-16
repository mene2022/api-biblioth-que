const Joi = require('joi');

const genderSchema = Joi.object({
  gender_name: Joi.string().min(1).max(100).required(),
});

module.exports = genderSchema;
