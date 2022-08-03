require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const router = require("./routes/router")

const port = process.env.PORT || 3000

const app = express()

// app config
app.use( express.static(path.join(__dirname, "/public")) )
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/", router)

app.listen(port, ()=> {
    console.log(`Listening on: http://localhost:${port}/`)
})
