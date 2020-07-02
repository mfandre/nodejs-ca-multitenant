let farmsDb = require('../../../../data-access/farms-db')

let farms = module.exports = {}

farms.index = (req, res, next) => {
  farmsDb.listFarms()
    .then(data => {
      res.send(data)
    })
}

farms.show = (req, res, next) => {
  farmsDb.findFarm('farm_id', req.params.id)
    .then(data => {
      res.send(data)
    })
}

farms.create = (req, res, next) => {
  farmsDb.addFarm(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

farms.delete = (req, res, next) => {
  farmsDb.deleteFarm(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}