const Joi = require('joi');

const userLogin = Joi.object({
  user_email: Joi.string().email().required(),
  user_password: Joi.string().required(),
});

module.exports = userLogin;
