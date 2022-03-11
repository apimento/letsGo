const router = require('express').Router(); 
const{body} = require("express-validator");

const authCntrl = require("../controllers/auth"); 

router.get("/auth/signup", authCntrl.auth_signup_get);
router.post("/auth/signup",[
    body('userName').isLength({min:2}).notEmpty().withMessage("firtName cannot be null"),
    body('emailAddress').isEmail(), 
    body('password').isLength({min:6}).withMessage("Password must be at least 6 charactes long")
], authCntrl.auth_signup_post);


router.get("/auth/signin", authCntrl.auth_signin_get);  
router.post("/auth/signin", authCntrl.auth_signin_post); 


module.exports = router;