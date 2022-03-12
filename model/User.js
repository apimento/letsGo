const mongoose =require("mongoose"); 

const bcrypt = require("bcrypt");  

const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName: { 
        type: String, 
        required: true,
        mainlength: [2, "Must be at least 2 characters long"]
    },
    emailAddress: { 
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true
    },
    password:{
        type: String, 
        required: true, 
        minlength: [6, "Must be at least 6 characters long"]

    }   
})

userSchema.methods.verifyPassword = function(password){ 
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema); 

module.exports = User; 