const mongoose = require('mongoose');
const {stringify} = require(`querystring`);
const contactSchema = new mongoose.Schema
({
    name:{
        type:"string",
    },
    email:{
        type:"string",
        unique:true
    },
    subject:{   
        type:"string"
    },
    message:{
        type:"string"
    }
});
    

const contactCollection = new mongoose.model(`contactus_db`,contactSchema);
module.exports = contactCollection;