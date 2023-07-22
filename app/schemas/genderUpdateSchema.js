const Joi = require('joi');

const genderSchemaUpdate = Joi.object({
  gender_name: Joi.string().min(1).max(100),
}).min(1);

module.exports = genderSchemaUpdate;
