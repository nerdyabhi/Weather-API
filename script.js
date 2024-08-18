const weatherCity = document.querySelector('.weather_city');
const weatherTime = document.querySelector('.weather_date_time');
const weatherForecast = document.querySelector('.weather_forecast');
const weatherIcon = document.querySelector('.weather_icon');

const weatherTemperature = document.querySelector('.weather_temperature');
const weatherMinTemp = document.querySelector('.weather_min');
const weatherMax = document.querySelector('.weather_max');
const weatherFeelsLike = document.querySelector('.weather_feelsLike');
const weatherHumidity = document.querySelector('.weather_humidity');
const weatherWind = document.querySelector('.weather_wind');
const weatherPressure = document.querySelector('.weather_pressure');
const searchField = document.querySelector('.weather_search');

// Country code to Country name
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

// Fix Dates;

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const getDate = (date) => {
  const currDate = new Date(date * 1000); // convert seconds to milliseconds

  const formatedDate = new Intl.DateTimeFormat('en-us', options);
  // console.log(formatedDate);
  return formatedDate.format(currDate);
};

//  API CALL
async function getWeather(city) {
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c146e9ba863a795712e4f497d0baac65`;

  try {
    const response = await fetch(API);
    const data = await response.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;
    weatherCity.innerText = `${name} , ${getCountryName(sys.country)}`;
    weatherTemperature.innerHTML = `${Math.round(main.temp - 273)}&#176`;
    weatherTime.innerText = getDate(dt);
    weatherMinTemp.innerHTML = `Min : ${Math.round(main.temp_min - 273)}&#176`;
    weatherMax.innerHTML = `Max : ${Math.round(main.temp_max - 273)}&#176`;
    weatherFeelsLike.innerHTML = `${Math.round(main.feels_like - 273)}`;
    weatherHumidity.innerHTML = `${Math.round(main.humidity)}`;
    weatherWind.innerHTML = `${wind.speed}`;
    weatherPressure.innerHTML = `${main.pressure}`;
    weatherForecast.innerHTML = `${weather[0].main}`;
    let iconurl = 'http://openweathermap.org/img/w/' + weather[0].icon + '.png';

    weatherIcon.innerHTML = `<img src = ${iconurl}>`;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', () => {
  getWeather('kolkata');
});
// Search functionality
searchField.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let cityName = document.querySelector('.city_name').value;
  //   console.log(cityName.valeue);

  getWeather(cityName);
});
