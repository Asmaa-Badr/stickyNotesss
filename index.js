const bodyParser = require('body-parser');
const { Console } = require('console');
const express = require('express');
const mongodb=require('mongodb');
const mongoose=require('mongoose');
const path=require('path');
const app=express()
app.set('view engine','ejs')
app.set('views','views')
app.use(bodyParser.urlencoded({ extended: true }));
const url='mongodb://localhost:27017/test'

let userSchema=new mongoose.Schema({
  name:String,
  message:String
})
let User=mongoose.model('user',userSchema)
app.get('/', (req,res,next)=>{
res.render('index',{
  users:[]
})
})
app.get('/show', async(req,res,next)=>{
  try {
    await mongoose.connect(url);
    let users = await User.find();
    mongoose.disconnect();
    res.render('show', {
      users: users
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  })


app.post('/',bodyParser.urlencoded ({extended:true}),async (req,res)=>{
  try{
    await mongoose.connect(url)
    let  asmaa= await new User({
     name:req.body.name,
     message:req.body.message
    }) 
    await asmaa.save()
      mongoose.disconnect()
      res.redirect('/')
  
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})
app.listen(3000,()=>{
  console.log("you are on port 3000")
})
