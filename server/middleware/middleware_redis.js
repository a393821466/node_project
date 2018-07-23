const redis = require('../redis').redis
const cfg = require('../config/config')
const permission = require('../config/permission').status
const Merchant = require('../models/sql/manageMent/merchant')
const userLog = require('../middleware/middleware_user')
const formartDate = require('../utils/tool')
const uuid = require('uuid/v1')
// const logger = require('../middleware/middleware_log')

class redis_middleware {
  /**
   * 判断如果有token就不会再刷新,直到失效或退出
   * uid是登录后生成的uuid，作为token登录令牌
   * v是登录后返回的数据，拿到这里面来组装生成token
   * @param {String} uid
   * @param {Object} v
   */
  static async uidToken(code, v, ips) {
    let id = await redis.get(v[0].id)
    let uid = !id ? '' : JSON.parse(id).token
    let tokenSurvive = !id
      ? ''
      : formartDate.newTimeAndOldTime(Date.now(), JSON.parse(id).tokenCreate)
    if (tokenSurvive > cfg.EXPIRE) {
      redis.del(uid)
      redis.del(v[0].id)
      tokenSurvives();
    }
    if (!id) {
      tokenSurvives();
    }
    function tokenSurvives(){
      uid = uuid()
      let user = {
        value: [
          {
            id: v[0].id,
            username: v[0].username,
            groupId: v[0].groupId,
            nicename: v[0].nicename,
            ip: ips
          }
        ],
        token: uid,
        merchant: code,
        tokenCreate: Date.now()
      }
      redis.set(uid, JSON.stringify(user))
      redis.set(
        v[0].id,
        JSON.stringify({
          username: v[0].username,
          token: user.token,
          tokenCreate: user.tokenCreate
        })
      )
    }
    await userLog(v[0].username, {
      time: formartDate.now('YYYY-MM-DD H:mm:ss'),
      ip: ips,
      action: '登陆成功'
    })
    return redis_middleware
      .authFreezeAnban(v[0].status, v[0].f_status, v[0].a_status)
      .then(rs => {
        if (rs) {
          return redis.get(uid)
        }
      })
      .catch(er => {
        return er
      })
  }

  /**
   * 用户是否冻结或禁言
   */
  static async authFreezeAnban(s, f, a) {
    return new Promise((resolve, reject) => {
      if (s == 0) reject(permission.t1001)
      if (f == -1) reject(permission.t1002)
      if (a == -1) reject(permission.t1003)
      if (f == 0) reject(permission.t1004)
      if (a == 0) reject(permission.t1005)
      resolve(true)
    })
  }

  /**
   * 校验token组件
   */
  static async authToken(ctx, next) {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'],
        verifyToken = await redis.get(token),
        userMsg = JSON.parse(verifyToken),
        createTime = !verifyToken
          ? ctx.error(401, 'token不存在')
          : formartDate.newTimeAndOldTime(Date.now(), userMsg.tokenCreate)
      if (createTime > cfg.EXPIRE) {
        redis.del(token)
        redis.del(userMsg.value[0].id)
        ctx.status = 401
        ctx.error(401, 'token已失效')
      }
      console.log(createTime);
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
            nicename: upUser.value[0].nicename,
            ip: upUser.value[0].ip
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
