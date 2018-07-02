let errorMiddleware = () => {
  return async (ctx, next) => {
    try {
      console.log(ctx.status);
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
  }
}

exports.errorMiddleware = errorMiddleware;