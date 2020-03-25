const path = require('path')
const express = require('express')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonParser = express.json()
// const { requireAuth } = express.json()

usersRouter
    .post('/', jsonParser, (req, res, next) => {
        const { username, user_password, email } = req.body

        for (const field of ['username', 'user_password', 'email'])
            if(!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field} in request body`
                })

            const passwordError = UsersService.validatePassword(user_password)
            if (passwordError)
                return res.status(400).json({ error: passwordError })

                UsersService.hasUserWithUserName(
                    req.app.get('db'),
                    username
                )
                    .then(hasUserWithUserName => {
                        if (hasUserWithUserName)
                            return res.status(400).json({ error: `Username already taken` })

                            return UsersService.hashPassword(user_password)
                                .then(hashedPassword => {
                                    const newUser = {
                                        username,
                                        user_password: hashedPassword,
                                        email,
                                        date_created: 'now()',
                                    }

                                    return UsersService.insertUser(
                                        req.app.get('db'),
                                        newUser
                                    )
                                        .then(user => {
                                            console.log('running insertUser:', user);
                                            
                                            res
                                                .status(201)
                                                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                                .json(UsersService.serializeUser(user))

                                                console.log('server response:', res);
                                                
                                        })
                                })
                    })
                    .catch(next)
    })

usersRouter
    .route('/:username')
    // .all(requireAuth)
    .all(checkUsernameExists)
    .get((req, res) => {
        res.json(UsersService.serializeUser(res.user))
    })

// async/await syntax for promises
async function checkUsernameExists(req, res, next) {
    try {
        const user = await UsersService.getByUsername(
            req.app.get('db'),
            req.params.username
        )

        if (!user)
            return res.status(404).json({
                error: `User does not exist`
            })

            res.user = user
            next()
    } catch (error) {
        next(error)
    }
}

module.exports = usersRouter