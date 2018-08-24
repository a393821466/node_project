const Koa = require('koa')
const router = require('./router/')
const bodyParser = require('koa-bodyparser')
// const koaStatic = require('koa-static')
// const views = require('koa-views');
const path = require('path')
const app = new Koa()

//异常处理
const errorMiddleware = require('./middleware/http_error').errorMiddleware
//路由中间件
const userRouter = router.userRouter
const userSetting = router.systemSetting
const userManagement = router.userManagement
const roomManagement=router.roomSetup
//加载静态资源
app.use(require('koa-static')(__dirname + '/public'))

//处理请求请求体
app.use(
  bodyParser({
    formLimit: '1mb'
  })
)


//中间件时间，信息，方法打印
app.use(async(ctx, next) =>{
  const start=Date.now();
  await next();
  const ms=Date.now()-start;
  const message = `${ctx.method} ${ctx.url} - ${ms}ms ${ctx.status}`
  console.log(message);
});

app.use(errorMiddleware())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(userSetting.routes()).use(userSetting.allowedMethods())
app.use(userManagement.routes()).use(userManagement.allowedMethods())
app.use(roomManagement.routes()).use(roomManagement.allowedMethods())

module.exports = app