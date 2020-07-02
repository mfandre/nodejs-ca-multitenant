const mongoose = require('mongoose')
const csv = require('csvtojson')
let FarmNdvi = require('../models/farm-ndvi')

let seed = module.exports = {}

// Seeder using async await
seed.seedDatabase = async function () {
  const farmsNdviArray = await csv().fromFile(__dirname + '/data/farms_ndvi.csv');
  
  let arr = [];

  for(let i = 0; i < farmsNdviArray.length; i++){
    //date,ndvi_221,ndvi_231,ndvi_271
    arr.push({farm_ndvi_id: i*3+1,farm_id: 221, date: farmsNdviArray[i].date, ndvi: parseFloat(farmsNdviArray[i].ndvi_221.replace(',','.'))});
    arr.push({farm_ndvi_id: i*3+2,farm_id: 231, date: farmsNdviArray[i].date, ndvi: parseFloat(farmsNdviArray[i].ndvi_231.replace(',','.'))});
    arr.push({farm_ndvi_id: i*3+3,farm_id: 271, date: farmsNdviArray[i].date, ndvi: parseFloat(farmsNdviArray[i].ndvi_271.replace(',','.'))});
  }

  await FarmNdvi.insertMany(arr);
};

seed.cleanAndSeed = function(){
  // Drop DB then seed
  var that = this;
  mongoose.connection.collections.farmndvis.drop(async function () {
    that.seedDatabase().then(() => {
      //mongoose.connection.close()
    }).catch(() => {
      //mongoose.connection.close()
    })
  });
}

module.exports = seed