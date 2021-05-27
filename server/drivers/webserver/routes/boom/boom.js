const config = require('../../../../config');

let boom = module.exports = {}

boom.boom = (req, res, next) => {
  try {
    throw new Error('Boom!')
  } catch (error) {
    //console.error('Whooops! This broke with error: ', error)
    res.status(500).send('Error!')
  }
}

