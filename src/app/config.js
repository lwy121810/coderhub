/*
 * @Author: lwy
 * @Date: 2020-11-24 13:40:47
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-02 16:32:49
 * @FilePath: /coderhub/src/app/config.js
 */
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')


// config会读取.env文件，解析里面的内容，并将其分配给process.env
dotenv.config()

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// 导出APP_PORT
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY