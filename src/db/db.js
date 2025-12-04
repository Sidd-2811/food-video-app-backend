const mongoose = require('mongoose');

const url = process.env.MONGODB_URL


const connectDB = async()=>{
  try{
    await mongoose.connect(url)
    console.log("database connected...")
  }
  catch(err){
    console.log(err)
  }
}

module.exports = connectDB