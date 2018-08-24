const sqls = require('../connect').do

const addRoomSubset = val => {
  let _sql = `insert into live_roomsubset (roomId,regfilter,chatfilter,roompwd,roomkeymsg,videolooktime,msgshield,msgrecording,msgreview,threeLogin,regreview,keywords,copyright) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  return sqls(_sql, val)
}
module.exports={
  addRoomSubset
}
