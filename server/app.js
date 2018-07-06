const Koa = require("koa");
const router = require("./router/");
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const views = require('koa-views');
const path = require("path");
const app = new Koa();

//错误处理
const errorMiddleware = require("./middleware/httpErr").errorMiddleware;
//路由导出
const userRouter = router.userRouter;
const userAdmin = router.adminRouter;
//加载静态资源
app.use(koaStatic(path.join(__dirname, './public')));

//处理请求请求体
app.use(bodyParser({
  formLimit: '1mb'
}));

app.use(errorMiddleware());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(userAdmin.routes()).use(userAdmin.allowedMethods());

module.exports = app;