const Koa = require("koa");
const router = require("./server/router/");
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const views = require('koa-views');
const app = new Koa();

const errorMiddleware = require("./server/middleware/httpErr").errorMiddleware;
//加载静态资源
// app.use(koaStatic(path.join(__dirname, './public')));

//实例化处理post请求
app.use(bodyParser({
  formLimit: '1mb'
}));
app.use(errorMiddleware());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888);
});
