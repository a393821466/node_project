const redis=require("../redis").redis;
const cfg = require('../config/config')
const formartDate = require('../utils/formatDate')
// const findUser = require("./models/sql/manageMent/user");
const Merchant = require('../models/sql/manageMent/merchant')
const uuid = require('uuid/v1')
const userLog = require('./middleware_log')

class redis_middleware {
  /**
   * 判断如果有token就不会再刷新,直到失效或退出
   * uid是登录后生成的uuid，作为token登录令牌
   * v是登录后返回的数据，拿到这里面来组装生成token
   * @param {String} uid
   * @param {Object} v
   */
  static async uidToken(code, v) {
    let id = await redis.get(v[0].id)
    let uid = !id ? '' : JSON.parse(id).token
    if (!id) {
      uid = uuid()
      let user = {
        value: [
          {
            id: v[0].id,
            username: v[0].username,
            groupId: v[0].groupId,
            nicename: v[0].nicename
          }
        ],
        token: uid,
        merchant: code,
        tokenCreate: Date.now()
      }
      await redis.set(uid, JSON.stringify(user))
      await redis.set(
        v[0].id,
        JSON.stringify({
          username: v[0].username,
          token: user.token,
          tokenCreate: user.tokenCreate
        })
      )
    }
    userLog(v[0].username, { time: Date.now(), action: '登陆成功' })
    return redis.get(uid)
  }

  /**
   * 验证token中间件
   */
  static async authToken(ctx, next) {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'],
        verifyToken = await redis.get(token),
        userMsg = JSON.parse(verifyToken),
        createTime = !verifyToken
          ? ctx.error(401, 'token不存在')
          : formartDate(Date.now(), userMsg.tokenCreate)
      if (createTime > cfg.EXPIRE) {
        redis.del(token)
        redis.del(userMsg.value[0].id)
        ctx.status = 401
        ctx.error(401, 'token已失效')
      }
      // console.log(createTime);
      let updateTokens = await redis_middleware.updateToken(token)
      if (updateTokens) {
        await next()
      }
    } else {
      ctx.error(401, '没有token')
    }
  }

  /**
   * 更新token
   * @param {String} token
   */
  static async updateToken(token) {
    let updateMsg = await redis.get(token),
      upUser = JSON.parse(updateMsg),
      updateUser = {
        value: [
          {
            id: upUser.value[0].id,
            username: upUser.value[0].username,
            groupId: upUser.value[0].groupId,
            nicename: upUser.value[0].nicename
          }
        ],
        merchant: upUser.merchant,
        token: upUser.token,
        tokenCreate: Date.now()
      }
    return new Promise((resolve, reject) => {
      redis.set(upUser.token, JSON.stringify(updateUser)).then(rs => {
        if (rs) resolve(rs)
        reject('出错了')
      })
    })
  }

  /**
   * 删除redis的token
   * @param {String} token
   */
  static async delToken(id, token) {
    if (token) {
      let users = await redis.get(id)
      userLog(JSON.parse(users).username, { time: Date.now(), action: '登出' })
      redis.del(id)
      redis.del(token)
      return true
    }
  }

  /**
   * 对登录后中间件品牌验证
   */
  static async LoginMerchant(ctx, next) {
    let token = ctx.request.header['authorization'],
      code = ctx.request.header['merchant'],
      user = await redis.get(token),
      validateAdmin = JSON.parse(user)
    if (
      validateAdmin.value[0].username !== cfg.administrator.username &&
      validateAdmin !== cfg.administrator.merchant
    ) {
      if (!code) {
        ctx.error(500, '品牌参数不正确')
      }
      let findMerchants = await Merchant.findCode(code)
      if (findMerchants.length == 0) {
        ctx.error(500, '请填写正确的品牌参数')
      }
      if (findMerchants[0].status == 0) {
        ctx.error(500, '无权限访问')
      }
    }
    await next()
  }

  /**
   * 未登录中间件品牌验证
   */
  static async noLoginMerchant(ctx, next) {
    let code = ctx.request.header['merchant']
    let findMerchants = !code ? '' : await Merchant.findCode(code)
    if (findMerchants.length == 0) {
      ctx.error(500, '品牌参数不正确')
    }
    if (findMerchants[0].status == 0) {
      ctx.error(500, '无权限访问')
    }
    await next()
  }

  /**
   * 获取用户信息
   */
  static async getUser(token) {
    return redis.get(token)
  }
}
module.exports = redis_middleware
