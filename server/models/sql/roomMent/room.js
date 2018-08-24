const sqls = require('../connect').do

const addRoom = val => {
  let _sql = `insert into live_room (room,code,title,keywords,descrip,logo,icon,bag,qr,roomStatus,chatServerUrl,videoModule,liveService,pcCode,mobileCode,robotNum,service,statistics,copyright,create_time) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  return sqls(_sql, val)
}

module.exports={
  addRoom
}