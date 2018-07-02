const db = require("../models/createDB");
const md5 = require("../middleware/md5");
class user {
  //登录中间件
  static async userLogin(ctx, next) {
    let query = ctx.request.body;
    let user = {
      username: query.username,
      password: query.password,
    }
    console.log(user);
  }
  //注册中间件
  static async userRegister(ctx, next) {
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
    let findUser = await db.findData(user.username);
    if (findUser.length <= 0) {
      if (user.password !== user.comfPassword) {
        ctx.error("密码不匹配");
      } else {
        let data = [user.username, md5(md5(user.password) + 'maple'), user.groupId, "", "", user.status, user.statusId, "", "", "", user.create_time];
        let insertData = await db.insertData(data);
        ctx.body = {
          success: true
        }
      }
    } else {
      ctx.error("用户名已存在");
    }
  }
}

module.exports = user;