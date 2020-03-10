const express = require('express')
const BabiesService = require('./babies-service')
const { requireAuth } = require('../middleware/jwt-auth')

const babiesRouter = express.Router()

babiesRouter
    .route('/')
    .get((req, res, next) => {
        BabiesService.getAllBabies(req.app.get('db'))
            .then(babies => {
                res.json(BabiesService.serializeBabies(babies))
            })
            .catch(next)
    })

babiesRouter
    .route('/:baby_id')
    .all(requireAuth)
    .all(checkBabyExists)
    .get((req, res) => {
        res.json(BabiesService.serializeBaby(res.baby))
    })

// async/await syntax for promises
async function checkBabyExists(req, res, next) {
    try {
        const baby = await BabiesService.getById(
            req.app.get('db'),
            req.params.baby_id
        )

        if (!baby)
            return res.status(404).json({
                error: `Baby doesn't exist`
            })
        
            res.baby = baby
            next()
    } catch (error) {
        next(error)
    }
}

module.exports = babiesRouter;