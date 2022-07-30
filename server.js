const router = require("./routes/router")
const express = require("express")
const path = require("path")

const app = express()
const port = process.env.PORT || 3000

// app config
app.use( express.static(path.join(__dirname, "public")) )
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

app.listen(port, ()=> {
    console.log(`Listening on: http://localhost:${port}/`)
})