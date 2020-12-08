/*
 * @Author: lwy
 * @Date: 2020-12-02 17:39:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-08 14:05:48
 * @FilePath: /coderhub/src/router/moment_router.js
 */
// 评论router

const Router = require('koa-router')

const {
  create,
  detail,
  list,
} = require('../controller/moment_controller')

const { 
  verfiyAuth 
} = require('../middleware/auth_middleware')

const momentRouter = new Router({prefix:'/moment'})
// 发表动态
momentRouter.post('/',verfiyAuth, create)
// 获取单条动态
momentRouter.get('/:momentId', detail)
// 获取动态列表
momentRouter.get('/',list)


module.exports = momentRouter