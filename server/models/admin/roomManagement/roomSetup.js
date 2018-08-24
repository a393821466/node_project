const validate=require('../../../utils/validate');
const roomSql=require('../../sql/roomMent/room');
const roomSubset=require('../../sql/roomMent/roomsubset');
class roomSetup{
  static async addRooms(ctx){
    let query=ctx.request.body;
    let data={
      "room":query.room,
      "code":query.code,
      "title":query.title,
      "keywords":query.keywords,
      "descrip":query.descrip,
      "logo":query.logo,
      "icon":query.icon,
      "bag":query.bag,
      "qr":query.qr,
      "roomStatus":query.roomStatus,
      "chatServerUrl":query.chatServerUrl,
      "videoModule":query.videoModule,
      "liveService":query.liveService,
      "pcCode":query.pcCode,
      "mobileCode":query.mobileCode,
      "robotNum":query.robotNum,
      "service":query.service,
      "statistics":query.statistics,
      "copyright":query.copyright,
      "regfilter":query.regfilter,
      "chatfilter":query.chatfilter,
      "roompwd":query.roompwd,
      "roomkeymsg":query.roomkeymsg,
      "videolooktime":query.videolooktime,
      "msgshield":query.msgshield,
      "msgrecording":query.msgrecording,
      "msgreview":query.msgreview,
      "threeLogin":query.threeLogin,
      "regreview":query.regreview
    }
    let verify=validate.validateRoomInfo(data)
    if(verify){
      ctx.error(verify)
    }
    let addRooms=await roomSql.addRoom([data.room,data.code,data.title,data.keywords,data.descrip,data.logo,data.icon,data.bag,data.qr,data.roomStatus,data.chatServerUrl,data.videoModule,data.liveService,data.pcCode,data.mobileCode,data.robotNum,data.service,data.statistics,data.copyright,Date.now()])
    if(!addRooms){
      ctx.error('服务器繁忙,请稍后在试')
    }
    console.log(addRooms)
    // let addSubset=await roomSubset.addRoomSubset([data.room,data.regfilter,data.chatfilter,data.roompwd,data.roomkeymsg,data.videolooktime,data.msgshield,data.msgrecording,data.threeLogin,data.regreview])
  }
}

module.exports=roomSetup