let config = require('../../config');
let mongoose = require('mongoose');

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;

// Set environment variables
let env = config.NODE_ENV;
let server = config.mongo.MONGO_SERVER;

if (env === 'production') {
  // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
  //const username = config.mongo.MONGO_USER
  //const password = config.mongo.MONGO_PW
  //mongoose.connect(`mongodb://${username}:${password}@ds161630.mlab.com:61630/passport`)´
  console.log("production")
  console.log("MONGO_SERVER", server)
  mongoose.connect(`mongodb://${server}:27017/gaivota-test`, {useNewUrlParser: true, useUnifiedTopology: true, autoReconnect :  true})
  .catch(err => {
    console.log(err);
  });
} else {
  console.log("development")
  mongoose.connect('mongodb://127.0.0.1:27017/gaivota-test', {useNewUrlParser: true, useUnifiedTopology: true, autoReconnect :  true});
}

// Signal connection
mongoose.connection.on('open', function () {
  console.log('Connection has been made');

  let UserSeed = require('./seeds/users_seeds');
  let FarmSeed = require('./seeds/farms_seeds');
  let FarmNdviSeed = require('./seeds/farms_ndvi_seeds');
  let FarmPrecipitationSeed = require('./seeds/farms_precipitation_seeds');
  if(ENV == 'production'){
    //just for start docker... in real production it should be removed
    console.log("User seed")
    UserSeed.cleanAndSeed();
    console.log("Farm seed")
    FarmSeed.cleanAndSeed();
    console.log("Farm NDVI seed")
    FarmNdviSeed.cleanAndSeed();
    console.log("Farm Precipitation seed")
    FarmPrecipitationSeed.cleanAndSeed();
  }else{
    console.log("User seed")
    UserSeed.cleanAndSeed();
    console.log("Farm seed")
    FarmSeed.cleanAndSeed();
    console.log("Farm NDVI seed")
    FarmNdviSeed.cleanAndSeed();
    console.log("Farm Precipitation seed")
    FarmPrecipitationSeed.cleanAndSeed();
  }

}).on('error', function (error) {
  console.log('Connect error', error);
}).on('disconnected', function () {
  console.log('Connection disconnected');
})

process.on('SIGINT', function(){
  mongoose.connection.close(function () {
    console.log('Mongoose default connection is disconnected through app termination');
    process.exit(0);
  });
}).on('SIGTERM', function(){
  mongoose.connection.close(function () {
    console.log('Mongoose default connection is disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose
