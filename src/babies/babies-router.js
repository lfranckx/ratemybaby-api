const express = require('express')
const BabiesService = require('./babies-service')
const jsonParser = express.json()
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
    .all(checkBabyExists)
    .get((req, res) => {
        res.json(BabiesService.serializeBaby(res.baby))
    })
    .patch(jsonParser, (req, res, next) => {
        const { baby_name, about, image_url, total_score, total_votes } = req.body
        const babyToUpdate = { baby_name, about, image_url, total_score, total_votes }
        
        const numberOfValues = Object.values(babyToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain baby_name, about, image_url, total_score, or total_votes`
                }
            })
        
        BabiesService.updateBaby(
            req.app.get('db'),
            req.params.baby_id,
            babyToUpdate
        )
        .then(baby => {
            res
                .status(204)
                .json(BabiesService.serializeBaby(baby))
        })
        .catch(next)
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