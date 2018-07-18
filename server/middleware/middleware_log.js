const bunyan=require("bunyan");
const path=require("path");
const userLog=(name,data,level='info')=>{
  console.log(name,data);
  if (['fatal', 'error', 'warn', 'info', 'debug', 'trace'].indexOf(level) === -1) {
    throw new Error('level should be one of fatal,error,warn,info,debug,trace.but it is ' + level + '.')
  }
  const log=bunyan.createLogger({
    name:name,
    streams:[{
      path:path.resolve(__dirname,'../log/user/'+name+'.log')
    }]
  })
  log[level](data)
}

module.exports=userLog;