const Router = require("koa-router")();
const api = require('./api');
Router.get("/", api.showIndex)
  .post("/postForm", api.postForm)
  .get("/getData", api.getTableData)
  .del("/delData", api.delTableData)
  .post("/upDate", api.updateTableData);
module.exports = Router;