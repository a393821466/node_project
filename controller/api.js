const db = require("../models/userModel");
const postCommon = require("./utils");
var querystring = require('querystring');
const userModels = db.userModels;
class webApi {
  //显示页面
  async showIndex(ctx, next) {
    await ctx.render("index");
  };
  //插入数据
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
  //取数据以及分页逻辑
  async getTableData(ctx, next) {
    try {
      let pages = ctx.query.page,
        pageSize = ctx.query.pageSize == undefined ? 10 : Number(ctx.query.pageSize),
        totle = await userModels.count();
      if (pages == undefined) {
        ctx.status = 500;
        ctx.error('');
      }
      let page = parseInt(pages);
      let da = await userModels.find({}).skip((page - 1) * pageSize).limit(pageSize).sort({ createDate: -1 });
      ctx.response.type = 'application/json';
      // //总分页
      let pageCount = parseInt((totle + pageSize - 1) / pageSize);
      ctx.body = {
        statusCode: 1,
        page: page,
        pageSize: pageSize,
        totle: pageCount,
        value: da
      }
    } catch (err) {
      ctx.status = 500;
      ctx.error("查询出错了");
    }
  };
  //删除逻辑
  async delTableData(ctx, next) {
    try {
      let da = await postCommon.postFormData(ctx);
      let rs = querystring.parse(da);
      let sq = await userModels.remove({ _id: rs.id });
      if (sq) {
        ctx.body = {
          statusCode: 1,
          success: true
        }
      }
    } catch (e) {
      ctx.status = 500;
      ctx.error("删除出错了");
    }
  };
  //更新逻辑
  async updateTableData(ctx, next) {
    try {
      let da = await postCommon.postFormData(ctx);
      let rs = querystring.parse(da);
      let { uid, username, age, phone } = rs;
      let findbs = await userModels.find({ _id: uid });
      let findbs2 = await userModels.find({});
      if (findbs.length > 0) {
        for (var i = 0; i < findbs2.length; i++) {
          if (findbs2[i].phone == phone) {
            ctx.status = 500;
            ctx.error('');
            return;
          } else {
            let data = {
              "username": username == '' ? findbs[0].username : username,
              "age": age == '' ? findbs[0].age : age,
              "phone": phone == '' ? findbs[0].phone : phone,
              "createDate": Date.now()
            }
            let dbs = await userModels.update({ _id: uid }, data);
            if (dbs) {
              ctx.body = {
                statusCode: 1,
                success: true,
                message: '更新成功'
              }
            }
          }
        }
      }
    } catch (e) {
      ctx.status = 500;
      ctx.error("手机号已存在");
    }
  }
}
module.exports = new webApi();