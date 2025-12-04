const {model,Schema} = require('mongoose')

const foodPartnerSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique:true
  },
  password : {
    type : String,
    required : true
  },
})

const foodPartnerModel = model("foodPartner",foodPartnerSchema)

module.exports = foodPartnerModel