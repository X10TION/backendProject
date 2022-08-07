const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { findOne } = require('../model/User')
const jwt = require('jsonwebtoken')


const register = async (req, res, next) => {
    const { reg, fullname, department, password, accounttype, email } = req.body
    let existingUser
     try{
        existingUser = await User.findOne({reg:reg})
     }catch(err){
        console.log("Registration fail :" + err)
     }
     if(existingUser){
        return res.status(400).json({msg: "User already exists.  Login Instead.."})
     }
     const hashPassword = bcrypt.hashSync(password)
    var user = new User({
            reg, 
            fullname,
            department,
            password,
            accounttype,
            email,
            password:hashPassword,
            createdOn:Date.now(),
           
    })
        user.modifiedOn = Date.now(),
        user.lastLogin = Date.now()
    if(req.file){
        user.profilePicture = req.file.path
    }
    try{
       
        await user.save()
    }catch(err){
        console.log(err)
    }
    // await res.redirect('/login')
    await res.status(201).json({message : user})   
    
}

const login = async(req, res, next) => {
    const { reg, password} = req.body
    let existingUser
    try{
        existingUser = await User.findOne({reg: reg})
    }catch(err){
        return new Error(err)
    }
    if(!existingUser){
        return res.status.json({msg: "USER NOT FOUND. please signup "})
    }
    const isexistUser = bcrypt.compareSync(password,existingUser.password)
    if(!isexistUser){
        return res.status(400).json({msg: "Invalid reg and  password.."})
    }else{
        const user = await User.find({reg})
        res.status(200).json(user)
    }
    // return res.status(200).json({
    //     msg: "Successfully Login",
    //     user: existingUser, 
    // })
}


//     // next()
// };
// const home = async(req, res, next) => {}
exports.register = register
exports.login = login
// exports.verifyToken = verifyToken