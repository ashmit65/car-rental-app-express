const mongoose = require("mongoose") 
const BookingSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Field is Mendatory"]
    },
    email:{
        type:String,
        required:[true,"Email Field is Mendatory"]
    },
    phone:{
        type:String,
        required:[true,"Phone Field is Mendatory"]
    },
    car:{
        type:String,
        required:[true,"Car Field is Mendatory"]
    },
    pickUp:{
        type:String,
        required:[true,"Pick Up Field is Mendatory"]
    },
    drop:{
        type:String,
        required:[true,"Drop Field is Mendatory"]
    },
    pickUpDate:{
        type:String,
        required:[true,"Pick Up Date Field is Mendatory"]
    },
    date:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    }
})

const Booking = new mongoose.model("Booking",BookingSchema)

module.exports = Booking