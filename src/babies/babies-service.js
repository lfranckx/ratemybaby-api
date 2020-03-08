const xss = require('xss')
const Treeize = require('treeize')

const BabiesService = {
    getAllBabies(knex) {
        return knex.select('*').from('user_babies')
    },
    addNewBaby(knex, newBaby) {
        return knex
            .insert(newBaby)
            .into('user_babies')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getBabyById(knex, id) {
        return knex
            .from('user_babies')
            .select('*')
            .where('id', id).first()
    },
    deleteBaby(knex, id) {
        return knex('user_babies')
            .where({ id })
            .delete()
    },
    updateBaby(knex, id, newBabyFields) {
        return knex('user_babies')
            .where({ id })
            .update(newBabyFields)
    }
}

module.exports = BabiesService