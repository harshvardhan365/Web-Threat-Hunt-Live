const mongoose = require('mongoose');
const {stringify} = require(`querystring`);
const addWebsiteSchema = new mongoose.Schema({
    fname:{
        type:"string",
        required:true,
    },
    lname:{
        type:"string",
        required:true,
    },
    cname:{
        type:"string",
        required:true,
    },
    country:{
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
        unique:true,
    },
    phone:{
        type:"Number",
        required:true,
        maxlength:10,
        minlength:10,
    },
    website:{
        type:"string",
        required:true,
    }
});

const addWebsiteCollection = mongoose.model('addWebsiteCollection', addWebsiteSchema);
module.exports = addWebsiteCollection;
