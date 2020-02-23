
const mongoose =require('mongoose');
var bcrypt = require('bcrypt');


const tokenKey = module.exports = '7x0jhxt&quot;9(thpX6';
// Database Schema
    const userSchema = new mongoose.Schema({
        firstName: {
            type:String,
            required:true

        },
        lastName: {
            type:String,
            required:true

        },
            email: {
                type:String,
                unique:true,
                index:true,
                required:true

            },
            mobileNumber: {
                type:String,
                required:true
    
            },
            university: {
                type:String,
                required:true
    
            },
            address_1: {
                type:String,
                required:true
    
            },
    
            
            userName: {
                type:String,
                unique:true,
                index:true,
                required:true

            },
            password: {
                type:String,
                required:true
            },
            resetPasswordToken:{
                type:String
            },
            resetPasswordExpires:{
                type:Date
            }
    });


    //Logic for hashing password before saving to database
    userSchema.pre('save', function(next){
            const user = this;
            if(!user.isModified('password')){
                return next();
            }
            bcrypt.genSalt(10,(err,salt)=>{

                if(err){
                    return next(err);
                }
                bcrypt.hash(user.password,salt,(err,hash)=>{
                    if(err){
                        return next(err);
                    }
                    user.password = hash;
                    next();
                });

            });
    });

    //logic for comparing password
    userSchema.methods.comparePassword = function(candidatePassword){
        const user = this;
        return new Promise((resolve,reject)=>{
            try {
                bcrypt.compare(candidatePassword,user.password,(err, isMatch)=>{
                    if(err){
                        return reject(err);
                    }
                    if(!isMatch){
                        return reject(err);
                     }
                    resolve(true);
                });
            } catch (error)  {
                console.log(error);
            }
        });
        

    }

    mongoose.model('User', userSchema);