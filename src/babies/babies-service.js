const xss = require('xss')
const Treeize = require('treeize')

const userFields = [
    'user.id AS user:id',
    'user.username AS user:username',
    'user.user_password AS user:user_password',
    'user.email AS user:user_email',
    'user.date_created AS user:date_created',
    'user.date_modified AS user:date_modified',
    'user.baby_id AS user:baby_id'
]

const BabiesService = {
    getAllBabies(db) {
        return db
            .from('user_babies AS baby')
            .select(
                'baby.id',
                'baby.baby_name',
                'baby.about',
                'baby.image_url',
                'baby.total_score',
                'baby.total_votes',
                'baby.date_created',
                ...userFields
            )
            .leftJoin(
                'users AS user',
                'user.baby_id',
                'user.id'
            )
            .groupBy('baby.id', 'user.id')
    },
    getById (db, id) {
        return BabiesService.getAllBabies(db)
            .where('baby.id', id)
            .first()
    },
    serializeBabies(babies) {
        return babies.map(this.serializeBaby)
    },
    serializeBaby(baby) {
        const babyTree = new Treeize()

        // Some light hackiness to allow for the fact that `treeize`
        // only accepts arrays of objects, and we want to use a single
        // object.
        const babyData = babyTree.grow([baby]).getData()[0]

        return {
            id: babyData.id,
            baby_name: xss(babyData.baby_name),
            about: xss(babyData.about),
            image_url: xss(babyData.image_url),
            total_score: Number(babyData.total_score),
            total_votes: Number(babyData.total_votes),
            // user: babyData.user || {}
        }
    },
    updateBaby(db, id, newBabyFields) {
        return BabiesService.getAllBabies(db)
            .where('baby.id', id)
            .update(newBabyFields)
            .then(([baby]) => baby)
    }
}

module.exports = BabiesService 