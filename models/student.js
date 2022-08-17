const { GetDbConn } = require("../db")
const { ObjectId } = require("mongodb")

class Student {
    static async get(id) {
        const conn = await GetDbConn()
        return conn.collection("students").findOne({_id: ObjectId(id)})
    }

    static async getAll() {
        const conn = await GetDbConn()
        return conn.collection("students").find({}).toArray()
    }

    static async create(data) {
        const conn = await GetDbConn()
        return conn.collection("students").insertOne(data)
    }

    static async update(id, data) {
        const conn = await GetDbConn()
        return conn.collection("students")
            .updateOne({_id: ObjectId(id)}, {$set: data})
    }

    static async delete(id) {
        const conn = await GetDbConn()
        return conn.collection("students").deleteOne({_id: ObjectId(id)})
    }
}

module.exports = { Student }
