const passport = require("passport"); 

const LocalStrategy = require('passport-local').Strategy;  

const User = require("../model/User");  

const authCntrl = require("../controllers/auth"); 

passport.serializeUser(function(user, done){ 
    done(null,user.id);
})

passport.deserializeUser(function(id, done){ 
    User.findById(id, function(err,user){ 
        done(err,user);
    })
})

passport.use(new LocalStrategy(
    {
       usernameField: "userName", 
       passwordField: "password"
    },
    function(userName, password, done) { 
        console.log("ppConfig line 23")
      User.findOne({ userName: userName}, function (err, user) { 
        console.log("ppConfig line 23 again")
        if (err) { return done(err); }
        if (!user) { 
            authCntrl.auth_signup_post();
            return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  


module.exports = passport; 