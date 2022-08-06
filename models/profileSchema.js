const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true},
  serverID: { type: String, require: true},
  wallet: { type: Number, default: 1000},
  bank: { type: Number},
  gpu: {type: String, default: 'GT 650'}
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;