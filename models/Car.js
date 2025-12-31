const mongoose = require("mongoose") 
const CarSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Field is Mendatory"]
    },
    rating:{
        type:Number,
        required:[true,"Rating Field is Mendatory"]
    },
    rent:{
        type:Number,
        required:[true,"Rent Field is Mendatory"]
    },
    seatingCapacity:{
        type:Number,
        required:[true,"Seating Capacity Field is Mendatory"]
    },
    mode:{
        type:String,
        required:[true,"Mode Field is Mendatory"]
    },
    fuelType:{
        type:String,
        required:[true,"Fuel Type is Mendatory"]
    },
    pic:{
        type:String,
        required:[true,"Pic Field is Mendatory"]
    },
    active:{
        type:Boolean,
        default:"Admin"
    }
})

const Car = new mongoose.model("Car",CarSchema)

module.exports = Car