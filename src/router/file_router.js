/*
 * @Author: lwy
 * @Date: 2020-12-14 16:51:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-14 17:37:57
 * @FilePath: /coderhub/src/router/file_router.js
 */
const Router = require('koa-router')

const {
  avatarHandler
} = require('../middleware/file_middleware')

const {
  verfiyAuth
} = require('../middleware/auth_middleware')

const {
  saveAvatarInfo
} = require('../controller/file_controller')

const fileRouter = new Router({prefix:'/upload'})

fileRouter.post('/avatar', verfiyAuth,avatarHandler, saveAvatarInfo)

module.exports = fileRouter;