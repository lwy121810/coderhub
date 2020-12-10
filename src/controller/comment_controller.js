/*
 * @Author: lwy
 * @Date: 2020-12-09 16:19:48
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-10 10:07:57
 * @FilePath: /coderhub/src/controller/comment_controller.js
 */

const commentService = require('../service/comment_service')

class CommentController {
  // 创建对动态的评论
  async create(ctx, next) {
    const {id} = ctx.user
    const { momentId, content } = ctx.request.body;
    if (!momentId) {
      ctx.body = 'momentId不能为空'
      return
    }
    if (!content) {
      ctx.body = 'content不能为空！'
      return
    }
    const res = await commentService.create(momentId, content,id)
    ctx.body = res 
  }
  // 回复评论
  async reply(ctx, next) {
    const { content, momentId } = ctx.request.body
    if(!content) {
      ctx.body = 'content 不能为空'
      return
    }
    if (!momentId) {
      ctx.body = 'momentId不能为空'
      return
    }
    const { id } = ctx.user 
    const { commentId } = ctx.params
    try {
      const res = await commentService.reply(momentId, content, id, commentId)
      ctx.body = res 
    } catch (error) {
      console.log(error);
    }
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
  // 获取对动态的评论列表
  async list(ctx, next) {
    const { momentId } = ctx.query
    const result = await commentService.commentsByMomentId(momentId)
    ctx.body = result
  }

}

module.exports = new CommentController()