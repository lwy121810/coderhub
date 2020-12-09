/*
 * @Author: lwy
 * @Date: 2020-11-24 14:29:07
 * @LastEditors: OBKoro1
 * @LastEditTime: 2020-12-09 14:16:04
 * @FilePath: /coderhub/src/service/user_service.js
 */
const connection = require('../app/database')

 class UserService {
   async create(user) {
     // 将user存储到数据库
     const {name, password} = user
     const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
     const result = await connection.execute(statement,[name, password])
     console.log("将user存储到数据库: ", user);
     return result[0]
   }

   async getUserByName(name) {
     const statement = `SELECT * FROM user WHERE name = ?;`
     const res = await connection.execute(statement, [name])
     return res[0]
   }

 }
 module.exports = new UserService()