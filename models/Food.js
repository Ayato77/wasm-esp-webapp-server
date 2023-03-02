const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //delete white space
        lowercase: true
    },
    calories: {
        type: Number,
        defalut: 0,
        validate(value){
            if(value < 0){
                throw new Error("calorie must be positive value!!")
            }
        }
    }
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;