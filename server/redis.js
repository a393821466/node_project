const Redis = require('ioredis');
const cfg = require("./config/config");
const formartDate = require("./utils/formatDate");
const Merchant = require("./models/sql/manageMent/merchant");
const uuid = require("uuid/v1");
const redisConfig = cfg.redisConfig;
const redis = new Redis({
  redisConfig,
  retryStrategy: function (times) {
    var delay = Math.min(times * 50, 2000);
    return delay;
  }
});

class ioredisConfig {
  // constructor() {
  // this.users = {};
  // }
  /**
   * 该方法主要是验证redis是否连接成功
   */
  static redisClient() {
    return new Promise((resolve, reject) => {
      redis.ping().then(v => {
        if (v !== 'PONG') {
          reject('redis连接失败');
        }
        resolve('redis连接成功');
      });
    })
  }

  /**
   * 判断如果有token就不会再刷新,直到失效或退出
   * uid是登录后生成的uuid，作为token登录令牌
   * v是登录后返回的数据，拿到这里面来组装生成token
   * @param {String} uid 
   * @param {Object} v 
   */
  static async uidToken(v) {
    let id = await redis.get(v[0].id);
    let uid = !id ? '' : JSON.parse(id).token;
    if (!id) {
      uid = uuid();
      let user = {
        value: [{
          id: v[0].id,
          username: v[0].username,
          groupId: v[0].groupId,
          nicename: v[0].nicename,
        }],
        token: uid,
        tokenCreate: Date.now()
      };
      await redis.set(uid, JSON.stringify(user));
      await redis.set(v[0].id, JSON.stringify({ token: user.token, tokenCreate: user.tokenCreate }));
    }
    return redis.get(uid);
  }

  /**
   * 验证token中间件
   */
  static async authToken(ctx, next) {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'];
      let verifyToken = await redis.get(token);
      let userMsg = JSON.parse(verifyToken);
      let createTime = !verifyToken ? ctx.error(401, 'token不存在') : formartDate(Date.now(), userMsg.tokenCreate);
      if (createTime > cfg.EXPIRE) {
        redis.del(token);
        redis.del(userMsg.value[0].id);
        ctx.error(401, 'token已失效');
      }
      console.log(createTime);
      let updateTokens = await ioredisConfig.updateToken(token);
      if (updateTokens) {
        await next();
      }
    } else {
      ctx.error(401, '没有token');
    }
  }

  /**
   * 更新token
   * @param {String} token 
   */
  static async updateToken(token) {
    let updateMsg = await redis.get(token);
    let upUser = JSON.parse(updateMsg);
    let updateUser = {
      value: [{
        id: upUser.value[0].id,
        username: upUser.value[0].username,
        groupId: upUser.value[0].groupId,
        nicename: upUser.value[0].nicename,
      }],
      token: upUser.token,
      tokenCreate: Date.now()
    }
    return new Promise((resolve, reject) => {
      redis.set(upUser.token, JSON.stringify(updateUser)).then(rs => {
        if (rs) resolve(rs);
        reject('出错了');
      })
    })
  }

  /**
   * 删除redis的token
   * @param {String} token 
   */
  static async delToken(token) {
    if (token) {
      redis.del(token);
      return true;
    }
  }

  /**
   * 对merchant品牌验证(未完成)
   */
  static async Merchant(ctx, next) {
    let admin = ctx.request.body.username;
    if (admin !== cfg.administrator.username) {
      let code = ctx.request.header['merchant'];
      if (!code) {
        ctx.error(500, '品牌参数不能为空');
      }
      let findMerchants = await Merchant.findCode(code);
      if (findMerchants.length == 0) {
        ctx.error(500, '品牌参数错误');
      }
    }
    await next();
  }

  /**
   * 关闭redis连接
   */
  static async quit() {
    return new Promise((resolve, reject) => {
      redis.quit().then(rs => {
        if (!rs) {
          throw Error(rs);
        }
        console.log(rs);
      })
    })
  }
}
module.exports = ioredisConfig;