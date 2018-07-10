const User = require("../sql/manageMent/user");
const Group = require("../sql/manageMent/group");
const Usergroup = require("../sql/manageMent/userGroup");
const md5 = require("../../utils/md5");
const configName = require("../../config/config").checkList;
const sqls = require("../sql/connect").do;
const uuid = require("uuid/v1");
const redis = require("../../redis");

const fig = require("../../config/config").db_sql;
class user {
  /**
   *  登录中间件
   *  @param {username} 用户名 
   *  @param {password} 密码 
   */
  static async userLogin(ctx) {
    let { username, password } = ctx.request.body;
    let finUser = await User.findUsername("username", username);
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
    let merchant = !ctx.request.header['merchant'] ? '' : ctx.request.header['merchant'];
    let user = {
      username: query.username,
      password: query.password,
      comfPassword: query.comfPassword,
      status: 0,
      statusId: 1,
      roomId: query.roomId,
      create_time: Date.now()
    }
    //关键字禁止注册
    if (configName.indexOf(user.username) !== -1) {
      ctx.error('不能使用该用户名注册!');
    }
    //注册逻辑
    let findUser = await User.findUsername("username", user.username);
    if (findUser.length <= 0) {
      if (user.password !== user.comfPassword) {
        ctx.error("密码不匹配");
      } else {
        let findUserGroup = await Group.findGroup("id", 9);
        if (findUserGroup.length == 0) {
          ctx.error(500, "没有该用户组");
        }
        let val = [user.username, md5(md5(user.password) + 'maple'), "", merchant, "", user.status, user.statusId, user.roomId, "", "", "", user.create_time];
        let addUsername = await User.innsertUsername(val);
        let addUserGroup = await Usergroup.innsertGroup([addUsername.insertId, findUserGroup[0].id])
        if (!addUserGroup) {
          ctx.error(500, "插入用户组失败");
        }
        ctx.body = {
          statusCode: true
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
    if (ctx.request.header['authorization']) {
      let uid = ctx.request.header['authorization'];
      let del = await redis.delToken(uid);
      if (del) {
        ctx.body = {
          statusCode: true
        }
      }
    }
  }
}

module.exports = user;