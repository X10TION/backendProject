const mongoose = require('mongoose')
const Schema = mongoose.Schema


const publicSchema = new Schema({
    title: String,
    department: String,
    school: String,
    description: String,
    attach:String,
    cloudinary_id:String,
    format:String,
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
},{
    timestamps: true
})
module.exports = mongoose.model('public', publicSchema)
