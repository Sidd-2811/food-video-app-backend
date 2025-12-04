// create server

const express = require('express');
const cookieParser = require('cookie-parser')
require("dotenv").config();

const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const app = express();


// server data nhi read kar pata directly isliye iska use karte hai
app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
  res.send("hello world")
})

app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);

module.exports = app;