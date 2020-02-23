
const express = require('express');
const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const tokenKey = require('../models/user');
const User = mongoose.model('User');

const nodemailer = require('nodemailer');
require('dotenv').config();

const crypto = require('crypto');

      
//Sign up route
    router.post('/signup',async(req,res)=>{
        console.log(req.body);

        const {firstName, lastName,email, mobileNumber,university, address_1, userName, password,resetPasswordToken,resetPasswordExpires} = req.body;
        try {
            const user = new User({firstName, lastName,email, mobileNumber,university, address_1, userName, password,resetPasswordToken,resetPasswordExpires});
        await user.save();
        const token = jwt.sign({ userId: user._id }, tokenKey);
        res.send({token});  
        } catch (err) {
            res.status(422).send(err.message);
        }   
    }); 


 //Sign in route
 router.post('/signin',async (req,res,next)=>{
    const {email,userName, password} = req.body;

    if(!(email||userName) || !password){
        res.status(422).send({error: "You must provide email or password"});
    }
    
    else{
        const user = ( await User.findOne({email}) || await User.findOne({userName}));

        if(!user){
                    const log = (error)=>{
                        next(error); 
                        res.status(422).send({error: "User not found in database"});
                    }
        }
        try {

            await user.comparePassword(password);
            const token = jwt.sign({userId: user._id }, tokenKey);
            const userID = user._id;
            res.send({token,userID});
            
        } catch (err) {
           
            next(err);
            res.status(422).send({error: "Wrong credentials"});
            
            
            
        }
    }
       
  
    
});


    // Edit profile route
    router.put('/edit',async(req,res)=>{
        console.log(req.body);

        const {firstName, lastName,email, mobileNumber,university, address_1, address_2, userName, password,userID} = req.body;

        const _id = userID
        
        const user =  await User.findOne({_id});
           
       
          console.log(user._id);      
        try {
              
              const updateEmail= (user.email = email);
              //const updateMobileNumber= (user.mobileNumber = mobileNumber);
              //const updateAddrees_1= (user.address_1 = address_1);
             // const updateAddress_2= (user.address_2 = address_2);
             // const updatePassword= (user.password = password);
        await user.save();
        const token = jwt.sign({ userId: user._id }, tokenKey);
        res.send({token});  
        } catch (err) {
            res.status(422).send(err.message);
        }
           
    }); 

    


module.exports = router;