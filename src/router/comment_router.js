/*
 * @Author: lwy
 * @Date: 2020-12-09 16:17:19
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-10 13:55:07
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
   remove,
   list
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

 // 获取评论列表（对动态的评论，对评论的评论不获取）
 commentRouter.get('/', list)

 module.exports = commentRouter