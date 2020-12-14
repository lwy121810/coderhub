/*
 * @Author: lwy
 * @Date: 2020-12-14 17:33:06
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-14 18:40:45
 * @FilePath: /coderhub/src/service/file_service.js
 */
const connection = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES(?,?,?,?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new FileService()