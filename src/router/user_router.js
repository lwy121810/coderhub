/*
 * @Author: lwy
 * @Date: 2020-11-24 14:24:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-11-25 10:19:44
 * @FilePath: /coderhub/src/router/user_router.js
 */
const Router = require('koa-router')

const { create } = require('../controller/user_controller')

const { 
  verifyUser,
  handlePassword
 } = require('../middleware/user_middleware')

const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser, handlePassword, create)

module.exports = userRouter