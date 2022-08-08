const mongoose = require('mongoose')
const Schema = mongoose.Schema

const materialSchema =  new Schema({
    content:String,
    materialType:String,
    create_at:Date,
    pages:Number,
    attach:String,
    format:String,
    cloudinary_id:String,
    courseCode:String,
},
{
    timestamps: true
})
module.exports = mongoose.model('meterial', materialSchema)