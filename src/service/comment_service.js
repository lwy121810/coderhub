/*
 * @Author: lwy
 * @Date: 2020-12-09 16:21:26
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-10 14:19:10
 * @FilePath: /coderhub/src/service/comment_service.js
 */
const connection = require('../app/database')

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);`
    const [result] = await connection.execute(statement,[content, momentId, userId])
    return result
  }
  
  /// 回复评论
  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?);`
    const [result] = await connection.execute(statement,[content, momentId, userId, commentId])
    return result
  }

  // 修改评论
  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement,[content, commentId])
    return result
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [result] = await connection.execute(statement,[commentId])
    return result
  }

  // 根据动态id获取评论列表
  async commentsByMomentId(momentId) {
    // 这里没有返回评论用户的信息
    // const statement = `SELECT * FROM comment WHERE moment_id = ?;`
    const statement = `
      SELECT 
        c.id, c.content, c.comment_id commentId, c.createAt createTime,
        JSON_OBJECT('id', u.id, 'name',u.name) user 
      FROM comment c 
      LEFT JOIN user u ON c.user_id = u.id 
      WHERE c.moment_id = ?;
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
  
}

module.exports = new CommentService()