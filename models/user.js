const { GetDbConn } = require("../db")
const { ObjectId } = require("mongodb")

class User {
    static async get(id) {
        const conn = await GetDbConn()
        return conn.collection("users").findOne({_id: ObjectId(id)})
    }
}

module.exports = { User }