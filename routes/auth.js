// manage packages
const express = require("express");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

// intialize route
const router = express.Router();

// import user schema designed for mongoDB
const User = require("../models/User");


// import registration user validations
const {registerValidation} = require("../validations/register-validation");
// register api, add return in validation to cancle process if error
router.post("/register", async(req,res)=>{
    
    // validate user input
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send({message:error["details"][0]["message"]});
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


// import login user validations
const {loginValidation} = require("../validations/login-validation");
// login api, add return if error to cancel request
router.post("/login", async(req,res)=>{
    // validate user input
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send({message:error["details"][0]["message"]});
    }

    // validate if user exists
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send({message:"user does not exists"});
    }

    // check user password
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password);
    if(!passwordValidation){
        return res.status(400).send({message:"Password is wrong"});
    }

    // generate and send back auth token to enable user access
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({"auth-token":token});
});


// export route to app
module.exports=router;