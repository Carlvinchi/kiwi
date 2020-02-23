const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const tokenKey = require('../models/user');
const User = mongoose.model('User');
//Token authorization logic
module.exports = (req,res,next)=>{
    const { authorization } = req.headers;

    if(!authorization){
       return res.status(401).send({error: "No token found"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,tokenKey, async(err,payload)=>{
        if(err){
            return res.status(401).send({error: "Could not verify token"});
         }
         const {userId} = payload;
         const user = await User.findById(userId);
         req.user = user;
         console.log("Token verified");
         next();
    });
}