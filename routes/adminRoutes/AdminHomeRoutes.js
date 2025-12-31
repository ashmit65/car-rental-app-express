const AdminHomeRouter = require("express").Router()
const {encoder} = require("../../middleware/bodyParsers")
const {usersUploader} = require("../../middleware/multiMiddlerware")
const { isLogin} = require("../../middleware/roleCheckerMiddleware")

const {homePage, login, loginStore, logout, profileUpdate, profileUpdateStore} = require("../../controller/admin/homeController")

AdminHomeRouter.get("/",isLogin,homePage)
AdminHomeRouter.get("/login",login)
AdminHomeRouter.post("/login",encoder, loginStore)
AdminHomeRouter.get("/logout",logout)
AdminHomeRouter.get("/update-profile",isLogin, profileUpdate)
AdminHomeRouter.post("/update-profile",isLogin, encoder,usersUploader.single('Pic'),(err, req, res, next) => {
    // Handle multer errors (file type validation, file size, etc.)
    if (err) {
        if (err.message === 'Only image files are allowed!') {
            return res.redirect("/admin/update-profile?error=Only image files are allowed")
        }
        return res.redirect("/admin/update-profile?error=File upload error")
    }
    next()
}, profileUpdateStore)

module.exports = AdminHomeRouter