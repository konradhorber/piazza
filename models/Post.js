// manage packages
const mongoose = require("mongoose");

// define mongoDB post schema
const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        min:1,
        max:80
    },
    topic:{
        type:[String],
        require:true
    },
    message:{
        type:String,
        require:true,
        min:1,
        max:280
    },
    postOwner:{
        type:String,
        require:true
    },
    registrationTime:{
        type:Date,
        default:Date.now
    },
    expirationTime:{
        type:Date,
        default:function() {
            return Date.now() + 120000;// now + 2 minutes
        }
    },
    live:{
        type:Boolean,
        default: true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    comments:{
        type:[String]
    }
});

// export model for app
module.exports=mongoose.model("posts",postSchema);