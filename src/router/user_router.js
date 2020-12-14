/*
 * @Author: lwy
 * @Date: 2020-11-24 14:24:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-14 18:44:55
 * @FilePath: /coderhub/src/router/user_router.js
 */
const Router = require('koa-router')

const { 
  create,
  avatarInfo
 } = require('../controller/user_controller')

const { 
  verifyUser,
  handlePassword
 } = require('../middleware/user_middleware')

const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser, handlePassword, create)

userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter