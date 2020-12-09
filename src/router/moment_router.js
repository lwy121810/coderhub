/*
 * @Author: lwy
 * @Date: 2020-12-02 17:39:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-09 14:39:16
 * @FilePath: /coderhub/src/router/moment_router.js
 */
// 评论router

const Router = require('koa-router')

const {
  create,
  detail,
  list,
  update
} = require('../controller/moment_controller')

const { 
  verfiyAuth,
  verfiyPermission
} = require('../middleware/auth_middleware')

const momentRouter = new Router({prefix:'/moment'})
// 发表动态
momentRouter.post('/',verfiyAuth, create)
// 获取单条动态
momentRouter.get('/:momentId', detail)
// 获取动态列表
momentRouter.get('/',list)

// 更新
momentRouter.patch('/:momentId',verfiyAuth, verfiyPermission, update)

module.exports = momentRouter