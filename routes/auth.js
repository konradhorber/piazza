// manage packages
const express = require("express");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

// intialize route
const router = express.Router();

// import user schema designed for mongoDB
const User = require("../models/User");

// import user validations
const {registerValidation} = require("../validations/register-validation");

// register api
router.post("/register", async(req,res)=>{
    
    // validate user input
    const {error} = registerValidation(req.body);
    if(error){
        res.status(400).send({message:error["details"][0]["message"]});
    };
    
    // check if user exists
    const userExists = await User.findOne({email:req.body.email});
    if(userExists){
        return res.status(400).send({message:"user already exists"});
    };

    // hash password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password,salt);

    // construct user from defined mongoDB model
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    });

    // save user to database
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send({message:err});
    };
});

// export route to app
module.exports=router;