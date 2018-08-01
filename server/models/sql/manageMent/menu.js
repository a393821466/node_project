const sqls = require('../connect').do

const findMenuSub = () => {
  let _sql = `select * from live_menu`
  return sqls(_sql)
}

module.exports = {
  findMenuSub
}
