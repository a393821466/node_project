const db = require("../../models/createDB");
const md5 = require("../../middleware/md5");
const configName = require("../../config/config").checkList;
const createToken = require("../../middleware/createToken.js");
const fig = require("../../config/config").db_sql;
class user {
  //登录中间件
  static async userLogin(ctx, next) {
    let { username, password } = ctx.request.body;
    let finUser = await db.findData(fig.live_user, username);
    if (finUser.length <= 0) {
      ctx.error("用户不存在");
    } else {
      password = md5(md5(password) + 'maple');
      if (password !== finUser[0].password) {
        ctx.error(403, "密码错误");
      } else {
        let user = {
          id: finUser[0].id,
          username: finUser[0].username,
          groupId: finUser[0].groupId
        }
        let token = createToken(user);
        let finUsers = delete (finUser[0].password);
        ctx.body = {
          success: true,
          value: finUser,
          token: token
        }
      }
    }
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
    //关键字禁止注册
    if (configName.indexOf(user.username) !== -1) {
      ctx.error('不能使用该用户名注册!');
    }
    //注册逻辑
    let findUser = await db.findData(fig.live_user, user.username);
    if (findUser.length <= 0) {
      if (user.password !== user.comfPassword) {
        ctx.error("密码不匹配");
      } else {
        let data = [user.username, md5(md5(user.password) + 'maple'), user.groupId, "", "", user.status, user.statusId, "", "", "", "", user.create_time];
        let insertData = await db.insertData(data);
        ctx.body = {
          success: true
        }
      }
    } else {
      ctx.error("用户名已存在");
    }
  }
  //登出逻辑
  static async userLogout(ctx, next) {

  }
}

module.exports = user;