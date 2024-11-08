// manage packages
const express = require("express");

// initialize route
const router = express.Router();

// import post schema designed for mongoDB
const Post = require("../models/Post");

router.post("/posts", async(req,res)=>{
    const post = new Post({
        title:req.body.title,
        topic:req.body.topic,
        message:req.body.message,
        postOwner:req.body.postOwner
    });
    try{
        const savedPost = await post.save();
        res.send(savedPost);
    }catch(err){
        res.status(400).send({message:err});
    };
});

module.exports=router;