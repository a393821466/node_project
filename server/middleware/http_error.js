let errorMiddleware = () => {
  return async (ctx, next) => {
    try {
      ctx.error = (statusCode, message) => {
        if (typeof statusCode === 'string') {
          message = statusCode
          statusCode = 500
        }
        ctx.code = statusCode
        ctx.throw(statusCode || 500, message || '服务器繁忙,请稍后在试')
      }
      await next()
    } catch (e) {
      let code = e.status || 500
      let message ='';
      if(e.code!=='ECONNREFUSED'){
        message = e.message || '服务器错误'
      }else{
        message = '数据库连接超时'
      }
      ctx.response.body = { code, message }
    }
  }
}

exports.errorMiddleware = errorMiddleware