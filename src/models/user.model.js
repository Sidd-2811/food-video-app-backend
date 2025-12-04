const {model,Schema} = require('mongoose')

const userSchema = new Schema({
  fullName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
  },
},
{
  timestamps : true
})

const userModel = model("User",userSchema);

module.exports = userModel