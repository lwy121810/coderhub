/*
 * @Author: lwy
 * @Date: 2020-12-02 17:39:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 14:21:51
 * @FilePath: /coderhub/src/router/moment_router.js
 */
// 评论router

const Router = require('koa-router')

const {
  create,
  detail,
  list,
  update,
  addLabels
} = require('../controller/moment_controller')

const { 
  verfiyAuth,
  verfiyPermission
} = require('../middleware/auth_middleware')

const {
  verifyExistLabels
} = require('../middleware/label_middleware')

const momentRouter = new Router({prefix:'/moment'})
// 发表动态
momentRouter.post('/',verfiyAuth, create)
// 获取单条动态
momentRouter.get('/:momentId', detail)
// 获取动态列表
momentRouter.get('/',list)

// 更新
momentRouter.patch('/:momentId',verfiyAuth, verfiyPermission, update)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verfiyAuth,verfiyPermission, verifyExistLabels, addLabels)

module.exports = momentRouter