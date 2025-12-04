const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodPartner.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// for User 
const registerUser = async(req,res)=>{
  const {fullName,email,password} = req.body;
  // console.log(fullName,email,password)

  // if user is already exists or not
  const isUserAlreadyExisted = await userModel.findOne({
    email
  })

  if(isUserAlreadyExisted){
    return res.status(400).json({
      message:"User already exists"
    })
  }
  // before creating a new user first hashed the passwords
  const hashedPassword = await bcrypt.hash(password,10)

  // create a new user
    const user = await userModel.create({fullName,email,password:hashedPassword});

  // implement jwt authentication
    const token = await jwt.sign({
      id : user._id,
    },process.env.JWT_SECRET)
    
    // save into cookie
    res.cookie("token",token)

    res.status(201).json({
      message : "User Created Successfully",
      user : {
        _id : user._id,
        email : user.email,
        fullName : user.fullName
      }
    })
}

const loginUser = async(req,res)=>{
  const {email,password} = req.body;
  const user = await userModel.findOne({email});

  if(!user){
    res.status(400).json({message : "Invalid email or password"})
  }
                                          // by user,by db
  const isPasswordMatched = await bcrypt.compare(password,user.password)
  if(!isPasswordMatched){
    res.status(400).json({message: "Invalid email or password"})
  }
  // generate token
  const token = await jwt.sign({
    id : user._id,
  },process.env.JWT_SECRET)

  res.cookie("token",token)

  res.status(200).json({
    message : "User logged in successfully",
    user : {
      _id : user._id,
      email : user.email,
      fullName : user.fullName
    }
  })

}

const logoutUser = async(req,res)=>{
  res.clearCookie("token")
  res.status(200).json({
    message : "User logged out successfully"
  })
}

// for FoodPartner
const registerFoodPartner = async(req,res)=>{
  const {name,email,password} = req.body;
  const isFoodPartnerAlreadyExist = await foodPartnerModel.findOne({email})
  if(isFoodPartnerAlreadyExist){
    res.status(400).json({message:"foodPartner already exists"})
  }
  // hashed the password
  const hashedPassword = await bcrypt.hash(password,10);

  // create a new foodPartner 
  const foodPartner = await foodPartnerModel.create({name,email,password:hashedPassword});

  // JWT Authentication
  const token = await jwt.sign({
    id : foodPartner._id
  },process.env.JWT_SECRET)

  // setting the cookie
  res.cookie("token",token)

  res.status(201).json({
    message:"Food Partner registered successfully",
    foodPartner : {
      id:foodPartner._id,
      email:foodPartner.email,
      name:foodPartner.name
    }
  })
}

const loginFoodPartner = async(req,res)=>{
    const {email,password} =  req.body;
    const foodPartner = await foodPartnerModel.findOne({email});

    if(!foodPartner){
      res.status(400).json({message : "Invalid email or password"})
    }

    const isPasswordMatched = await bcrypt.compare(password,foodPartner.password);

    if(!isPasswordMatched){
      res.status(400).json({message : "Invalid email or password"})
    }

    // generate jwt token
    const token = await jwt.sign({
      id:foodPartner._id
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(200).json({
      message:"foodPartner login successfully",
      foodPartner:{
        id : foodPartner._id,
        email:foodPartner.email,
        name:foodPartner.name
      }
    })
}

const logoutFoodPartner = (req,res)=>{
res.clearCookie("token");
res.status(200).json({
  message : "foodPartner logged out successfully"
})
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
}