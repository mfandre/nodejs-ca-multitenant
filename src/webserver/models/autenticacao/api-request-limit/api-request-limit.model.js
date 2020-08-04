// let mongoose = require('./../../../../core/db/mongodb/mongo-connection-manager')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ApiRequestLimitSchema = new Schema({
  usuario: String,
  ip: String,
  tentativas: Number
});

const ApiRequestLimit = mongoose.model('ApiRequestLimit', ApiRequestLimitSchema);

module.exports = ApiRequestLimitSchema;