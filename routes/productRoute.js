const express = require("express")
const { createFood, getAllFood, updateFood, getByID, deleteFoodById, getByCategory, getFoodbyKeywords, getfilteredData } = require("../controllers/product")
const { verifyAdmin } = require("../utils/verification")
const router = express.Router()

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './views')
    },
    filename: function (req, file, cb) {
     
      cb(null, Date.now() + '_' + file.originalname)
    }
  })

//   const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

  const upload = multer({limits: {
    fieldSize: 1024 * 1024 * 10, // Increase the field size limit (e.g., 10MB)
  }, storage: storage })

router.post("/", verifyAdmin, upload.single('image'), createFood)
router.get("/",getAllFood)
// router.get("/search",getFoodbyKeywords)
// router.get("/filtered",getfilteredData)
//  router.get("/category", getByCategory)
router.put("/:id", verifyAdmin, updateFood)
router.get("/:id",getByID)
router.delete("/:id",verifyAdmin, deleteFoodById)


module.exports= router