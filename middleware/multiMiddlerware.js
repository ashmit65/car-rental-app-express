const multer = require("multer")

function makeUploader(folderName) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `public/uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        }
    })
    // const upload = multer({ storage: storage })
    // File filter to only allow images
    const fileFilter = (req, file, cb) => {
        // Check if file is an image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'), false)
        }
    }
    
    const upload = multer({ 
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB limit
        }
    })
    return upload
}

module.exports = {
    usersUploader: makeUploader("users"),
    carsUploader: makeUploader("cars"),
    testimonialsUploader: makeUploader("testimonials")
}