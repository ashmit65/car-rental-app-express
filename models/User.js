const mongoose = require("mongoose") 
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Field is Mendatory"]
    },
    username:{
        type:String,
        unique:true,
        required:[true,"User Name Field is Mendatory"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email Field is Mendatory"]
    },
    phone:{
        type:String,
        required:[true,"Number Field is Mendatory"]
    },
    password:{
        type:String,
        required:[true,"Password is Medatory"]
    },
    otp:{
        type:String
    },
    pic:{
        type:String
    },
    role:{
        type:String,
        default:"Admin"
    }
})

const User = new mongoose.model("User",UserSchema)

module.exports = User