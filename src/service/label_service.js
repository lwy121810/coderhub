/*
 * @Author: lwy
 * @Date: 2020-12-11 10:46:31
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-11 16:28:08
 * @FilePath: /coderhub/src/service/label_service.js
 */
const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES(?);`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }

  async getLabels(size, offset) {
    const statement = `SELECT * FROM label LIMIT ?,?;`
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

}

module.exports = new LabelService()