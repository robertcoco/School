require("dotenv").config()
const path = require("path")

module.exports = {
    renderPath: path.join(__dirname, "views"),
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
}
