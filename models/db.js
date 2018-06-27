const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost/user";
const db = mongoose.createConnection(dbUrl);

db.once("open", () => {
  console.log("mongo启动成功");
})

module.exports = db;
