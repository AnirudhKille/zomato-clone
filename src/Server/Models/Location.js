const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the LocationType Schema
const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id:{
        type:Number,
        required:true
    },
    location_id:{
        type:Number,
        required:true
    },
    country_name:{
        type:String,
        required:true
    }


})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.citie || mongoose.model('citie', LocationSchema);