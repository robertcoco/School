const express = require("express")
const { renderPath } = require("../config")

const router = express.Router()

router.get(['/', '/home'], (req, res)=> {
    res.sendFile(`${renderPath}/Home.html`)
})

router.get('/login', (req, res)=> {
    res.sendFile(`${renderPath}/Login.html`)
})

router.get('/create', (req, res)=> {
    res.sendFile(`${renderPath}/Create.html`)
})

module.exports = router
