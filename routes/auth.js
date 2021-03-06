const express = require("express"); 

const{body} = require("express-validator"); 

var methodOverride =require("method-override"); 

const router = express.Router(); 

router.use(methodOverride('_method')) 

router.use(express.urlencoded({extended: true}));

const authCntrl = require("../controllers/auth"); 

router.get("/auth/signUp", authCntrl.auth_signup_get);
router.post("/auth/signUp",[
    body('userName').isLength({min:2}),
    body('emailAddress').isEmail(), 
    body('password').isLength({min:6}).withMessage("Password must be at least 6 charactes long")
], authCntrl.auth_signup_post);


router.get("/auth/signIn", authCntrl.auth_signin_get);  
router.post("/auth/signIn", authCntrl.auth_signin_post); 


module.exports = router;