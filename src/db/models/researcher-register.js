const mongoose = require('mongoose');
const {stringify} = require(`querystring`);
const ResearcherRegisterschema = new mongoose.Schema
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
        maxlength:100
        },
    confirmpassword:{
        type:"string",
        required:true,
        minlength:8,
        maxlength:100
    }           
});

const ResearcherRegisterCollection = new mongoose.model('researcher_db',ResearcherRegisterschema);
module.exports = ResearcherRegisterCollection;