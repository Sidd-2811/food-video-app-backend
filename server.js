// start server

const app = require('./src/app');
require("dotenv").config();

const connectDB = require('./src/db/db')


// database connection
connectDB();

app.listen(3000,()=>{
  console.log("Server is running on http://localhost:3000");
})