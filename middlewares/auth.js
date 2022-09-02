const jwt = require("jsonwebtoken")
const config = require("../config")

function Authentication(req, res, next) {
    const headerAuth = req.get("Authorization")
    if(!headerAuth) {
        req.isAuthen = false
        return next()
    }

    const sentToken = headerAuth.split(" ")[1]
    if(!sentToken || sentToken.length < 1) {
        req.isAuthen = false
        return next()
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(sentToken, config.secretKey)
    }catch(err) {
        console.log("Check JWT: ", err)
        req.isAuthen = false
        return next()
    }

    if(!decodedToken || decodedToken.length < 1) {
        req.isAuthen = false
        return next()
    }

    req.isAuthen = true
    req.loginData = decodedToken
    next()
}

module.exports = { Authentication }
