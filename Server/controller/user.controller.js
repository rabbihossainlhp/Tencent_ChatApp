const TLSSingAPIV2 = require("tls-sig-api-v2");
const axios = require("axios");
const User = require("../models/User");



//helper function to generate userSing
const generateUserSig = (userId)=>{
    const SDKAppID = parseInt(process.env.TRTC_APP_ID);
    const SDKSecreetKey = process.env.TRTC_SECREET;

    if(!SDKAppID || !SDKSecreetKey){
        throw new Error("Someting went wrong to getting SDKAppId or Key");
    }

    const api = new TLSSingAPIV2.Api(SDKAppID,SDKSecreetKey);
    return api.genSig(userId,15552000);
}



// function to create user in Tencent server....
const importUserToTencent = async (userId,username) =>{
    try{
        const SDKAppID = parseInt(process.env.TRTC_APP_ID);
        const adminSig = generateUserSig('administrator');
        const random = Math.floor(Math.round() * 10000000);

        const url = `https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=${SDKAppID}&identifier=administrator&usersig=${adminSig}&random=${random}&contenttype=json`;
        const response = await axios.post(url,{
            "UserID":userId,
            "Username":username || userId,
            "FaceUrl":""
        })
        
        return response.data;

    }catch(err){
        console.log("something went wrong to import user from tencent  "+err);
        throw new Error("something went wrong to import user from tencent  "+err);
    }
}





const loginAndGenerateUserSig = async (req,res) =>{

    try{
        const {userId,username} = req.body;

        if(!userId) return res.status(400).json({
            seccess:false,
            error:"user id is required"
        });

        const user = await User.findOne({userId});
        const newSig = generateUserSig(userId);
        if(!user){
            user = await User.create({
                userID:userId,
                userSig:newSig,
                lastLogin: new Date(),

            })

            //import on tencent server....
            await importUserToTencent(userId,username);
        }
        else{
            user.userSig = newSig;
            user.lastLogin = new Date();
            await user.save();
        }

        return res.status(200).json({
            success:true,
            user:{
                userId:user.userID,
                userSig:user.userSig
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"server error during login",
            error:err
        })
    }
    
}



module.exports = {loginAndGenerateUserSig};