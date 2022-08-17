const config = require("./config")
const { MongoClient } = require("mongodb")

const client = new MongoClient(config.mongoUri)

async function GetDbConn() {
    await client.connect()
    console.log("MongoDB: Connected successfully!")
    return client.db(config.dbName)
}

module.exports = { GetDbConn }