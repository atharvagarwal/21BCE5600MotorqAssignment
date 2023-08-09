const User = require('../model/userSchema');
const express = require('express')
const bcrypt=require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const app = express();
app.use(express.json());
app.use(cookieParser())
exports.userCreate= async(req, res) => {
    try{
     const {email,password,role}=req.body;
     //validation
     if(!(email && password && role)) {
     //after send code does not run again 
       res.status(500).send('ALL FIELDS ARE REQUIRED');
     }
 
     else{const existingUser=await User.findOne({email})
     if(existingUser){
         res.status(500).send("USER ALREADY EXISTS")
     }
     else{
         //since we encrypt password using algorithms hence we need to add await sign
 
         let myEncPassword=await bcrypt.hash(password,10)
         let user = await User.create({email:email.toLowerCase(),password:myEncPassword,role:role.toLowerCase()})
         
         const token =jwt.sign(
             {user_id:user._id,email},
             "SecretKey",
             {
                 expiresIn:"7d"
             }
             )
             user.token=token;
             //since passoword is undefined it does'nt show up on the frontend.
             user.password=undefined
             res.status(201).json(user);
     }
 }
    }
    catch(err){
     console.log(err);
    }}
 
exports.userLogin= async(req,res)=>{
     try{
         const {email,password} = req.body
         if(!email && !password){
             res.status(500).json("Field is missing")
         }
         else{
             const user=await User.findOne({email})
             if(!user){
             res.status(500).json("You are not registered in the Database")
 
             }
             const comparePassword=await bcrypt.compare(password,user.password)
             if(user&&comparePassword){
                 const token=jwt.sign({
                     user_id:user.id,email
                 },"SecretKey",
                 {
                     expiresIn:"7d",
                 }
 
                 )
                 user.token=token
                 user.password=undefined
                 //res.status(200).json(user)
                 //if you want to use cookies only use web
                 
                 // if you want to use cookies
                 const options={
                     expires:new Date(Date.now()+3*24*3600*1000),
                     httpOnly:true,
                     //allow cookie to be read by backend only not on the frontend server
                 };
                 //some applications can't handle cookies so we add json response
                 res.status(200).cookie('token',token,options).json({
                  success:true,
                  token:token,
                  user:user
                 })
             }
             else{
                 res.status(500).json("Authentication Not Successful")
             }
         }
     }
     catch(err){
         console.log(err)
     }
 }

exports.logout = async(req,res)=>{
    cookie = req.cookies;
          res.cookie('token', '', {expires: new Date(0)});
          res.status(200).json({success:true});
}