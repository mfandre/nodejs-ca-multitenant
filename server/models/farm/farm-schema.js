let Joi = require('joi')

module.exports = Joi.object().keys({
  farm_id: Joi.number().required().error(() => 'must have farm_id as number'),
  name: Joi.string().required().error(() => 'must have name as string'),
  latitude: Joi.number().required().error(() => 'must have latitude as number'),
  longitude: Joi.number().required().error(() => 'must have longitude as number'),
  culture: Joi.string().required().error(() => 'must have culture as string'),
  variety: Joi.string().required().error(() => 'must have variety as string'),
  total_area: Joi.number().required().error(() => 'must have total area as number'),
  yield_estimation: Joi.number().required().error(() => 'must have yield estimation as number'),
  price: Joi.number().required().error(() => 'must have price as number')

})
