
//token实现验证
module.exports = async (ctx, next) => {
  if (ctx.request.header['authorization']) {
    let token = ctx.request.header['authorization'];
    console.log(token);
    // console.log(decoded);
    // if (token && decoded.exp <= new Date() / 1000) {
    //   ctx.error(401, "token已失效");
    // } else {
    //   return next();
    // }
  } else {
    ctx.error(401, "没有token");
  }
}