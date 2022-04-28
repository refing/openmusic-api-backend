const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().max(28).required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});
module.exports = {UserPayloadSchema};
