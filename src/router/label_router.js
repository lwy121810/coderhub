/*
 * @Author: lwy
 * @Date: 2020-12-11 10:28:30
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 16:26:09
 * @FilePath: /coderhub/src/router/label_router.js
 */
const Router = require('koa-router')

const {
  verfiyAuth
} = require('../middleware/auth_middleware')

const {
  create,
  list
} = require('../controller/label_controller')

const labelRouter = new Router({prefix:'/label'})

// 添加标签
labelRouter.post('/', verfiyAuth, create)

// 获取标签
labelRouter.get('/', list)

module.exports = labelRouter