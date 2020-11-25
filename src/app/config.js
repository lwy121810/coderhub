/*
 * @Author: lwy
 * @Date: 2020-11-24 13:40:47
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-24 15:10:12
 * @FilePath: /coderhub/src/app/config.js
 */
const dotenv = require('dotenv')


// config会读取.env文件，解析里面的内容，并将其分配给process.env
dotenv.config()

// 导出APP_PORT
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;