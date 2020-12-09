/*
 * @Author: lwy
 * @Date: 2020-12-08 15:09:54
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-09 17:36:15
 * @FilePath: /coderhub/src/service/auth_service.js
 */
const connection = require('../app/database')

class AuthService {
  // 这里只能检查动态的权限
  async checkMoment(momentId, userId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [momentId, userId])
    return result.length > 0;
  }
  // 通用的检查 （RESTful风格 当所有的表外键关联user表中的id时 外键名称都设置为统一的字段 这里是user_id）
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [id, userId])
    return result.length > 0;
  }
}
module.exports = new AuthService()