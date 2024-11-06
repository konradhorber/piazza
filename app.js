// package management
const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

require("dotenv").config();


// app initialization
const app = express();

app.use(bodyParser.json());

// routes
const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);


app.get("/", (req,res) =>{
    res.send("test app running");
});

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log("DB is connected");
});

app.listen(80);