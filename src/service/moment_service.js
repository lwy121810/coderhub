/*
 * @Author: lwy
 * @Date: 2020-12-08 10:18:20
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-10 14:47:01
 * @FilePath: /coderhub/src/service/moment_service.js
 */
const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?);`
    const [result] = await connection.execute(statement,[content, userId])
    return result
  }
  // 根据动态id获取动态内容以及动态的评论
  async getMomentById(id) {
    console.log('获取动态内容！', id);
    // 这条语句只能获取动态的内容以及动态的创建者信息
    /*
      {
        "id": 1,
        "content": "新的风暴已经来到",
        "createTime": "2020-12-09T06:20:47.000Z",
        "updateTime": "2020-12-09T07:18:10.000Z",
        "user": {
            "id": 4,
            "name": "lucy"
          }
      }
    */
    // const statement = `
    //     SELECT 
    //       m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    //       JSON_OBJECT('id',u.id,'name',u.name) user 
    //     FROM moment m LEFT JOIN user u 
    //     ON m.user_Id = u.id
    //     WHERE m.id = ?;
    // `

    // 这里除了获取动态的内容和创建者 还要获取动态的评论列表，以及评论的用户
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content',c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 
            'user',JSON_OBJECT('id', cu.id, 'name', cu.name))
        ) comments 
      FROM moment m 
      LEFT JOIN user u ON m.user_Id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id 
      LEFT JOIN user cu ON c.user_id = cu.id 
      WHERE m.id = 1;
    `
    try {
    const [result] = await connection.execute(statement,[id])
    return result[0]
    } catch (error) {
      console.log(error);
    }
  }
  async getMomentList(offset, size) {
    // 增加评论个数字段commentCount
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
      FROM moment m LEFT JOIN user u 
      ON m.user_Id = u.id
      LIMIT ?,?;
    `
    const [result] = await connection.execute(statement,[offset, size])
    return result
  }

  async update(content, momentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }
}
module.exports = new MomentService()