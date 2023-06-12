const mongoose = require('mongoose');
const { stringify } = require('querystring');
const UserProblem = new mongoose.Schema
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
    mobile:{
        type:"string",
        required:true,
        unique:true,
    },
    message:{
        type:"string",
        required:true
    },
    selector:{
        type:"string",
        enum:['Cyber Bully','Ransomware Attack','Osint Search','Fraud']
    }
    
});

const User_problemCollection = new mongoose.model(`userProblemdetails`,UserProblem);
module.exports = User_problemCollection;