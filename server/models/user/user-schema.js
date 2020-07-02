let Joi = require('joi')

module.exports = Joi.object().keys({
  email: Joi.string().required().error(() => 'must have email as string'),
  name: Joi.string().required().error(() => 'must have name as string'),
  password: Joi.string().required().error(() => 'must have password as string'),
})
