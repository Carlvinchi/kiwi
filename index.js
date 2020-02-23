const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

const crypto = require('crypto');

    require('./models/user');
    const requireToken = require('./middleware/requireToken');
    const authRoutes = require('./routes/authRoutes');
    const User = mongoose.model('User');
    app.use(bodyParser.json());
    app.use(authRoutes);

    const PORT = 3000;
    //Database configuration

    const dbURL = 'mongodb://localhost/main';
    mongoose.connect(dbURL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true
    });

    mongoose.connection.on('connection',()=>{
    console.log('connected to db');
    });
    mongoose.connection.on('error',(err)=>{ 
    console.log('this error', err);
    });

    app.post('/',(req,res)=>{
        console.log(req.body);
        res.send('hello');
    });
    app.get('/', requireToken,(req,res)=>{
            res.send({
                email:req.user.email,
                userId: req.user._id,
                userName:req.user.userName  
            });
    });
        //Pulling user details from the databse, using the user token generated

    app.get('/profile', requireToken,(req,res)=>{
        res.send({
            email:req.user.email,
            userId: req.user._id,
            University: req.user.university,
            userName:req.user.userName
        });
});


        //Server configuration
    app.listen(PORT,()=>{
        console.log('Server running on port '+ PORT);

    });