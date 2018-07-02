const mysql = require("mysql");
const config = require("../config/db_config");

pool = mysql.createPool(config.sqlConfig);

//数据库连接池
exports.do = function (sql, data) {
  return new Promise((resolve, reject) => {
    this.getConnection((err, connection) => {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, data, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  })
}.bind(pool)

// exports.do = function (sql, data, callback) {
//     this.getConnection(function (err, connection) {
//       connection.query(sql, data, function () {
//         callback.apply(connection, arguments);
//         connection.release();
//       });
//     })
//   }.bind(pool)