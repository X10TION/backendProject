const express = require('express')
const { created,viewed, filtered,edited,deleted, single } = require('../controller/publicResource')
const upload = require('../middleware/fileUpload')
// const cloudinary = require('cloudinary')
const router = express.Router()



router.post("/public", upload.single('attach'), created)
router.get('/public', viewed)
router.get('/public/:department', filtered )
router.put('/public/:id', edited)
router.delete('/public/:id', deleted)
router.get('/public/single/:id', single)


module.exports = router
/*
user router
*/
