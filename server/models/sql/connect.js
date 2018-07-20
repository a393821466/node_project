const mysql = require('mysql')
const config = require('../../config/config').sqlConfig
const logger = require('../../log')
pool = mysql.createPool(config)
//数据库连接池
exports.do = function(sql, data) {
  return new Promise((resolve, reject) => {
    this.getConnection((err, connection) => {
      if (err) {
        logger.error({ message: err.message })
        reject(err)
        return
      }
      connection.query(sql, data, (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows)
        connection.release()
      })
    })
  })
}.bind(pool)

exports.quit = function() {
  pool.end(function(err) {
    if (err) console.log(err)
  })
}
// exports.do = function (sql, data, callback) {
//     this.getConnection(function (err, connection) {
//       connection.query(sql, data, function () {
//         callback.apply(connection, arguments);
//         connection.release();
//       });
//     })
//   }.bind(pool)
