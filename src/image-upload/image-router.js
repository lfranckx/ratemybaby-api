const express = require('express')
const imageRouter = express.Router()

const upload = require('./image-upload-service')
const multipleUpload = require('./multiple-upload-service')
// const singelUpload = upload.single('image')

imageRouter.post('/', (req, res) => { upload(req, res, (error) => {
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
        image: imageName,
        location: imageLocation
    })
    
})})

imageRouter.post('/:upload_number', (req, res) => {multipleUpload(req, res, (error) => {
    console.log('files:' req.files);
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

module.exports = imageRouter

    // if (req.files === null) {
    //     return res.status(400).json({ msg: 'No file uploaded'})
    // }

    // const file = req.files.file 

    // file.mv(`${__dirname}/`)


    // singelUpload(req, res, function(err) {
    //     // if (err) {
    //     //     return res.status(422).send({ 
    //     //         errors: [
    //     //             { title: 'File Upload Error', detail: err.message }
    //     //         ] 
    //     //     })
    //     // }
    //     return res.json({'imageUrl': req.file.location})
    // })