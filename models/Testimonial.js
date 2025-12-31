const mongoose = require("mongoose") 
const TestimonialSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Field is Mendatory"]
    },
    message:{
        type:String,
        required:[true,"Message Field is Mendatory"]
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

const Testimonial = new mongoose.model("Testimonial",TestimonialSchema)

module.exports = Testimonial