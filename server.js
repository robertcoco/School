const router = require("./routes/router")
const express = require("express")
const path = require("path")
const { create } = require("express-handlebars")

const port = process.env.PORT || 3000
const viewsDir = path.join(__dirname, "views/default")

const app = express()
const hbs = create({
    extname: "hbs",
    layoutsDir: `${viewsDir}/layouts`,
    defaultLayout: "index"
})

// app config
app.use( express.static(path.join(__dirname, "public")) )
app.set("view engine", "hbs")
app.engine("hbs", hbs.engine)
app.set('views', viewsDir)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

app.listen(port, ()=> {
    console.log(`Listening on: http://localhost:${port}/`)
})
