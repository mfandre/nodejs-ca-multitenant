const mongoose = require('mongoose')
const csv = require('csvtojson')
let Farm = require('../models/farm')

let seed = module.exports = {}

// Seeder using async await
seed.seedDatabase = async function () {
  const farmsArray = await csv().fromFile(__dirname + '/data/farms.csv');
  
  for(let i = 0; i < farmsArray.length; i++){
    await Farm.create(farmsArray[i])
  }
};

seed.cleanAndSeed = function(){
  // Drop DB then seed
  var that = this;
  mongoose.connection.collections.farms.drop(async function () {
    that.seedDatabase().then(() => {
      //mongoose.connection.close()
    }).catch(() => {
      //mongoose.connection.close()
    })
  });
}

module.exports = seed