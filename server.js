const express = require("express"); 

const mongoose = require("mongoose");  

require('dotenv').config()

const expressLayouts = require("express-ejs-layouts"); 

const PORT = 5555; 

const app = express(); 

app.use(express.static("public"));

app.use(expressLayouts);


let session = require("express-session"); 

let passport = require("./help/ppConfig");   

app.use(session({
    //value kept in .env
   secret: process.env.secret, 
   saveUninitialized: true, 
   resave: false,  
   cookie: {maxAge: 360000}
})) 

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(function(req, res, next){ 
    //locals shares info with all pages
    res.locals.currentUser = req.user; 
    next();
})

//IMPORT ROUTES 

//MOUNT ROUTES 

app.set("view engine", "ejs");

mongoose.connect("mongodb:localhost:27107/letsGo" , { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
},
()=> { 
    console.log("mongodb connected successfully!");
});

app.listen(PORT, ()=> console.log(`App is running on ${PORT}`));
