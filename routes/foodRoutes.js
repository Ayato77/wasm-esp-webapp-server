const express = require("express");
const app = express();
const foodModel = require("../models/Food");

app.use(express.json());

//GET data
app.get("/foods", async(req, res) => {
    //get all data in the DB
    const foods = await foodModel.find({});

    try{
        res.send(foods);
    } catch {
        res.status(500).send(err);
    }
});

//POST data
app.post("/food", async(req, res) => {
    //post single data
    const food = new foodModel(req.body);

    try{
        await food.save();
        res.send(food);
    } catch (err){
        res.status(500).send(err);
    }
});

//Modification by ID
app.patch("/food/:id", async(req, res) => {
    //patch data
    try{
        await foodModel.findByIdAndUpdate(req.params.id, req.body);
        await foodModel.save();
    } catch (err){
        res.status(500).send(err);
    }
});

//Delete by ID
app.delete("/food/:id", async(req, res) => {
    //patch data
    try{
        await foodModel.findByIdAndDelete(req.params.id);
    } catch (err){
        res.status(500).send(err);
    }
});

module.exports = app;