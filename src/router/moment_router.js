/*
 * @Author: lwy
 * @Date: 2020-12-02 17:39:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-02 17:46:20
 * @FilePath: /coderhub/src/router/moment_router.js
 */
// 评论router

const Router = require('koa-router')

const {
  create
} = require('../controller/moment_controller')

const { 
  verfiyAuth 
} = require('../middleware/auth_middleware')

const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/',verfiyAuth, create)

module.exports = momentRouter