const express = require("express");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const bodyParser = require("body-parser")
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const app = express();
const mongoose = require("mongoose");

//Connect to database
mongoose.connect(
    "mongodb+srv://guestuser:guestuser@cluster0.epmdxbp.mongodb.net/?retryWrites=true&w=majority"
    ).then(()=> console.log("connecting succeeded."))
    .catch((err)=>console.log(err));

const loginRouter = require("./routes/loginRouter");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());


//passport configuration
passport.use(
    new localStrategy((username, password, done) => {
        User.findOne({ username: username }).then((err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            });
        })
        .catch((err)=>{console.log(err)});
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id })
    .then((err, user) => {
        const userInformation = {
            username: username.username,
        };
        cb(err, userInformation);
    }).catch((err)=>{
        console.log(err);
    });
});

app.use(loginRouter);

app.listen(3000, () => {
    console.log("Server launched!")
});

