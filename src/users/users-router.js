const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')
const { validatePassword } = require('./validatePassword')
// const { validateUsername } = require('./validateUsername')
const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    user_password: xss(user.user_password),
    email: xss(user.email),
    date_created: user.date_created,
    user_baby: {
        id: user.user_baby.id,
        baby_name: xss(user.user_baby.baby_name),
        about: xss(user.user_baby.about),
        image_url: xss(user.user_baby.image_url),
        total_score: user.user_baby.total_score,
        total_votes: user.user_baby.total_votes,
        userId: user.user_baby.userId
    }
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
        const { username, password, email, user_baby } = req.body
        const newUser = { username, password, email, user_baby }
        for (const [key, value] of Object.entries(newUser))
        if (value == null)
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body`}
            })

        const pwError = validatePassword(password)
        if (pwError) return res.status(400).send(pwError)
        // const unError = validateUsername(username)
        // if (unError) return res.status(409).send(unError)
        

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
    .route('/:user_id')
    .all((req, res, next) => {
        UsersService.getUserById(
            req.app.get('db'),
            req.params.id
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
            req.params.id
        )
        .then(numRowsAfftected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { username, password, email, user_baby } = req.body
        const userToUpdate = { username, password, email, user_baby }
        const numOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain username, password, email, or user_baby`
                }
            })
        UsersService.updateUser(
            req.app.get('db'),
            req.params.id,
            userToUpdate
        )
            .then(numRowsAfftected => {
                res.status(204).end()
            })
            .catch(next)
    })
module.exports = usersRouter;