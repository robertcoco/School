const { GetDbConn } = require("../db")
const { ObjectId } = require("mongodb")

class User {
    static async get(id) {
        const conn = await GetDbConn()
        return conn.collection("users").findOne({_id: ObjectId(id)})
    }

    static async findBy(filter) {
        if(typeof filter !== "object" && !(Object.keys(filter).length > 0)) {
            throw new Error("Filter is not a valid object or it is empty")
        } 

        const conn = await GetDbConn()
        return conn.collection("users").findOne(filter)
    }
}

module.exports = { User }