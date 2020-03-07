const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')
const bcrypt = require('bcrypt')
const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    user_password: xss(user.user_password),
    email: xss(user.email),
    baby_id: user.baby_id
})

usersRouter
    .route('/users')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
        .then(users => {
            res.json(users.map(serializeUser))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { username, user_password, email } = req.body
        const newUser = { username, user_password, email }
        // validate values are in req.body
        for (const [key, value] of Object.entries(newUser))
            if (value == null) 
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                })

        UsersService.addNewUser(
            req.app.get('db'),
            newUser
        )
        .then(user => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${user.id}`))
            .json(serializeUser(user))
        })
        .catch(next)
    })

usersRouter
    .route('/users/:user_id')
    .all((req, res, next) => {
        UsersService.getUserById(
            req.app.get('db'),
            req.params.user_id
        )
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: { message: `User doesn't exist` }
                })
            }
            res.user = user
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { username, user_password, email } = req.body
        const userToUpdate = { username, user_password, email }
        const numOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain username, user_password, or email`
                }
            })
        UsersService.updateUser(
            req.app.get('db'),
            req.params.user_id,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

usersRouter
    .route('/login/:username')
    .all((req, res, next) => {
        UsersService.getUserByUsername(
            req.app.get('db'),
            req.params.username
        )
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: { message: `User doesn't exist` }
                })
            }
            res.user = user
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.username
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { username, user_password, email } = req.body
        const userToUpdate = { username, user_password, email }
        const numOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain username, user_password, or email`
                }
            })
        UsersService.updateUser(
            req.app.get('db'),
            req.params.username,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    }) 
    
    
module.exports = usersRouter;