const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service')
const {v4:uuid} = require("uuid")
const createFood = async(req,res)=>{
 
  // upload file from postman to server than server goes to imagekit and generates a url so that we can access that file

  const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid());
  console.log(fileUploadResult)

  // create food Item
  const foodItem = await foodModel.create({
    name : req.body.name,
    description : req.body.description,
    video : fileUploadResult.url,
    foodPartner : req.foodPartner._id
  })

  // 201 when we create a new resource 
  return res.status(201).json({
    message : "food item added successfully",
    food : foodItem 
  })
}

const getFoodItems = async(req,res)=>{
const foodItems = await foodModel.find({});
 res.status(200).json({message:"Food items fetched successfully",foodItems})
}

module.exports = {createFood,getFoodItems}