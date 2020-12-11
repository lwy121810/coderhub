/*
 * @Author: lwy
 * @Date: 2020-12-08 10:18:20
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 17:32:42
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
    /*
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
    */
   // 除了获取动态的内容和创建者 还要获取动态的评论列表，以及评论的用户 评论所属的标签
// IF(expr1,expr2,expr3) 类似于三目运算符 expr1为真的话返回expr2的结果 否则返回expr3的结果
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content',c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 
            'user',JSON_OBJECT('id', cu.id, 'name', cu.name))
        ),NULL) comments,
        IF(COUNT(l.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
        ),NULL) labels 
      FROM moment m 
      LEFT JOIN user u ON m.user_Id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id 
      LEFT JOIN user cu ON c.user_id = cu.id 
      LEFT JOIN moment_label ml ON ml.moment_id = m.id 
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `
    try {
      const [result] = await connection.execute(statement,[id])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }
  // 获取动态列表
  // 除了返回动态信息之外 还要返回评论个数和标签个数
  async getMomentList(offset, size) {
    // 增加评论个数字段commentCount
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount 
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

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result[0] ? true : false;
  }
  
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES(?, ?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}
module.exports = new MomentService()