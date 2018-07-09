const sqls = require("./connect").do;
const initConfig = require("../../config/config");

class dbMuch_table {
  static async much_del(ids) {
    let _sql = `delete live_user,live_usergroup from live_user left join live_usergroup on live_user.id = live_usergroup.userid where live_user.id=${ids}`;
    return sqls(_sql)
  }
}

module.exports = dbMuch_table;