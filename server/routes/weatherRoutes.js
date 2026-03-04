const express=require('express');
const axios=require('axios');

const Weather=require("../models/weather");
require("dotenv").config()
const router=express.Router();



router.post("/fetch/:city", async (req, res) => {
    try {
        const city = req.params.city.toLowerCase();

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weatherData = {
            city,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].description,
            windSpeed: data.wind.speed,
            timeStamp: data.dt,
            fullResponse: data
        };

        const saved = await Weather.findOneAndUpdate(
            { city: city },        
            weatherData,           
            { 
                new: true,         
                upsert: true,      
                runValidators: true
            }
        );

        console.log('weatherData',weatherData)
        res.json(saved);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Get latest record from DB

router.get("/latest",async(req,res)=>{
    try{
        const latest=await Weather.findOne().sort({createdAt:-1});
        if(!latest){
            return res.status(404).json({message:"No weather data found" });

        }
        res.json(latest);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports=router;
