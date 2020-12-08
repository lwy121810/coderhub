/*
 * @Author: lwy
 * @Date: 2020-12-08 10:18:20
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-08 14:09:28
 * @FilePath: /coderhub/src/service/moment_service.js
 */
const connection = require('../app/database')
const sqlFrgment = `
    SELECT 
	    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
	    JSON_OBJECT('id',u.id,'name',u.name) user 
    FROM moment m LEFT JOIN user u 
    ON m.user_Id = u.id
`

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?);`
    const [result] = await connection.execute(statement,[content, userId])
    return result
  }
  async getMomentById(id) {
    const statement = `
    ${sqlFrgment}
    WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement,[id])
    return result[0]
  }
  async getMomentList(offset, size) {

    const statement = `
    ${sqlFrgment}
    LIMIT ?,?;
    `
    const [result] = await connection.execute(statement,[offset, size])
    return result
  }
}
module.exports = new MomentService()