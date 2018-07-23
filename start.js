const http = require('http')
const app = require('./server/app')
const cfg = require('./server/config/config')
const logger = require('./server/log')
//监听端口
const port = cfg.isDebug ? cfg.PORT : 3000
http.createServer(app.callback()).listen(port, '0.0.0.0', err => {
  if (err) {
    logger.error(err.message);
    return console.log(`http server init error: ${err.message}`)
  }
  console.log(`http server listen at port: ${port}`)
})
