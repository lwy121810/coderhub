/*
 * @Author: lwy
 * @Date: 2020-11-24 15:01:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-24 15:08:32
 * @FilePath: /coderhub/src/app/database.js
 */
const mysql = require('mysql2')

const config = require('./config')

const pool = mysql.createPool({
  host:config.MYSQL_HOST,
  port:config.MYSQL_PORT,
  database:config.MYSQL_DATABASE,
  user:config.MYSQL_USER,
  password:config.MYSQL_PASSWORD
})

pool.getConnection((err, connect) => {
  connect.connect((err) => {
    if (err) {
      console.log("连接失败：",err);
    } else {
      console.log("数据库连接成功！");
    }
  })
})


module.exports = pool.promise();