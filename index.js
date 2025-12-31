const express = require("express")
const hbs = require("hbs")
const path = require("path")
require("dotenv").config()
const session = require("express-session")
const MongoStore = require("connect-mongo")

const app = express()
app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "public"))) // this line is  used to set path of public folder which contains cs, js and images

// Parse URL-encoded bodies (for form POSTs like /admin/login)
app.use(express.urlencoded({ extended: false }))
// If you also send JSON from clients, you can enable this too:
// app.use(express.json())

// Register partials
hbs.registerPartials(path.join(__dirname, "views", "partials"))
console.log("Partials registered");
app.use(express.static("public")) // use this line to server public folder

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    }),
    cookie: { secure: false }
  }))

require("./helpers/index.js")
require("./db_connect")

//MVC
const router = require("./routes/routes")
app.use("",router)


app.listen(8000, () => {
    console.log(`Server is running at http://localhost:8000`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});



















// app.get("/about",(req,res)=>{
//     res.render("aboutPage", {title:"About US"})
// })
// app.get("/service",(req,res)=>{
//     res.render("servicePage",{title:"Service"})
// })
// app.get("/features",(req,res)=>{
//     res.render("featurePage",{title:"Features"})
// })
// app.get("/cars",(req,res)=>{
//     res.render("carsPage",{title:"Cars"})
// })
// app.get("/team",(req,res)=>{
//     res.render("teamPage",{title:"Team"})
// })
// app.get("/testimonials",(req,res)=>{
//     res.render("testimonialPage",{title:"Testimonials"})
// })
// app.get("/contact",(req,res)=>{
//     res.render("contact",{title:"Contact Us"})
// })
// app.use((req,res)=>{
//     res.render("404", {title:"404! Page Not Found"})
// })
