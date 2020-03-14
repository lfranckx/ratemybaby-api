const path = require('path')
const express = require('express')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonParser = express.json()
// const { requireAuth } = express.json()

usersRouter
    .post('/', jsonParser, (req, res, next) => {
        console.log('receiving req.body', req.body);
        
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
                                    res
                                        .status(201)
                                        .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                        .json(UsersService.serializeUser(user))
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
        console.log(res.user);
        
        res.json(UsersService.serializeUser(res.user))
    })

// async/await syntax for promises
async function checkUsernameExists(req, res, next) {
    try {
        console.log(req.params.username);
        
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

module.exports = usersRouter;


// user id route
// usersRouter
//     .route('/:user_id')
//     .all(requireAuth)
//     .all(checkUserIdExists)
//     .get((req, res, next) => {
//         res.json(UsersService.serializeUser(res.user))
//     })

// async/await syntax for promises
// async function checkUserIdExists(req, res, next) {
//     try {
//         const user = await UsersService.getByUsername(
//             req.app.get('db'),
//             req.params.user_id
//         )

//         if (!user)
//             return res.status(404).json({
//                 error: `User does not exist`
//             })

//             res.user = user
//             next()
//     } catch (error) {
//         next(error)
//     }
// }
    