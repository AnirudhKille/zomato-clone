const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Signup Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);