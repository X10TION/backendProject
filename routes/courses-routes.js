const express = require('express')
const { createcourse, coursesViewed,material,lectureCreated,lectureJointed, singleCourse, deletedCourse }= require('../controller/course_controller')
const upload = require('../middleware/fileUpload')
const router = express.Router()

/////////////////COURSES ROUTE
router.post('/courses', createcourse)
router.get('/courses', coursesViewed)
router.get('/course/:id', singleCourse)
router.delete('/course/:id', deletedCourse)
router.post('course/material', upload.single('material'), material)

//////////////////// LECTURE ROUTE
router.post('/lecture/:id', lectureJointed)
router.post('lectures', lectureCreated)

module.exports = router