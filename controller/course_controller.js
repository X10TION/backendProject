const courses = require('../model/courses.model')
const cloudinary = require('../middleware/cloudinary')
const upload = require('../middleware/fileUpload')
///// create course
exports.createcourse = async(req, res) => {
    const { courseTitle, createdBy,reg,courseCode,department,courseContent,classType } = req.body
    // console.log(req.body)
    let existingCourse
    try{
        existingCourse = await courses.findOne({courseCode:courseCode})
    }catch(err){
        res.status(400).json({
            msg: "Oop! Course you are about to create has been created!"
        })
    }
    if(existingCourse){
        return res.status(400).json({msg: "Oop! Course you are about to create has been created!"})
    }
    const course = new courses({
        courseTitle, 
        courseCode,
        department,
        courseContent,
        classType,
        createdBy,
        reg,
    })
    try{
        await course.save()
    }catch(err){
        console.log("creating courses fail", err)
    }
    return res.status(201).json({
        msg:"Course created successfully",
        course
    })

}

//////EDIT course created
exports.coursesViewed = (req, res) => {
    courses.find({}).exec((err, data) =>{
    if(err) console.log(err)
    res.json(data)
    })
}
///////SINGLE COURSE 
exports.singleCourse = (req, res) => {
    const { id } = req.params;
    console.log(req.params.id);
    courses.findOne({_id:id})
      .exec((err, couses) =>{
        if(err) console.log(err);
        res.json(couses)
})
}
/////// SUSPEND
//////////////////?????? DELETED ???????/////////////////////////////////
exports.deletedCourse = (req, res) => {
    const { id } = req.params
    // console.log(req.params._id)
    courses.findOneAndRemove({_id:id})
    .exec((err, data) =>{
        if(err) console.log(err);
        res.json({
            msg: "Oop! couses has been suspended!!"
        })
    })
}

// //////////// join lecture
exports.lectureJointed = async(req, res) => {
    courses.findById(req.params.id,'joined',
    function(err,courses) {
        if(!err){
            courses.joined.push({
                reg:req.body.reg,
                department:req.body.department,
                started:Date.now()
            })
             courses.save()
            res.status(201).json({
                msg: "successfully join course"
            })
        }
    })
    
}

exports.lectureCreated = async(req, res) => {
    
}

exports.material = async(req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path)
}
