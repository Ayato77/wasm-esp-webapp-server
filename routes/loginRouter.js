const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport")

//Display login form
app.get("/login", function (req, res) {
    res.render("login");
});
  
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

//registration
//TODO: consider how to provide secured registration
app.post("/register", (req, res) => {
  //TODO: Check duplication of user!!
  User.findOne({"username":req.body.username})
  .then((result)=>{
    if(result!=null){
      console.log(res)
      console.log('This user already exists in Database');
      res.redirect('/');
    }
    else{
      bcrypt.hash(req.body.password, 10, async function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
          username: req.body.username,
          password: hash,
        });
        console.log(newUser);
        await newUser.save();
        res.send("User Created");
      });
    }
    
  })
  .catch((err)=>{
    console.log(err);
  });

});
  
//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      }); 
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

module.exports = app;