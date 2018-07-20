const log = require('./server/log')
const fs = require('fs')
const readline = require('readline')
const moment = require('moment')
const path = require('path')
let time = moment().format('YYYY-MM-DD')
const getUserLog = () => {
  return new Promise((resolve, reject) => {
    let logList = []
    const rl = readline.createInterface({
      input: fs.createReadStream(
        path.resolve(__dirname, `./server/logger/user/user_${time}.log`)
      ),
      crlfDelay: Infinity
    })
    rl.on('line', line => {
      let obj = JSON.parse(line)
      logList.unshift(obj)
    })
    rl.on('close', () => {
      resolve(logList)
    })
  })
}
let b = getUserLog()
b.then(rs=>{
  log.info(rs)
})
