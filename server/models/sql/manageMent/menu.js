const sqls = require('../connect').do

const findMenuSub = () => {
  let _sql = `select * from live_menu ORDER BY parent_id=0`
  return sqls(_sql)
}

module.exports = {
  addMenus
}
