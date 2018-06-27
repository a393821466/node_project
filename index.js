const Koa = require("koa");
const views = require("koa-views");
const path = require("path")
const static = require("koa-static");
const router = require("./controller/router");
const app = new Koa();
//配置ejs
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
//配置静态资源
app.use(static(__dirname + '/public'));
//错误处理中间件
app.use(async (ctx, next) => {
  try {
    ctx.error = (code, message) => {
      if (typeof code === 'string') {
        message = code;
        code = 500;
      }
      ctx.throw(code || 500, message || '服务器错误');
    };
    await next();
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || '服务器错误';
    ctx.response.body = { status, message };
  }
})
//挂载路由
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(4000);