const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the MealType Schema
const MealtypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    meal_type:{
        type:Number,
        required:true
    }


})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.mealtype || mongoose.model('mealtype', MealtypeSchema);