const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Restaurant Schema
const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area:{
        type:Number
    },
    location_id: {
        type: Number,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    
    },
    thumb: {
        type: Array,
        required: true
    },
    aggregate_rating: {
        type: Number,
        required: true
    },
    rating_text: {
        type: String,
        required: true
    },
    min_price: {
        type: Number,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    cuisine: {
        type: Array,
        
    },
    image:{
        type:String,
        required:true
    },
    mealtype_id:{
        type:Number,
        required:true

    },
    itemList:{
        type:Array
    },
    lat:{
        type:Number
    },
    lng:{
        type:Number
    }

})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.restaurant || mongoose.model('restaurant', RestaurantSchema);