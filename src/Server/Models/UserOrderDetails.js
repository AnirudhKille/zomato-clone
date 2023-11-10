const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Restaurant Schema
const UserOrderDetailsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    postaddress:{
        type:String,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    
    orderdetails: {
        type: Array,
        required: true
    },
   

})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.orderdetails || mongoose.model('orderdetails', UserOrderDetailsSchema);