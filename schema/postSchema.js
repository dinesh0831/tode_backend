const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostList = new Schema({
    email:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    title:{
        type:String
    }

})
const User = mongoose.model("Post",PostList, "Post");
module.exports = User
