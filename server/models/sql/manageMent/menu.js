const sqls = require('../connect').do

const addMenus = val => {
  let _sql = `insert into live_menu(parentName,parentPath,parentRedirect,parentComponent	,parentTitle,parentIcon,parentHidden,subPath,subName,subComponent,subTitle,subIcon) values(?,?,?,?,?,?,?,?,?,?,?)`
  return sqls(_sql, val)
}

module.exports = {
  addMenus
}
