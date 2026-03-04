const {Schema,model} = require("mongoose");


const userSchema = new Schema({
    userID:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },

    userSig:{
        type:String,
        required:true,
    },

    createAt:{
        type:Date,
        default:Date.now
    },

    lastLogin:{
        type:Date,
        default:null
    }
},{timestamps:false})


userSchema.index({userId:1});

const user = model("User",userSchema);


module.exports = user;