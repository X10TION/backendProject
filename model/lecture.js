const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema =  new Schema({
    courseTitle:String,
    courseCode:String,
    department:String,
    classType:String,
    scheduleTime:String,
    scheduleDate:String,
    passcode:Number,
},
{
    timestamps: true
})
module.exports = mongoose.model('schedule', scheduleSchema)