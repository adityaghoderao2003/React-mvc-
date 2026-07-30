const usermodel = require('../models/Userschema');
const bcrypt = require('bcrypt');

const register = async(req,res)=>{
    try{
        const {name , password , email , username} = req.body;

        //existig usse
        const existinguser = await usermodel.findOne({email});

        if(existinguser){
            return res.status(400).json({
                success : false,
                message : "User already registered"
            })
        }

        const hashpwd = await bcrypt.hash(password , 12);
        //save in document
        const user = new usermodel({
            name ,
            email , 
            username ,
            password : hashpwd
        })
        await user.save()
        
      res.status(201).json({
            success : true,
            message : 'User registered successfull'
        });
    }catch(err){
        res.status(500).json({
      success: false,
      message: err.message
    });
    }
};
module.exports = { register };