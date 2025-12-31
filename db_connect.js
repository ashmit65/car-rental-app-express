const mongoose = require("mongoose")


async function getConnect() {
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is Connected")
    }catch(error) {
        console.log(error)
    }
}
getConnect()



// mongoose.connect("mongodb://127.0.0.1:27017/cental")
// .then(()=>{
//     console.log("Database Connected")
// })
// .catch((error)=>{
//     console.log(error)
// })