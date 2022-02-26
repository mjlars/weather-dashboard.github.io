const apiKey = '902dfe72fb5ea965cc54e93864dcdc1e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric';

// DOM elements
const submitButton = document.getElementById('city-search');
const temperature = document.getElementById('temp');
const cityWindSpeed = document.getElementById('wind');
const cityHumidity = document.getElementById('humidity');
const uvIndex = document.getElementById('uv-index');
const savedCities = [];
const searchCities = document.getElementsByTagName('saved-cities');
const cityName = document.getElementById('city-name-date');

const temperature1 = document.getElementById('temp1');
const cityWindSpeed1 = document.getElementById('wind1');
const cityHumidity1 = document.getElementById('humidity1');
const uvIndex1 = document.getElementById('uv-index1');
const cityName1 = document.getElementById('city-name-date1');
const icon1 = document.getElementById("img1");

const temperature2 = document.getElementById('temp2');
const cityWindSpeed2 = document.getElementById('wind2');
const cityHumidity2 = document.getElementById('humidity2');
const uvIndex2 = document.getElementById('uv-index2');
const cityName2 = document.getElementById('city-name-date2');

const temperature3 = document.getElementById('temp3');
const cityWindSpeed3 = document.getElementById('wind3');
const cityHumidity3 = document.getElementById('humidity3');
const uvIndex3 = document.getElementById('uv-index3');
const cityName3 = document.getElementById('city-name-date3');

const temperature4 = document.getElementById('temp4');
const cityWindSpeed4 = document.getElementById('wind4');
const cityHumidity4 = document.getElementById('humidity4');
const uvIndex4 = document.getElementById('uv-index4');
const cityName4 = document.getElementById('city-name-date4');

const temperature5 = document.getElementById('temp5');
const cityWindSpeed5 = document.getElementById('wind5');
const cityHumidity5 = document.getElementById('humidity5');
const uvIndex5 = document.getElementById('uv-index5');
const cityName5 = document.getElementById('city-name-date5');

// moment.js
var today = moment().format('MMMM Do YYYY');
console.log(moment());
document.getElementById('date-today').append(today);

if(localStorage.getItem('cities') != null) {
    savedCities = JSON.parse(localStorage.getItem('cities'));
    console.log(savedCities);
    for (let i=0; i < savedCities.length; i++) {
        var button = document.createElement('button');
        button.innerHTML = savedCities[i];
        button.classList.add('saved-cities');
        button.addEventListener('click', weatherApi);
        searchCities.appendChild(button);
    }
};

submitButton.addEventListener('click', weatherApi);

function weatherApi (e) {
    e.preventDefault();
    console.log(e);

    if(e.target.nodeName == 'BUTTON') {
        console.log('button clicked');
        var city = e.target.innerText;
    }
    else {
        var city = document.getElementById('city-input').value;
    }
    if (savedCities.includes(city)) {
        console.log('city already exists');
    } else if (city.trim() == '') {
        return;
    } else {
        savedCities.push(city);
    }

    cityName.innerHTML = city;


    localStorage.setItem('cities', JSON.stringify(savedCities));
    const eachCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(eachCityUrl).then(function(res) {
        if(res.ok) {
            res.json().then(function(data) {
                temperature.innerHTML = 'Temperature: ' + data.main.temp + '&deg;F';
                cityWindSpeed.innerHTML = 'Wind Speed: ' + data.wind.speed + ' MPH';
                cityHumidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';
                const latitude = data.coord.lat;
                const longitude = data.coord.lon;
                const coordinateUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

                fetch(coordinateUrl).then(function(res) {
                    if(res.ok) {
                        res.json().then(function(data) {

                            uvIndex.textContent = 'UV Index: ' + data.current.uvi;
                            const icon = data.current.weather[0].icon;
                            const iconUrl = `openweathermap.org/img/wn/${icon}@2x.png`;

                            temperature1.innerHTML = 'Temperature: ' + data.daily[1].temp.max + '&deg;F';
                            cityWindSpeed1.innerHTML = 'Wind Speed: ' + data.daily[1].wind_speed + ' MPH';
                            cityHumidity1.innerHTML = 'Humidity: ' + data.daily[1].humidity + '%';
                            uvIndex1.textContent = 'UV Index: ' + data.daily[1].uvi;
                            cityName1.innerHTML = city;
                            img1.src = iconUrl;

                            temperature2.innerHTML = 'Temperature: ' + data.daily[2].temp.max + '&deg;F';
                            cityWindSpeed2.innerHTML = 'Wind Speed: ' + data.daily[2].wind_speed + ' MPH';
                            cityHumidity2.innerHTML = 'Humidity: ' + data.daily[2].humidity + '%';
                            uvIndex2.textContent = 'UV Index: ' + data.daily[2].uvi;
                            cityName2.innerHTML = city;
                            img2.src = iconUrl;

                            temperature3.innerHTML = 'Temperature: ' + data.daily[3].temp.max + '&deg;F';
                            cityWindSpeed3.innerHTML = 'Wind Speed: ' + data.daily[3].wind_speed + ' MPH';
                            cityHumidity3.innerHTML = 'Humidity: ' + data.daily[3].humidity + '%';
                            uvIndex3.textContent = 'UV Index: ' + data.daily[3].uvi;
                            cityName3.innerHTML = city;
                            img3.src = iconUrl;

                            temperature4.innerHTML = 'Temperature: ' + data.daily[4].temp.max + '&deg;F';
                            cityWindSpeed4.innerHTML = 'Wind Speed: ' + data.daily[4].wind_speed + ' MPH';
                            cityHumidity4.innerHTML = 'Humidity: ' + data.daily[4].humidity + '%';
                            uvIndex4.textContent = 'UV Index: ' + data.daily[4].uvi;
                            cityName4.innerHTML = city;
                            img4.src = iconUrl;

                            temperature5.innerHTML = 'Temperature: ' + data.daily[5].temp.max + '&deg;F';
                            cityWindSpeed5.innerHTML = 'Wind Speed: ' + data.daily[5].wind_speed + ' MPH';
                            cityHumidity5.innerHTML = 'Humidity: ' + data.daily[5].humidity + '%';
                            uvIndex5.textContent = 'UV Index: ' + data.daily[5].uvi;
                            cityName5.innerHTML = city;
                            img5.src = iconUrl;
                        })
                    }
                })
            })
        }
    })
}

console.log(JSON.parse(localStorage.getItem("cities")));
console.log(savedCities.length);