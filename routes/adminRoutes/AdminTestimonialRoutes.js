const {superAdminChecker, isLogin} = require("../../middleware/roleCheckerMiddleware")
const {encoder}  = require("../../middleware/bodyParsers")
const {testimonialsUploader} = require("../../middleware/multiMiddlerware")

const AdminTestimonialRouter = require("express").Router()


const {home, create, store, remove, edit, update} = require("../../controller/admin/TestimonialController")

AdminTestimonialRouter.get("/",isLogin, home)
AdminTestimonialRouter.get("/create",isLogin,create)
AdminTestimonialRouter.post("/store",isLogin,testimonialsUploader.single("pic"),encoder,store)
AdminTestimonialRouter.get("/delete/:_id",isLogin, encoder, remove)
AdminTestimonialRouter.get("/edit/:_id",isLogin, encoder, edit)
AdminTestimonialRouter.post("/update/:_id",isLogin,testimonialsUploader.single("pic"), encoder, update)

module.exports = AdminTestimonialRouter