const express = require("express")
const hbs = require("hbs")
const path = require("path")
require("dotenv").config()
const session = require("express-session")
const MongoStore = require("connect-mongo")

const app = express()

// View engine
app.set("view engine", "hbs")

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Body parser (forms)
app.use(express.urlencoded({ extended: false }))

// Register partials
hbs.registerPartials(path.join(__dirname, "views", "partials"))

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI   // 
  }),
  cookie: { secure: false } 
}))

// Helpers & DB
require("./helpers")
require("./db_connect")

// Routes
const router = require("./routes/routes")
app.use("/", router)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}).on("error", (err) => {
  console.error("Server failed to start:", err)
})







