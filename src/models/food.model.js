const {model,Schema, default: mongoose} = require('mongoose')
const { ref } = require('process')

const foodSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  video : {
    type : String,
    required : true,
  },
  description : {
    type : String,
  },
  foodPartner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "foodPartner"
  }
})

const foodModel = model('Food',foodSchema)

module.exports = foodModel