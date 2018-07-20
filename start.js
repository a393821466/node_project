const http = require('http')
const app = require('./server/app')
const cfg = require('./server/config/config')

//监听端口
const port =
  process.env.NODE_ENV == 'development'
    ? cfg.development.port
    : cfg.production.port
http.createServer(app.callback()).listen(port, '0.0.0.0', err => {
  if (err) {
    // log.error(err);
    return console.log(`http server init error: ${err.message}`)
  }
  console.log(`http server listen at port: ${port}`)
})
