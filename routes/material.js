const express = require('express')
const upload = require('../middleware/fileUpload')
const cloudinary = require('../middleware/cloudinary')
const material = require('../model/material')
const router = express.Router()

/////////////////COURSES ROUTE
router.post('/material', upload.single('image'), async(req, res) => {
        try{
            const materialresult = await cloudinary.uploader.upload(req.file.path)
            // res.json(result)
            let materialAttach = material({
                content:req.body.content,
                attach:materialresult.secure_url,
                materialType: req.body.materialType,
                cloudinary_id:materialresult.public_id,
                pages:materialresult.pages,
                created_at:materialresult.created_at,
                format:materialresult.format,
                courseCode:req.body.courseCode,
            });
            await materialAttach.save()
            res.status(201).json(materialAttach)
        }catch(err){
            console.log("err")
        }
})


router.get('/material/:courseCode', async(req,res) => {
        const { courseCode } = req.params
        material.find({courseCode}).exec((err, data) => {
            if(err) console.log(err);
            res.status(200).json(data)
        })
})

router.delete('/material/:id', async(req, res) => {
    try{
            let matt = await material.findById(req.params.id)
            console.log(matt)
            await cloudinary.uploader.destroy(matt.cloudinary_id)
            await matt.remove()
            res.json({
                msg: "Great!  successfully deleted resource!"
            })
    }catch(err){
        // res.send('<h1>Can not delete the material</h1>')
        console.log(err)
    }
})

module.exports = router