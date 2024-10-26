const express = require("express")
const Task = require("../model/Task")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const User = require("../model/User")
require("dotenv").config()
exports.signup = async(req,res)=>{
    try {
        const {username,password,email}= req.body;
        if(!username || !password || !email){
            return res.status(400).json({
                success:false,
                message:"Data incomplete"
            })
        }
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"email already registered, Please login"
            })
        }
        const hashed = await bcrypt.hash(password,10);
        const newuser = await User.create({email:email,username:username,password:hashed});
        return res.status(200).json({
            success:true,
            message:"Signed up successfully ,please login"
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while signing",
            error:error.message
        })
    }
}
exports.login = async(req,res)=>{
    try {
        const {password,email}= req.body;
        if(!password || !email){
            return res.status(400).json({
                success:false,
                message:"Data incomplete"
            })
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"email not  registered, Please Signup"
            })
        }
        const check = await bcrypt.compare(password,user.password);
       
        if(!check){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect for this email"
            })
        }

        const token = jwt.sign({
            username:user.username,
            email:user.email,
        },process.env.JWT_SECRET,{
            expiresIn:"2h",
           
        })

       return res.cookie("token",token,{
        maxAge: 5 * 60 * 60 * 1000,
        httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
    sameSite: 'None' 
        
           
        }).status(200).json({
            success:true,
            message:"Logged in successfully"
        })


    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while signing",
            error:error.message
        })
    }
}



exports. logout=async(req,res)=>{
    try{
      res.cookie("token","",{maxAge:0}).json({
        message:"Logged out successfully"
      });
      
    }
    catch(error){
         res.status(400).json({
            message:error.message
         })
    }
}
