const { GetDbConn } = require("../db")
const { ObjectId } = require("mongodb")

class School {
    static async get(id) {
        const conn = await GetDbConn()
        return conn.collection("schools").findOne({_id: ObjectId(id)})
    }

    static async create() {

    }
}

module.exports = { School }
