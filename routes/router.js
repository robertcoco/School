const express = require("express")
const { renderPath } = require("../config")
const { CheckAuthenAndRedirect, AuthenticationViews } = require("../middlewares/auth")

const router = express.Router()

router.get('/login', (req, res)=> {
    res.sendFile(`${renderPath}/Login.html`)
})

router.get(['/', '/home'], AuthenticationViews, CheckAuthenAndRedirect, (req, res)=> {
    res.sendFile(`${renderPath}/Home.html`)
})

router.get('/create', AuthenticationViews, CheckAuthenAndRedirect, (req, res)=> {
    res.sendFile(`${renderPath}/Create.html`)
})

router.get('/students',AuthenticationViews, CheckAuthenAndRedirect, (req, res)=> {
    res.sendFile(`${renderPath}/Students.html`)
})

router.get('/edit',AuthenticationViews,  CheckAuthenAndRedirect, (req, res)=> {
    res.sendFile(`${renderPath}/Edit.html`)
})

module.exports = router
