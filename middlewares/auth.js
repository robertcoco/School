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

function AuthenticationViews(req, res, next) {
    const headerAuth = req.get("Cookie")
    if(!headerAuth) {
        req.isAuthen = false
        return next()
    }

    const sentCookies = headerAuth.split(";")
    if(!sentCookies || sentCookies.length < 1) {
        req.isAuthen = false
        return next()
    }

    const jwtCookie = sentCookies.filter((cookie) => !!cookie.match("jwt"))[0]
    if(!jwtCookie) {
        req.isAuthen = false
        return next()
    }

    const sentToken = jwtCookie.split("=")[1].trim()
    if(!sentToken) {
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


function CheckAuthenAndRedirect(req, res, next) {
    if (!req.isAuthen && !req.path.match('login')) {
        return res.redirect("/login")
    }

    next()
}

module.exports = { Authentication, CheckAuthenAndRedirect, AuthenticationViews }
