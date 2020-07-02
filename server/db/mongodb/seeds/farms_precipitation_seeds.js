const mongoose = require('mongoose')
const csv = require('csvtojson')
let FarmPrecipitation = require('../models/farm-precipitation')

let seed = module.exports = {}

// Seeder using async await
seed.seedDatabase = async function () {
  const farmsPrecipitationArray = await csv().fromFile(__dirname + '/data/farms_precipitation.csv');
  
  let arr = [];

  for(let i = 0; i < farmsPrecipitationArray.length; i++){
    arr.push({farm_precipitation_id: i*3+1,farm_id: 221, date: farmsPrecipitationArray[i].date, precipitation: farmsPrecipitationArray[i].precipitation_221});
    arr.push({farm_precipitation_id: i*3+2,farm_id: 231, date: farmsPrecipitationArray[i].date, precipitation: farmsPrecipitationArray[i].precipitation_231});
    arr.push({farm_precipitation_id: i*3+3,farm_id: 271, date: farmsPrecipitationArray[i].date, precipitation: farmsPrecipitationArray[i].precipitation_271});
  }

  await FarmPrecipitation.insertMany(arr);
};

seed.cleanAndSeed = function(){
  // Drop DB then seed
  var that = this;
  mongoose.connection.collections.farmprecipitations.drop(async function () {
    that.seedDatabase().then(() => {
      //mongoose.connection.close()
    }).catch(() => {
      //mongoose.connection.close()
    })
  });
}

module.exports = seed