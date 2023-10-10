import React, { useEffect, useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humiity_icon from '../Assets/humidity.png';


const WeatherApp = () => {
    const [city,setCity] = useState('calicut');
    const [wicon,setWicon] = useState(cloud_icon)

    let api_key = "fbdc8c16820f7236efa8a2c5c4f1c1df";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

    const search = async ()=>{
        const value = document.getElementsByClassName('cityInput');

        if(value[0].value === ''){
            console.log("Is empty");
        }else{
            fech()
        }
    }
    const fech = async ()=>{
        let response = await fetch(url);
        let data = await response.json();
        const wind = document.getElementsByClassName("wind-Speed");
        const location = document.getElementsByClassName("weather-location");
        const temp = document.getElementsByClassName("weather-temp");
        const humidity = document.getElementsByClassName("humidity-percent");
        wind[0].innerHTML = data.wind.speed + " km/h";
        humidity[0].innerHTML = data.main.humidity + "%";
        location[0].innerHTML = data.name;
        temp[0].innerHTML = data.main.temp + "°C";

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clear_icon)
        }else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWicon(cloud_icon)
        }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWicon(drizzle_icon)
        }else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWicon(drizzle_icon)
        }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWicon(rain_icon)
        }else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setWicon(rain_icon)
        }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWicon(snow_icon)
        }else{
            setWicon(clear_icon)
        }
    }
    useEffect(() => {
        fech()
    }, []);
    
    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text"  
                className='cityInput' 
                placeholder='Search'
                onChange={(e) => setCity(e.target.value)}
                />
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="Icon" />
                </div>
            </div>
            <div className='weahter-image'>
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">

                <div className="element">
                    <img src={humiity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent wind-Speed">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherApp