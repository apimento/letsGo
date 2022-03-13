//API's for Authentication  
const User = require('../model/User'); 
// const bcrypt = require('bcrypt');  
const passport = require("passport");
// const salt = 10; 
const {validationResult} = require("express-validator");

//HTTP GET -signUP- to load the signup form  
exports.auth_signup_get = (req, res) => { 
    res.render('auth/signUp');
}

//HTTP POST -signUP-  post signup data 
exports.auth_signup_post = (req, res) => { 
    console.log(req.body); 

    let user = new User(req.body) 
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt); 
    console.log(hash); 

    user.password = hash;

    //Save user 
    user
    .save() 
    .then(()=>{
        res.redirect('auth/signIn');
    })
    .catch((err)=> { 

        if (err.code == 11000){ 
            res.redirect("auth/signIn");
        }
        else 
        { 
            const errors = validationResult(req); 
            if(!errors.isEmpty()){ 
                res.redirect("auth/signUp");
            }
        }

    })
};   


//HTTP GET - singIN- to load signin form 
exports.auth_signin_get = (req, res) => { 
    res.render("auth/signIn");
}

//HTTP POST- singIN- to post data  
exports.auth_signin_post = 
  passport.authenticate("local", { 
       successRedirect:"/homepage", 
       failureRedirect: "auth/signIn",
  })

