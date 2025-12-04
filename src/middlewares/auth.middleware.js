const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodPartner.model')
const userModel = require('../models/user.model')
const authFoodPartnerMiddleware = async(req,res,next)=>{
  const token = req.cookies.token;

  // if token not exists it means they are not registered nor login
  if(!token){
    return res.status(401).json({message : "Unauthorized access,Please Login First"})
  }

  // verify token valid or not
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // decoded.id contains userId from JWT
    const foodPartner = await foodPartnerModel.findById(decoded.id)

    // 🔹 Fetch user from DB & attach to req
    req.foodPartner = foodPartner;

    next();
  }
  catch(err){
    return res.status(401).json({
      message : "Invalid token"
    })
  }
}

const authUserMiddleware = async (req, res, next) => {
  // get the token
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access,Please Login First" });
  }

  // verify token valid or not
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // access id from jwt
    const user = await userModel.findById(decoded.id);
    //  Attach the user object to req so route handlers can access req.user instead of re-querying.
        req.user = user;
    
      next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  authFoodPartnerMiddleware,authUserMiddleware
}