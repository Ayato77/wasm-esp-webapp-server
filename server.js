const express = require("express");
const app = express();
const mongoose = require("mongoose");

const foodRouter = require("./routes/foodRoutes")

app.use(foodRouter)

//Connect to database
mongoose.connect(
    "mongodb+srv://guestuser:guestuser@cluster0.epmdxbp.mongodb.net/?retryWrites=true&w=majority"
    ).then(()=> console.log("connecting succeeded."))
    .catch((err)=>console.log(err));

app.listen(3000, () => {
    console.log("Server launched!")
});

