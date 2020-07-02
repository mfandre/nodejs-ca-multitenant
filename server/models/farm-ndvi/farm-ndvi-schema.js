let Joi = require('joi')

module.exports = Joi.object().keys({
  farm_ndvi_id: Joi.number().required().error(() => 'must have farm_ndvi_id as number'),
  farm_id: Joi.number().required().error(() => 'must have farm_id as number'),
  date: Joi.date().required().error(() => 'must have date as date e.g. 2017-01-01'),
  ndvi: Joi.number().required().error(() => 'must have ndvi as number'),
})
