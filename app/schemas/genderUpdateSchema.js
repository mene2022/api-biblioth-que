const Joi = require('joi');

const genderSchemaUpdate = Joi.object({
  gender_name: Joi.string().min(1).max(100),
});

module.exports = genderSchemaUpdate;
