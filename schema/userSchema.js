const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userList = new Schema({
    email: {
        type: String,
        required:true
    },
    name: {
        type: String,
        
        required: true,
        
    },
    password: {
        type: String,
        
        required: true,
        

    },
    mobileno: {
        type: Number,
        required: true,
        
    },
    address:{
        type:Object,
        required:true
    },
    role:{
        type:String
    }

})
const User = mongoose.model("Userto", userList, "Userto");
module.exports = User
