const AdminRouter = require("express").Router()

const AdminUserRouter = require("./AdminUserRoutes")
const AdminHomeRouter = require("./AdminHomeRoutes")
const AdminTestimonialRouter = require("./AdminTestimonialRoutes")
const AdminCarRouter = require("./AdminCarRoutes")
const AdminContactRouter = require("./AdminContactRoutes")
const AdminBookingRouter = require("./AdminBookingRoutes")




AdminRouter.use("/", AdminHomeRouter)
AdminRouter.use("/users", AdminUserRouter)
AdminRouter.use("/testimonial", AdminTestimonialRouter)
AdminRouter.use("/car", AdminCarRouter)
AdminRouter.use("/contact", AdminContactRouter)
AdminRouter.use("/booking", AdminBookingRouter)

module.exports = AdminRouter