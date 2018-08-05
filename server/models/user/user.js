const User = require('../sql/manageMent/user')
const Group = require('../sql/manageMent/group')
const Usergroup = require('../sql/manageMent/userGroup')
const UserSubset = require('../sql/manageMent/usersubset')
const md5 = require('../../utils/md5')
const utils = require('../../utils/tool')
const configName = require('../../config/config').checkList
const redis = require('../../middleware/redis')
const redisConfig = require('../../config/redis.config').redis;
const cfg = require('../../config/config').administrator
class user {
  /**
   *  登录中间件
   *  @param {username} 用户名
   *  @param {password} 密码
   */
  static async userLogin(ctx) {
    let { username, password, remumber } = ctx.request.body
    let ip = utils.getIp(ctx.request)
    let code =
      username == cfg.username ? cfg.merchant : ctx.request.header['merchant']
    //获取token判断
    let data = await redisConfig.get(password);
    if (!data || data == null) {
      if (!username || !password) {
        ctx.error(500, '用户名或密码不能为空')
      }
      let finUser = ''
      if (username === cfg.username) {
        finUser = await User.validateUser([
          username,
          md5(md5(password) + 'maple')
        ])
      } else {
        finUser = await User.vaUserPswMerchant([
          username,
          md5(md5(password) + 'maple'),
          code
        ])
      }
      // console.log(finUser)
      if (finUser.length <= 0) {
        ctx.error(403, '用户名或密码错误')
      }
      data = await redis.uidToken(remumber, finUser, ip)
    } else {
      let info = JSON.parse(data);
      // console.log(info.value.id, info.value.username, info.token, remumber);
      await redis.userKeys(info.value.id, info.value.username, info.token, remumber)
    }
    ctx.body = typeof data == 'string' ? JSON.parse(data) : data
  }
  /**
   *  注册中间件
   *  @param {username} 用户名
   *  @param {password} 密码
   *  @param {comfPassword} 确认密码
   *  @param {groupId} 用户组
   *  @param {status} 是否审核 (后台设定默认0)
   *  @param {frozenStatus} 是否可以登录 (后台设定默认1)
   *  @param {roomId} 房间id
   *  @param {create_time} 创建时间 (后台自动创建)
   */
  static async userRegister(ctx) {
    let query = ctx.request.body
    let code = ctx.request.header['merchant']
    let user = {
      username: query.username,
      password: query.password,
      comfPassword: query.comfPassword,
      status: 0,
      f_status: 1,
      a_status: 1,
      roomId: query.roomId,
      create_time: Date.now()
    }
    //关键字禁止注册
    if (configName.indexOf(user.username) !== -1) {
      ctx.error('不能使用该用户名注册')
    }
    //注册逻辑
    let findUser = await User.vaUserPswMerchant([
      user.username,
      md5(md5(user.password) + 'maple'),
      code
    ])
    if (findUser.length > 0) {
      ctx.error('用户名已存在')
    }
    if (user.password !== user.comfPassword) {
      ctx.error('密码不匹配')
    }
    let findUserGroup = await Group.findGroup('name', ['普通会员', code])
    if (findUserGroup.length == 0) {
      ctx.error(500, '没有找到用户组')
    }
    let val = [
      user.username,
      md5(md5(user.password) + 'maple'),
      '',
      code,
      '',
      user.status,
      user.f_status,
      user.a_status,
      user.roomId,
      user.create_time
    ]
    await User.innsertUsername(val)
      .then(result => {
        return result
      })
      .then(result => {
        Usergroup.innsertGroup([result.insertId, findUserGroup[0].id])
        return result
      })
      .then(result => {
        UserSubset.subsetInsert([result.insertId, '', '', '', 0, 0])
      })
      .catch(er => {
        ctx.error(er)
      })
    ctx.body = {
      code: 2001,
      statusCode: true
    }
  }
  /**
   *  @param {String} id
   * 判断头部authorization内是否带token,
   * 如果带有token就把它传入到redis方法
   */
  static async userLogout(ctx) {
    let { id } = ctx.query
    console.log(id);
    if (!id) {
      ctx.error(400, '参数不正确')
    }
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization']
      let del = await redis.delToken(id, token)
      if (del) {
        ctx.body = {
          code: 2001,
          statusCode: true
        }
      }
    }
  }
}

module.exports = user