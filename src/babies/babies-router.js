const express = require('express')
const path = require('path')
const BabiesService = require('./babies-service')
const jsonParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

const babiesRouter = express.Router()

babiesRouter
    .route('/')
    // .all(requireAuth)
    .get((req, res, next) => {
        BabiesService.getAllBabies(req.app.get('db'))
            .then(babies => {
                res.json(BabiesService.serializeBabies(babies))
            })
            .catch(next)
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { baby_name, age, country, about, image_url, total_score, total_votes } = req.body
        const newBaby = { baby_name, age, country, about, image_url, total_score, total_votes }
        newBaby.parent_id = req.user.id
        console.log('inside babies.router.post | line 21 | req.body', newBaby);

        for (const [key, value] of Object.entries(newBaby))
            if (value == null)
                return res.status(400).json({
                    error: `Missing ${key} in request body`
                })
        
        return BabiesService.insertBaby(
            req.app.get('db'),
            newBaby
        )
        .then(baby => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${baby.parent_id}`))
                .json(BabiesService.serializeBaby(baby))
                console.log('inside babies-router postBaby response:', res.body);
                
        })
        .catch(next)
    })

babiesRouter
    .route('/:id')
    .all(requireAuth)
    .all(checkBabyExists)
    .get(requireAuth, (req, res) => {
        console.log('babies-router | line 48 | req:', req);
        res.json(BabiesService.serializeBaby(res.baby))
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        console.log('inside babies.router.PATCH | line 54 | req.body:', req.body);
        const { id, baby_name, age, country, about, image_url, total_score, total_votes, parent_id } = req.body
        const babyToUpdate = { id, baby_name, age, country, about, image_url, total_score, total_votes, parent_id }
        
        const numberOfValues = Object.values(babyToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain id, baby_name, about, image_url, total_score, total_votes, or parent_id`
                }
            })

        console.log('inside babiesRouter.PATCH | line 63 | req.params:', req.params );
        
        BabiesService.updateBaby(
            req.app.get('db'),
            req.params.id,
            babyToUpdate
        )
        .then(numRowsAffected => {
            // console.log(numRowsAffected);
            res.json(numRowsAffected).status(204).end()
        })
        .catch(next)
    })

babiesRouter
    .route('/parent/id')
    .all(requireAuth)
    .all(checkBabiesExists)
    .get(requireAuth, (req, res) => {
        console.log('babies-router | line 85 | req.user:', req.user);
        res.json(BabiesService.serializeBabies(res.babies))
    })

async function checkBabiesExists(req, res, next) {
    try {
        const babies = await BabiesService.getByParentId(
            req.app.get('db'),
            req.user.id
        )
        if (!babies)
            return res.status(404).json({
                error: `Babies don't exist`
            })

            res.babies = babies
            next()
    } catch (error) {
        next(error)
    }
}

async function checkBabyExists(req, res, next) {
    try {
        const baby = await BabiesService.getById(
            req.app.get('db'),
            req.params.id
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