const mongoose = require('mongoose');

//Create Schema
const AdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
});

//Create and instantiate model with schema
const Advertisements = mongoose.model("Advertisements", AdSchema);
module.exports = Advertisements;