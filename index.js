/*
Author : CHRISTOPHER JOSEPH 
Description: CONNECTED EDUCATION SOFTWare
Date: feb -12-2022
*/

const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/user-routes')
const public = require('./routes/publicResource')
const courses = require('./routes/courses-routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(cors())
/*
*/
app.use('/api/v1', courses)
app.use('/api/v1', router)
app.use('/api/v1', public)

//
const port = process.env.PORT || 5000
mongoose.connect("mongodb+srv://MAUCES:MAUCES@cluster0.bwdex.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    app.listen(port, () => {
        console.log("Database is initializing  from mongodb cloud..")
        console.log("Server is initializing  to port 500...")
    })
}).catch((err) =>{
    console.log("ERROR CONNECTING TO THE SERVER :" + err)
})



