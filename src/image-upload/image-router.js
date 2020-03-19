const express = require('express')
const imageRouter = express.Router()

const upload = require('./image-upload-service')
const singelUpload = upload.single('image')

imageRouter.post('/image-upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded'})
    }

    const file = req.files.file 

    file.mv(`${__dirname}/`)


    singelUpload(req, res, function(err) {
        // if (err) {
        //     return res.status(422).send({ 
        //         errors: [
        //             { title: 'File Upload Error', detail: err.message }
        //         ] 
        //     })
        // }
        return res.json({'imageUrl': req.file.location})
    })
})

module.exports = imageRouter