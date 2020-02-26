const logger = require('../logger')

const NO_ERRORS = null

function validatePassword({ password }) {
    const requirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.value.match(requirements) && password.length > 6) {
        return NO_ERRORS
    }
    return (logger.error(`Invalid password: '${password}' supplied`),
        { error: {
                message: `Invalid password: '${password}' supplied`
            }
        })
}

module.exports = {
    validatePassword
}