     //---------------------------------------------------------- 
      const express = require('express');
        const bodyParser = require('body-parser');
        const mongoose = require('mongoose');
        const router = express.Router();
        const app = express();
        const path = require('path');
        require('./models/user');
        const requireToken = require('./middleware/requireToken');
        const authRoutes = require('./routes/authRoutes');
        const User = mongoose.model('User');
    //---------------------------------------------------------------

    app.use(bodyParser.json());
    app.use(authRoutes);
    app.use('public',express.static('./public'));
    app.use(express.static(path.join(__dirname, 'public')));
    //------------------------------------------------------------------
    
    //Database configuration
    //------------------------------------------------------------------
    const PORT = 3000;
    const dbURL = 'mongodb://localhost/nodeauth';
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
    //testing backend server
    //----------------------------------------------------------------------
    app.post('/',(req,res)=>{
        console.log(req.body);
        res.send('hello');
    });
    
    //-------------------------------------------------------------------------
   

        //Server configuration
    //-----------------------------------------------------------------------------
    app.listen(PORT,()=>{
        console.log('Server running on port '+ PORT);

    });