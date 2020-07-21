let farmNdvisDb = require('../../../../data-access/farm-ndvis-db')

let farmNdvis = module.exports = {}

farmNdvis.index = (req, res, next) => {
  farmNdvisDb.listFarmNdvis()
    .then(data => {
      console.log(data)
      res.send(data)
    })
}

farmNdvis.show = (req, res, next) => {
  farmNdvisDb.findFarmNdvi('farm_ndvi_id', req.params.id)
    .then(data => {
      res.send(data)
    })
}

farmNdvis.create = (req, res, next) => {
  farmNdvisDb.addFarmNdvi(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

farmNdvis.delete = (req, res, next) => {
  farmNdvisDb.deleteFarmNdvi(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}