const mongoose = require('mongoose');
const { stringify } = require('querystring');
const RegistrationSchema = new mongoose.Schema
({
    name:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        required:true,
        unique:true
    },
    password:{
        type:"string",
        required:true,
        minlength:8,
        maxlength:1000
    },
    confirmpassword:{
        type:"string",
        required:true,
        minlength:8,
        maxlength:1000
    }
    
});

const RegistrationCollection = new mongoose.model(`userRegistration`,RegistrationSchema);
module.exports = RegistrationCollection;