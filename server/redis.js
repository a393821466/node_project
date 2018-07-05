const Redis = require('ioredis');
const redisConfig = require("./config/config").redisConfig;
const formartDate = require("./utils/formatDate");
const redis = new Redis(redisConfig);

class ioredisConfig {
  constructor() {
    // this.users = {};
  }
  /**
   * 该方法主要是验证redis是否连接成功
   */
  static redisClient() {
    return new Promise((resolve, reject) => {
      redis.ping().then(v => {
        if (v !== 'PONG') {
          reject("redis连接失败");
        }
        resolve("redis连接成功");
      });
    })
  }

  /**
   * uid是登录后生成的uuid，作为token登录令牌
   * v是登录后返回的数据，拿到这里面来组装生成token
   * @param {String} uid 
   * @param {Object} v 
   */
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

  /**
   * 验证token中间件
   */
  static async authToken(ctx, next) {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'];
      let verifyToken = await redis.get(token);
      let createTime = !verifyToken ? ctx.error(401, "token不存在") : formartDate(Date.now(), JSON.parse(verifyToken).tokenCreate);
      if (createTime > 10800) {
        redis.del(token);
        ctx.error(401, "token已失效");
      }
      // console.log(createTime);
      let updateTokens = await ioredisConfig.updateToken(token);
      if (updateTokens) {
        await next();
      }
    } else {
      ctx.error(401, "没有token");
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
   * 关闭redis连接
   */
  static async quit(){
    return new Promise((resolve,reject)=>{
      redis.quit().then(rs=>{
        if(!rs){
          throw Error(rs);
        }
        console.log(rs);
      })
    })
  }
}
module.exports = ioredisConfig;