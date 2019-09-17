const mongoose = require('mongoose')

 const Schema = mongoose.Schema

 const shemaUser = new Schema({

     firstName :{
         type : String,
         required: true
     },
     lastName:{
         type: String,
         required: true
     },
     contact: {
         type: String,
         required : true
     },
    adrress:{
         type: String,
         required:   true
    },
    password:{
        type: String,
         required:   true
    },
    status:{
        type : Boolean,
        required: true
    },
    email: {
        type: String,
        require: true
    }
 })
 module.exports = mongoose.model("user", shemaUser)