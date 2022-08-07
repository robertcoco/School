require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const UseRouters = require("./utils/useRouter")
const { requestLogger, errorLogger } = require("./middlewares/appLogger")

const port = process.env.PORT || 3000

const app = express()

// app config
app.use( express.static(path.join(__dirname, "/public")) )
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Global Middlewares
app.use(cors())
app.use(requestLogger)

// Set Routers
UseRouters(app)

// error middlewares
app.use(errorLogger)

app.listen(port, ()=> {
    console.log(`Listening on: http://localhost:${port}/`)
})
