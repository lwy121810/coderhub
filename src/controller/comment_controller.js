/*
 * @Author: lwy
 * @Date: 2020-12-09 16:19:48
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-09 17:59:00
 * @FilePath: /coderhub/src/controller/comment_controller.js
 */

const commentService = require('../service/comment_service')

class CommentController {
  // 创建对动态的评论
  async create(ctx, next) {
    const {id} = ctx.user
    const { momentId, content } = ctx.request.body;
    const res = await commentService.create(momentId, content,id)
    ctx.body = res 
  }
  // 回复评论
  async reply(ctx, next) {
    const { id } = ctx.user 
    const { content, momentId } = ctx.request.body
    const { commentId } = ctx.params
    const res = await commentService.reply(momentId, content, id, commentId)
    ctx.body = res 
  }

  // 修改评论
  async update(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    const res = await commentService.update(content, commentId)
    ctx.body = res 
  }
  // 删除评论
  async remove(ctx, next) {
    const { commentId } = ctx.params
    const res = await commentService.remove(commentId)
    ctx.body = res 
  }

}

module.exports = new CommentController()