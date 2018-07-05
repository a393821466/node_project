const db = require("../../models/createDB");
const md5 = require("../../middleware/md5");
const configName = require("../../config/config").checkList;
const uuid = require("uuid/v1");
const redis = require("../../redis");
// const createToken = require("../../middleware/createToken.js");
const fig = require("../../config/config").db_sql;
class user {
  /**
   *  登录中间件
   *  @param {username} 用户名 
   *  @param {password} 密码 
   */
  static async userLogin(ctx) {
    let { username, password } = ctx.request.body;
    let finUser = await db.findData(fig.live_user,"username", username);
    if (finUser.length <= 0) {
      ctx.error("用户不存在");
    } else {
      password = md5(md5(password) + 'maple');
      if (password !== finUser[0].password) {
        ctx.error(403, "密码错误");
      } else {
        let uid = uuid();
        let finUsers = delete (finUser[0].password);
        let data = await redis.userToken(uid, finUser);
        ctx.body = JSON.parse(data);
      }
    }
  }
  /**
   *  登录中间件
   *  @param {username} 用户名 
   *  @param {password} 密码 
   *  @param {comfPassword} 确认密码 
   *  @param {groupId} 用户组 
   *  @param {status} 是否审核 (后台设定默认0)
   *  @param {statusId} 是否可以登录 (后台设定默认1) 
   *  @param {roomId} 房间id  
   *  @param {create_time} 创建时间 (后台自动创建) 
   */
  static async userRegister(ctx) {
    let query = ctx.request.body;
    let user = {
      username: query.username,
      password: query.password,
      comfPassword: query.comfPassword,
      groupId: 1,
      status: 0,
      statusId: 1,
      create_time: Date.now()
    }
    //关键字禁止注册
    if (configName.indexOf(user.username) !== -1) {
      ctx.error('不能使用该用户名注册!');
    }
    //注册逻辑
    let findUser = await db.findData(fig.live_user, "username",user.username);
    if (findUser.length <= 0) {
      if (user.password !== user.comfPassword) {
        ctx.error("密码不匹配");
      } else {
        let data = [user.username, md5(md5(user.password) + 'maple'), user.groupId, "", "", user.status, user.statusId, "", "", "", "", user.create_time];
        let insertData = await db.insertData(data);
        ctx.body = {
          code: true
        }
      }
    } else {
      ctx.error("用户名已存在");
    }
  }
  /**
   * 判断头部authorization内是否带token,
   * 如果带有token就把它传入到redis方法
   */
  static async userLogout(ctx) {
    if(ctx.request.header['authorization']){
      let uid=ctx.request.header['authorization'];
      let del=await redis.delToken(uid);
      if(del){
        ctx.body={
          code:true
        }
      }
    }
  }
}

module.exports = user;