// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const currentDate =  document.querySelector(".date")
const humidity = document.querySelector(".humidity")
const pressure = document.querySelector(".pressure")
const tempMax = document.querySelector(".temp-max")
const tempMin = document.querySelector(".temp-min")
const wind = document.querySelector(".wind")
const date = document.querySelector(".date")
const time = document.querySelector(".time")



// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.main.humidity;
            weather.pressure = data.main.pressure;
            weather.tempMin = Math.floor(data.main.temp_min - KELVIN);
            weather.tempMax = Math.floor(data.main.temp_max -KELVIN);  
            weather.wind = data.wind.speed
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    humidity.innerHTML = `Humidity: ${weather.humidity}`;
    pressure.innerHTML = `Pressure: ${weather.pressure} mbar`;
    tempMax.innerHTML = `Temp Max: ${weather.tempMax}°<span>C</span> `;
    tempMin.innerHTML = `Temp Min: ${weather.tempMin}°<span>C</span>`;
    wind.innerHTML = `Wind: ${weather.wind}km/h N`;
    date.innerHTML = `${newDate} ${dateArr}, ${newMonth}`
    time.innerHTML = `${hrMin}`
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

// Post the Date in the UI
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dateArr = new Date().getDay();
let newDate = days[dateArr];
console.log(newDate)

const month =['January', 'February', 'March', 'April', 'May', 'June, July', 'August', 'September', 'October', 'November', 'December' ];
let monthArr = new Date().getMonth();
const newMonth = month[monthArr];
console.log(month[monthArr])

const hour = new Date().getHours()
const minutes = new Date().getMinutes()
let hrMin = `${hour}:${minutes}`
console.log(`${hour}:${minutes}`)