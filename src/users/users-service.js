const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },
    addNewUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getUserById(knex, id) {
        return knex
            .from('users')
            .select('*')
            .where('id', id).first()
    },
    getUserByEmail(knex, email) {
        return knex
            .from('users')
            .select('*')
            .where('email', email).first()
    },
    getUserByUsername(knex, username) {
        return knex 
            .from('users')
            .select('*')
            .where('username', username).first()
    },
    deleteUser(knex, id) {
        return knex('users')
            .where({ id })
            .delete()
    },
    updateUser(knex, id, newUserFields) {
        return knex('users')
            .where({ id })
            .update(newUserFields)
    }
}

module.exports = UsersService