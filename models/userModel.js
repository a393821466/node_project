const mongoose = require("mongoose");
const db = require("./db");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, require: true },
  age: { type: Number, require: true },
  phone: { type: String, require: true },
  createDate: { type: String }
})

let userModels = db.model('user', userSchema);

exports.userModels = userModels;