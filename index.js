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

// moment.js
var today = moment().format('MMMM Do YYYY');
console.log(moment());
document.getElementById('date-today').append(today);

if(localstorage.getItem('cities') != null) {
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
                    
                })
            })
        }
    })
}

