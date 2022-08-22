const express = require('express')
const schedulelecture = require('../model/lecture')
const router = express.Router()

/////////////////COURSES ROUTE
router.post('/schedule', async(req, res) => {
    let max = 17
    let min = 27

   let passcode = Math.floor(Math.random() * (max - min) + min * 1000);
 
        console.log(passcode)
        try{
            // res.json(result)
            let schedule = schedulelecture({
                courseTitle:req.body.courseTitle,
                courseCode:req.body.courseCode,
                department:req.body.department,
                classType:req.body.classType,
                scheduleTime:req.body.time,
                scheduleDate:req.body.date,
                passcode,
                createdBy:req.body.createdBy
            });
            await schedule.save()
            res.status(201).json(schedule)
        }catch(err){
            console.log(err)
        }
})


router.get('/schedule/:courseCode', async(req,res) => {
        const { courseCode } = req.params
        schedulelecture.find({courseCode}).exec((err, data) => {
            if(err) console.log(err);
            res.status(200).json(data)
        })
})



module.exports = router
