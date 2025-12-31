const { isLogin} = require("../../middleware/roleCheckerMiddleware")
const {encoder}  = require("../../middleware/bodyParsers")
const {carsUploader} = require("../../middleware/multiMiddlerware")

const AdminCarRouter = require("express").Router()


const {home, create, store, remove, edit, update} = require("../../controller/admin/CarController")

AdminCarRouter.get("/",isLogin, home)
AdminCarRouter.get("/create",isLogin,create)
AdminCarRouter.post("/store", isLogin, carsUploader.single("pic"),encoder,store)
AdminCarRouter.get("/delete/:_id",isLogin, encoder, remove)
AdminCarRouter.get("/edit/:_id",isLogin, encoder, edit)
AdminCarRouter.post("/update/:_id",isLogin,carsUploader.single("pic"), encoder, update)

module.exports = AdminCarRouter