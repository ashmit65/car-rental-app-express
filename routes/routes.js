// MVC

const router = require("express").Router()
const {encoder} = require("../middleware/bodyParsers")


const {homePage,aboutPage,servicePage,featurePage,testimonialPage,contactPage,contactStorePage,notFoundPage,carPage,bookingPage,bookingStorePage, bookingConfirmation} = require("../controller/frontController")

const AdminHomeRouter = require("./adminRoutes/AdminRoutes")

router.get("/", homePage)
router.get("/booking", bookingPage)
router.post("/booking", encoder, bookingStorePage)
router.get("/about", aboutPage)
router.get("/service",servicePage)
router.get("/features", featurePage)
router.get("/cars", carPage)
router.get("/testimonials", testimonialPage)
router.get("/contact", contactPage)
router.post("/contact",encoder, contactStorePage)
router.get("/booking-confirmation", bookingConfirmation)



//Admin Routes
router.use("/admin", AdminHomeRouter)

// Error
router.use(notFoundPage)


module.exports = router