const Koa = require("koa");
const router = require("./server/router/");
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const views = require('koa-views');
const app = new Koa();

//错误处理
const errorMiddleware = require("./server/middleware/httpErr").errorMiddleware;
//路由导出
const userRouter = router.userRouter;
const userAdmin = router.adminRouter;
//加载静态资源
// app.use(koaStatic(path.join(__dirname, './public')));

//实例化处理post请求
app.use(bodyParser({
  formLimit: '1mb'
}));

app.use(errorMiddleware());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(userAdmin.routes()).use(userAdmin.allowedMethods());
app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888);
});
