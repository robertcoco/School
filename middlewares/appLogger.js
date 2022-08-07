function requestLogger(req, res, next) {
    console.log(`request to: ${req.originalUrl}`)
    next()
}

function errorLogger(err, req, res, next) {
    console.log("Application Error:")
    console.log(err)
    next(err)
}

module.exports = { requestLogger, errorLogger }