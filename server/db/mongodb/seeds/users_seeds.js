let mongoose = require('mongoose')
let User = require('../models/user')

let seed = module.exports = {}

// Seeder using async await
seed.seedDatabase = async function () {
  let admin = {
    name: "Admin",
    email: "admin@gaivota.ai",
    password: "admin"
  }

  let andre = {
    name: "André",
    email: "fandre@gmail.com",
    password: "123"
  }

  let boss = {
    name: "The boss",
    email: "admin",
    password: "admin"
  }

  await User.insertMany([admin, andre, boss])
};

seed.cleanAndSeed = function(){
  // Drop DB then seed
  var that = this;
  mongoose.connection.collections.users.drop(async function () {
    that.seedDatabase().then(() => {
      //mongoose.connection.close()
    }).catch(() => {
      //mongoose.connection.close()
    })
  });
}

module.exports = seed