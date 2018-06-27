const Router = require("koa-router")();
const api = require('./api');
Router.get("/", api.showIndex);
Router.post("/postForm", api.postForm);
Router.get("/getData", api.getForm);
module.exports = Router;