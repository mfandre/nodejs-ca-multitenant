let farmPrecipitationsDb = require('../../../../data-access/farm-precipitation-db')

let farmPrecipitations = module.exports = {}

farmPrecipitations.index = (req, res, next) => {
  farmPrecipitationsDb.listFarmPrecipitations()
    .then(data => {
      console.log(data)
      res.send(data)
    })
}

farmPrecipitations.show = (req, res, next) => {
  farmPrecipitationsDb.findFarmPrecipitation('farm_precipitation_id', req.params.id)
    .then(data => {
      res.send(data)
    })
}

farmPrecipitations.create = (req, res, next) => {
  farmPrecipitationsDb.addFarmPrecipitation(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

farmPrecipitations.delete = (req, res, next) => {
  farmPrecipitationsDb.deleteFarmPrecipitation(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}