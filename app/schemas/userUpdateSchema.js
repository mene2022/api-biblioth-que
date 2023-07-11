// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const userUpdate = Joi.object({
  user_name: Joi.string().alphanum().min(3).max(30),
  user_email: Joi.string().email(),
  user_password: Joi.string().min(6),
  user_role: Joi.string().valid('admin', 'user').allow(null, ''),
});

module.exports = userUpdate;