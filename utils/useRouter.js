const routerViews = require("../routes/router")
const routerApi = require("../routes/routerApi")

module.exports = function(app) {
    app.use("/", routerViews)
    app.use("/graphql", routerApi)
}