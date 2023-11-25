//Schema user model
const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const UserModel = mongoose.model('UserModel',userSchema);
module.exports = UserModel;

 