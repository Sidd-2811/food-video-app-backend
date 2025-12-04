const express = require('express')
const router = express.Router();
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require("multer");

const upload = multer({
  storage : multer.memoryStorage()
})

/*  POST : /api/food/  protected */
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)

/*  GET : /api/food/  protected */
// this api is for users so when they scroll they need videos to watch and that videos can be accessed by this api route
router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems)
module.exports = router