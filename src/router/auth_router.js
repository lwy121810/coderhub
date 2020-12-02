/*
 * @Author: lwy
 * @Date: 2020-11-25 10:53:31
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 11:24:03
 * @FilePath: /coderhub/src/router/auth_router.js
 */
const Router = require('koa-router')

const {
  verifyLogin,
  verfiyAuth
} = require('../middleware/auth_middleware')
const {
  login,
  success
} = require('../controller/auth_controller')

const authRouter = new Router()

authRouter.post('/login', verifyLogin,login)
// 验证token
authRouter.get('/test', verfiyAuth, success)

module.exports = authRouter