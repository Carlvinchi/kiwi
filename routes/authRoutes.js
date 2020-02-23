
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

//Forgot password route and sending email
router.post('/forgotpassword', async (req, res) => {
    console.log(req.body);

    const { email } = req.body;

    if (!email) {
        res.status(422).send({ error: "You must provide email" });
    }

    const user = await User.findOne({ email });
    if (!user) {

        res.status(422).send({ error: "User not found in database" });
    }


    else {

        const resetToken = crypto.randomBytes(20).toString('hex');
        resetPasswordToken = resetToken;

        try {
            const insertResetPasswordTokenToDatabse = await User.updateOne({ email }, {
                resetPasswordToken: resetPasswordToken,
                resetPasswordExpires: Date.now() + 3600000
            });
            res.send({ message: "Success, email being sent" });
        } catch (err) {
            res.status(422).send(err.message);
        }



        //Testing mail
        const myEmail = process.env.EMAIL;
        const myPassword = process.env.PASSWORD;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPassword
            },
            tls: {
                rejectUnauthorized: false
            }

        });

        const mailOptions = {
            from: myEmail,
            to: email,
            subject: 'Password Reset Link',
            text: `Hello ${user.userName}, you requested to reset your password. Below is the link to reset your password. \n\n`
                + `http://localhost:3000/reset?resetToken=${resetToken} \n\n`
        }



        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.log("Erro has ocurred", err);
                res.json({ error: "Email not sent" });
            }
            else {
                console.log("email sent!");
                return res.json('sent ooooooo');


            }
        });

        //Testing mail
    }

});

//Update password via reset link
router.put('/reset/', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({

        resetPasswordToken: req.query.resetToken,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });

    if (!user) {
        console.log("Password reset link is invalid or expired");
        res.json('Link expired');
    }

    else {
        // let user = await User.findOne({email});

        console.log("User found eeeeeeh");

        try {

            const updatePassword = (user.password = password);
            const updateResetPasswordToken = (user.resetPasswordToken = '');
            const updateResetPasswordExpires = (user.resetPasswordExpires = null);

            await user.save();
            const token = jwt.sign({ userId: user._id }, tokenKey);
            res.send({
                token,
                message: 'paasword changed!'
            });

        } catch (error) {
            res.status(422).send(error.message);
        }

    }



});

// It is not in use 
router.get('/reset/', async (req, res) => {

    let user = await User.findOne({

        resetPasswordToken: req.query.resetToken,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });

    if (!user) {
        console.log("Password reset link is invalid");
        res.json('Link expired');
    }
    else {
        res.status(200).send({
            username: user.userName,
            message: 'Password reset link ok'
        });
        console.log("Link working");

    }

});





module.exports = router;