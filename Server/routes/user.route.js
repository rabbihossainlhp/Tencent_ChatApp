const router = require("express").Router();
const {loginAndGenerateUserSig} = require("../controller/user.controller");

router.post("/login",loginAndGenerateUserSig);



//simple test first..
router.get("/",(req,res)=>{
    return res.status(200).json({success:true,message:"route working successfully.!"})
})

module.exports = router;