const { NODE_ENV } = require('./config')

function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'}}
    } else {
        response = { error }
    }
    res.status(500).json(response)
    next()
}

module.exports = errorHandler