// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const userSchema = Joi.object({
  user_name: Joi.string().alphanum().min(3).max(30)
    .required(),
  user_email: Joi.string().email().required(),
  user_password: Joi.string().min(6).required(),
  user_role: Joi.string().valid('admin', 'user').required(),
});

module.exports = userSchema;
