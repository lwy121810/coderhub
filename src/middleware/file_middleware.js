/*
 * @Author: lwy
 * @Date: 2020-12-14 17:02:40
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-14 17:03:38
 * @FilePath: /coderhub/src/middleware/file_middleware.js
 */
const Multer = require('koa-multer')

const avatarUpload = Multer({
  dest:`./uploads/avatar`
})

const avatarHandler = avatarUpload.single('avatar')

module.exports = {
  avatarHandler
}