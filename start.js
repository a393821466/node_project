const http = require('http');
const app = require("./server/app");
const log=require("./server/log");
const PORT = require("./server/config/config").PORT;
//监听端口
http.createServer(app.callback()).listen(PORT,'0.0.0.0',err=>{
  if(err){
    log.error(err);
    return console.log(`http server init error: ${err.message}`);
  }
  console.log(`http server listen at port: ${PORT}`)
});