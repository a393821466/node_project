const app = require('../app');
const expect = require('chai').expect;
// const redis = require('../config/redis.config').redis;
// let router = require('../router/user/users')
const request = require('supertest').agent(app.listen());

describe('API test', function () {
  var userInfo;
  describe('测试项目功能API', function () {
    it('POST /login 测试登陆接口', function (done) {
      request.post('/login').send({ username: 'admin', password: 'admin' }).set({ 'Content-Type': 'application/json' }).end(function (err, res) {
        if (err) return done(err)
        if (res.status == 200) {
          let rs = JSON.parse(res.text);
          userInfo = rs
        }
        done()
      })
    })
    it('POST /register 测试注册接口', function (done) {
      request.post('/register').send({
        username: 'test001',
        password: 'test001',
        comfPassword: 'test001'
      }).set({ 'Content-Type': 'application/json' })
        .end(function (err, res) {
          if (err) return done(err)
          done()
          console.log(res.text);
        })
    })
  })
})