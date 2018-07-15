const User = require("../sql/manageMent/user");
const Group = require("../sql/manageMent/group");
const Usergroup = require("../sql/manageMent/userGroup");
// const merchants = require("../sql/manageMent/merchant");
const md5 = require("../../utils/md5");
const configName = require("../../config/config").checkList;
const redis = require("../../redis");
const cfg = require("../../config/config").administrator;
class user {
  /**
   *  登录中间件
   *  @param {username} 用户名 
   *  @param {password} 密码 
   */
  static async userLogin(ctx) {
    let { username, password } = ctx.request.body;
    let code = username == cfg.username ? cfg.merchant : ctx.request.header['merchant'];
    if (!username || !password) {
      ctx.error(500, "用户名或密码不能为空");
    }
    let finUser = "";
    if (username === cfg.username) {
      finUser = await User.validateUser([username, md5(md5(password) + 'maple')]);
    } else {
      finUser = await User.vaUserPswMerchant([username, md5(md5(password) + 'maple'), code]);
    }
    if (finUser.length <= 0) {
      ctx.error(403, "用户名或密码错误");
    }
    // let findMerchants = !code ? "" : await merchants.findCode(code);
    // if (finUser[0].username !== cfg.username && (!code || findMerchants.length == 0)) {
    //   ctx.error(500, "品牌参数不正确");
    // }
    let data = await redis.uidToken(code, finUser);
    ctx.body = JSON.parse(data);
  }
  /**
   *  注册中间件
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
    let merchant = ctx.request.header['merchant'];
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
    let findUser = await User.vaUserPswMerchant([user.username, md5(md5(user.password) + 'maple'), merchant]);
    if (findUser.length <= 0) {
      if (user.password !== user.comfPassword) {
        ctx.error("密码不匹配");
      } else {
        let findUserGroup = await Group.findGroup("name", ["普通会员",merchant]);
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
   *  @param {String} id
   * 判断头部authorization内是否带token,
   * 如果带有token就把它传入到redis方法
   */
  static async userLogout(ctx) {
    let { id } = ctx.request.body;
    if (!id) {
      ctx.error(400, '参数有误');
    }
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'];
      let del = await redis.delToken(id, token);
      if (del) {
        ctx.body = {
          statusCode: true
        }
      }
    }
  }
}

module.exports = user;