const Redis = require('ioredis');
const redisConfig = require("./config/config").redisConfig;
const formartDate = require("./utils/formatDate");
const redis = new Redis(redisConfig);

class ioredisConfig {
  constructor() {
    // this.users = {};
  }
  //生成token
  static async userToken(uid, v) {
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
    let createToken = await redis.set(uid, JSON.stringify(user));
    return redis.get(uid);
  }
  //验证token
  static async authToken(ctx, next) {
    let that = this;
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'];
      let verifyToken = await redis.get(token);
      let createTime = !verifyToken ? ctx.error(401, "token不存在") : formartDate(Date.now(), JSON.parse(verifyToken).tokenCreate);
      if (createTime > 10800) {
        redis.del(token);
        ctx.error(401, "token已失效");
      }
      console.log(createTime);
      let updateTokens = await ioredisConfig.updateToken(token);
      if (updateTokens) {
        await next();
      }
    } else {
      ctx.error(401, "没有token");
    }
  }
  //更新token
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
}
module.exports = ioredisConfig;