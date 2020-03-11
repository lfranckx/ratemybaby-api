const express = require('express')
const AuthService = require('./auth-service')
const { requireAuth } = require('../middleware/jwt-auth')

const jsonBodyParser = express.json()
const authRouter = express.Router()

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { username, user_password } = req.body
        const loginUser = { username, user_password } 
        
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key} in request body`
                })
        AuthService.getUserWithUsername(
            req.app.get('db'),
            loginUser.username
        )
            .then(dbUser => {
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect username or password'
                    })

                return AuthService.comparePasswords(loginUser.user_password, dbUser.user_password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect username or password',
                            })

                        const sub = dbUser.username
                        const payload = { user_id: dbUser.id }
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                        })
                    })
            })
            .catch(next)
    })

authRouter 
    .post('/refresh', requireAuth, (req, res) => {
        const sub = req.user.username
        const payload = { user_id: req.user.id }
        res.send({
            authToken: AuthService.createJwt(sub, payload),
        })
    })

module.exports = authRouter