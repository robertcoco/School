const fs = require("fs")
const path = require("path")

function GetGqlFile(fileName) {
    const filePath = path.join(__dirname, `../graphql/${fileName}.gql`)

    try {
        const result = fs.readFileSync(filePath, {encoding: "utf-8"})
        return result
    } catch(err) {
        console.log(`Reading Error: ${err}`)
        return ""
    }
}

module.exports = GetGqlFile