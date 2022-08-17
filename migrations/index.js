const { GetDbConn } = require("../db")
const SCHOOLS = require("./Schools")
const USERS = require("./Users")
const STUDENTS = require("./Students")

const OPERATIONS = {
    async schools() {
        const conn = await GetDbConn()
        console.log("Inserting Data...")
        const inserted = await conn.collection("schools").insertMany(SCHOOLS)
        console.log("Inserted docs: ", inserted)
        process.exit()
    },

    async students() {
        const conn = await GetDbConn()
        console.log("Inserting Data...")
        const inserted = await conn.collection("students").insertMany(STUDENTS)
        console.log("Inserted docs: ", inserted)
        process.exit()
    },

    async users() {
        const conn = await GetDbConn()
        console.log("Inserting Data...")
        const inserted = await conn.collection("users").insertMany(USERS)
        console.log("Inserted docs: ", inserted)
        process.exit()
    }
}

function main() {
    const operationName = process.argv.slice(2)[0]
    if(typeof operationName === "undefined") {
        throw new Error("Any argumments were pass. The proccess can not continue")
    }

    const operation = OPERATIONS[operationName]
    if(typeof operation === "undefined") {
        throw new Error("Operation does not exits")
    }

    operation()
}

main()