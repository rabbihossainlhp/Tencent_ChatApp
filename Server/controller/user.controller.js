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