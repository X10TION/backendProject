const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    reg:{
        type:String,
    // unique: [true, "reg must be a unique field"],
   // require: [true, 'please provide you student registration id']
    },
    fullname:{
            type:String
    },
    department:{
        type:String
    },
    password:{
        type:String
    },
    accounttype:{
        type: String,
        require: true
//         default:"publice"
    },
    email:{
        type:String
    },
    profilePicture:{
        type:String
    },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    lastLogin: Date,
    accountype:String
},{
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)
