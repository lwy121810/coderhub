/*
 * @Author: lwy
 * @Date: 2020-12-09 16:17:19
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-09 17:47:59
 * @FilePath: /coderhub/src/router/comment_router.js
 */

 const Router = require('koa-router')

 const {
   verfiyAuth,
   verfiyPermission
 } =  require('../middleware/auth_middleware')

 const {
   create,
   reply,
   update,
   remove
 } = require('../controller/comment_controller')

 const commentRouter = new Router({prefix:'/comment'})

 // 回复动态
 commentRouter.post('/',verfiyAuth, create)
 // 回复评论
 commentRouter.post('/:commentId/reply', verfiyAuth, reply)

 // 修改评论
 commentRouter.patch('/:commentId', verfiyAuth, verfiyPermission, update)
 // 删除评论
 commentRouter.delete('/:commentId', verfiyAuth, verfiyPermission, remove)

 module.exports = commentRouter