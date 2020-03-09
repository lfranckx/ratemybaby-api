const bcrypt = require('bcryptjs')
const xss = require('xss')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
    hasUserWithUserName(db, username) {
        return db('users')
            .where({ username })
            .first()
            .then(user => !!user)
    },
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return `Password must contain 1 upper case, lower case, number and special character`
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeUser(user) {
        return {
            id: user.id,
            username: xss(user.username),
            user_password: xss(user.user_password),
            email: xss(user.email),
            date_created: new Date(user.date_created),
        }
    },
}

module.exports = UsersService


// const UsersService = {
//     getAllUsers(knex) {
//         return knex.select('*').from('users')
//     },
//     addNewUser(knex, newUser) {
//         return knex
//             .insert(newUser)
//             .into('users')
//             .returning('*')
//             .then(rows => {
//                 return rows[0]
//             })
//     },
//     getUserById(knex, id) {
//         return knex
//             .from('users')
//             .select('*')
//             .where('id', id).first()
//     },
//     getUserByEmail(knex, email) {
//         return knex
//             .from('users')
//             .select('*')
//             .where('email', email).first()
//     },
//     getUserByUsername(knex, username) {
//         return knex 
//             .from('users')
//             .select('*')
//             .where('username', username).first()
//     },
//     deleteUser(knex, id) {
//         return knex('users')
//             .where({ id })
//             .delete()
//     },
//     updateUser(knex, id, newUserFields) {
//         return knex('users')
//             .where({ id })
//             .update(newUserFields)
//     }
// }