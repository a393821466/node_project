const db = require("../models/userModel");
const postCommon = require("./utils");
var querystring = require('querystring');
const userModels = db.userModels;
class webApi {
  async showIndex(ctx, next) {
    await ctx.render("index");
  };
  async postForm(ctx, next) {
    let da = await postCommon.postFormData(ctx);
    let str = querystring.parse(da)
    let data = {
      "username": str.username,
      "age": str.age,
      "phone": str.phone,
      "createDate": Date.now()
    }
    if (data.username == "" || data.age == "" || data.phone == "") {
      ctx.error('表单不能为空');
    } else {
      let phoneFind = await userModels.find({ phone: data.phone });
      if (phoneFind.length !== 0) {
        ctx.status = 500;
        ctx.error('手机号已经存在');
        return;
      }
      try {
        let user = await userModels.create(data);
        ctx.body = {
          statusCode: 1,
          message: `成功添加一个名字叫${data.username}的朋友`
        }
      } catch (err) {
        ctx.status = 500;
        ctx.error('参数错误');
      }
    }
  };
  async getForm(ctx, next) {
    try {
      let page = Number(ctx.query.page),
        size = Number(ctx.query.pageSize),
        totle = await userModels.count();
      let da = await userModels.find({}).skip((page - 1) * size).limit(size).sort({ createDate: -1 });
      ctx.body = {
        statusCode: 1,
        value: da
      }
    } catch (err) {
      ctx.body = {
        statusCode: -1004,
        message: "查询出错"
      }
    }
  }
}
module.exports = new webApi();