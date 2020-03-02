const path = require('path')
const express = require('express')
const xss = require('xss')
const BabiesService = require('./babies-service')

const babiesRouter = express.Router()
const jsonParser = express.json()

const serializeBaby = baby => ({
    id: baby.id,
    baby_name: xss(baby.baby_name),
    about: xss(baby.about),
    image_url: xss(baby.image_url),
    total_score: xss(baby.total_score),
    total_votes: xss(baby.total_votes),
    user_id: baby.user_id
})

babiesRouter
    .route('/babies')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BabiesService.getAllBabies(knexInstance)
        .then(babies => {
            res.json(babies.map(serializeBaby))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { baby_name, about, image_url, total_score, total_votes, user_id } = req.body
        const newBaby = { baby_name, about, image_url, total_score, total_votes, user_id }
        for (const [key, value] of Object.entries(newBaby))
        if (value == null)
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body`}
            })
        
        BabiesService.addNewBaby(
            req.app.get('db'),
            newBaby
        )
        .then(baby => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${baby.id}`))
            .json(serializeBaby(baby))
        })
        .catch(next)
})

babiesRouter
    .route('/babies/:baby_id')
    .all((req, res, next) => {
        BabiesService.getBabyById(
            req.app.get('db'),
            req.params.baby_id
        )
        .then(baby => {
            if (!baby) {
                return res.status(404).json({
                    error: { message: `Baby doesn't exist` }
                })
            }
            res.baby = baby
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeBaby(res.baby))
    })
    .delete((req, res, next) => {
        BabiesService.deleteBaby(
            req.app.get('db'),
            req.params.baby_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { baby_name, about, image_url, total_score, total_votes, user_id } = req.body
        const babyToUpdate = { baby_name, about, image_url, total_score, total_votes, user_id }
        const numOfValues = Object.values(babyToUpdate).filter(Boolean).length
        if (numOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain baby_name, about, image_url, total_score, total_votes`
                }
            })
        BabiesService.updateBaby(
            req.app.get('db'),
            req.params.baby_id,
            babyToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = babiesRouter;