const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    condition: {
        type: String,   
        required: true
    },
    windSpeed: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Number,
        required: true
    },
    fullResponse: {
        type: Object,  
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Weather", WeatherSchema);