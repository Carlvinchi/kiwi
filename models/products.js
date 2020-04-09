const mongoose = require ('mongoose');

    const productSchema =  new mongoose.Schema({

       
        category:{
            type:String,
            require:true
        },
        title:{
            type:String,
            require:true
        },
       
        description:{
            type:String,
            require:true
        },
        price:{
            type:String,
            require:true
        },
        images:{
            type:String
        },
        contact:{
            type:String,
            require:true
        },
        dateCreated:{
            type:Date
        },
        _user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
});