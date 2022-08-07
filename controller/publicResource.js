const publicResource =  require('../model/public')
const cloudinary = require('../middleware/cloudinary')
const upload = require('../middleware/fileUpload')
//////////////////// ???SINGLE??? ////////////////////////////
const created = async (req,res) =>{
    // const {title, department, school, description, createdBy } = req.body   
     try{
        const result = await cloudinary.uploader.upload(req.file.path)
            // res.json(result)
            // console.log(result)
    let user =  publicResource({
            title:req.body.title,
            department:req.body.department,
            school:req.body.school,
            description:req.body.description,
            createdBy:req.body.createdBy,
            attach:result.secure_url,
            cloudinary_id:result.public_id,
            format:result.format
        })
        await user.save()
        res.status(201).json(user)
    }catch(err){
        console.log("my error here" + err)}
}
/////////////////////////???? VIEW RESOURCE ?????///////////////////////////////////
const viewed = (req,res) =>{
    publicResource.find().populate('createdBy','fullname department').sort({createAt: 1}).exec((err, posts) =>{
        if(err) console.log(err);
        res.json(posts)
    })
}
//////////////////////??????SINGLE RESOURCE ?????/////////////////
const single = (req, res) => {
        const { id } = req.params
        console.log(req.params.id)
        publicResource.findOne({_id:id}).populate('createdBy', 'fullnam department profilePicture')
          .exec((err, publicResource) =>{
            if(err) console.log(err);
            res.json(publicResource)
})
}
///////////////////?????EDITED??????///////////////////////////////
const edited = (req, res) =>{
    const { id } = req.params;
    const { title, description, department, school} = req.body;
//     const attach = req.file.path
//     if(req.file){
//         publicResource.attach = req.file.path
//         {
    // INSERT THE CLOUDINARY FILE HERE
    publicResource.findOneAndUpdate({_id:id }, { title, description, department, school},{new: true})
    .exec((err,publicResourcex) => {
        if(err) console.log(err)
        res.json(publicResourcex)
    })
}
//////////////////?????? DELETED ???????/////////////////////////////////
const deleted = (req, res) => {
    const { id } = req.params
    // console.log(req.params._id)
    publicResource.findOneAndRemove({_id:id})
    .exec((err, publicResource) =>{
        if(err) console.log(err);
        res.json({
            msg: "Oop! resource has been move to the trash!!"
        })
    })
}
////////////////////?????FILTER ????????///////////////////////////////
const filtered = (req, res) => {
    const { department} = req.params
    publicResource.find({department})
          .exec((err, posts) =>{
            if(err) console.log(err);
            res.json(posts)
})
}
/////////////////////??????? EXPORTED ??????////////////////////////////////////
exports.created = created
exports.viewed = viewed
exports.filtered = filtered
exports.edited = edited
exports.deleted = deleted
exports.single = single
