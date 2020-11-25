/*
 * @Author: lwy
 * @Date: 2020-11-25 10:11:26
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 10:48:18
 * @FilePath: /coderhub/src/utils/password-handle.js
 */
const crypto = require('crypto')

const md5Password = (password) => {
  const md5 = crypto.createHash('md5');
  const res = md5.update(password).digest('hex');
  return res
}
module.exports = md5Password;