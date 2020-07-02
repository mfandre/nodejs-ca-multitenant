let args = require('yargs-parser')(process.argv.slice(2))
let farmsDb = require('../../data-access/farms-db/index')

let printHelp = function () {
  console.log(`
    Help usage:
    --index  list farms
    --show   find farm by {ID}
    --help   print help
  `);
}

let valid = args.index || args.show

if (args.help || !valid) {
  printHelp()
  process.exit(1)
}

if (args.index) {
  farmsDb.listFarms().then(data => {
    console.log(data);
    process.exit(1)
  })
}

if (args.show) {
  farmsDb.findFarm('id', args.show).then(data => {
    console.log(data);
    process.exit(1)
  })
}
