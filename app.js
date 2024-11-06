const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();


const app = express();

app.get("/", (req,res) =>{
    res.send("test app running");
});

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log("DB is connected");
});

app.listen(80);