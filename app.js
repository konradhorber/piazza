const express = require("express");
require("dotenv").config();


const app = express();

app.get("/", (req,res) =>{
    res.send("app running");
});

app.listen(process.env.LOCAL_PORT);