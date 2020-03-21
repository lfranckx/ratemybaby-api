const express = require('express')
const uploadRouter = express.Router()

const upload = require('./upload-service')
const multipleUpload = require('./upload-multiple-service')

uploadRouter
    .post('/', (req, res) => { upload(req, res, (error) => {
        console.log('request:', req);
        console.log('request ok:', req.file);
        console.log('error:', error);

        if(error) {
            console.log('errors:', error);
            res.json({ error: error })
        } 
        if (req.file === undefined) {
            console.log('Error no file selected');
            res.json({ error: 'No file selected' })
        }
        
        const imageName = req.file.key
        const imageLocation = req.file.location
        res.json({
            image_name: imageName,
            image_url: imageLocation
        })
        
    })})

uploadRouter
    .post('/multiple', (req, res) => {multipleUpload(req, res, (error) => {
        console.log('files:', req.files);
        if ( error ) {
            console.log( 'errors', error )
            res.json( { error: error } )
        }
        if (req.files === undefined) {
            console.log('Error: No file selected')
            res.json({ error: 'No file selected' })
        }
        const files = req.files
        let locationsArray = []
        files.map(file => {
            let fileLocation = file.location
            locationsArray.push(fileLocation)
        })
        res.json({
            files: files,
            locationsArray: locationsArray
        })
    })})

module.exports = uploadRouter