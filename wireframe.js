const apiKey = "0c5cd3271ca5da27f88448575bac1056";

function getCurrentTemperature(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  function showTemperature(response) {
    fahrenheitTemp = Math.round(response.data.main.temp);

    const cityElement = document.querySelector("#ciudad");
    const temperature = isFahrenheit
      ? fahrenheitTemp
      : showCelsiusTemperature(fahrenheitTemp);
    cityElement.innerHTML = response.data.name;
    const humidityElement = document.querySelector("#humidity");
    const humidity = Math.round(response.data.main.humidity);
    const windElement = document.querySelector("#wind");
    const wind = Math.round(response.data.wind.speed);
    const descriptionElement = document.querySelector("#description");
    const description = response.data.weather[0].description;
    const iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${wind}m/hr`;
    descriptionElement.innerHTML = `${description}`;

    getForecast(response.data.coord);
  }

  axios.get(apiUrl).then(showTemperature);
}

function getCity() {
  const city = document.querySelector("#city-search-box").value;

  console.log("city:", city);

  const currentCity = document.querySelector("#ciudad");
  currentCity.innerHTML = city;

  getCurrentTemperature(city);
}

function getCityViaForm(e) {
  e.preventDefault();
  getCity();
}

function getForecast(coordinates) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showCelsiusTemperature(fahrenheitTemperature) {
  const celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  return Math.round(celsiusTemperature);
}

let isFahrenheit = true;

function toggleTemperature(event) {
  event.preventDefault();

  isFahrenheit = !isFahrenheit;

  temperatureElement.innerHTML = isFahrenheit
    ? showCelsiusTemperature(fahrenheitTemp)
    : fahrenheitTemp;

  toggleTempText();

  toggleForecasts();
}

function toggleTempText() {
  const celsiusElement = document.querySelector("#celsius-link");
  const fahrenheitElement = document.querySelector("#fahrenheit-link");

  celsiusElement.innerHTML = isFahrenheit ? "°C" : "°F";
  fahrenheitElement.innerHTML = isFahrenheit ? "°F" : "°C";
}

function toggleForecasts() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;

  dailyForecasts.forEach(function (dailyForecast) {
    const currentDateTime = dailyForecast.dt * 1000;
    const currentDailyForecastDateTime = new Date(currentDateTime);
    const dailyForecastDay = days[currentDailyForecastDateTime.getDay()];
    const forecastTemps = dailyForecast.temp;
    const forecastMax = forecastTemps.max;
    const forecastMin = forecastTemps.min;
    const forecastMaxConverted = isFahrenheit
      ? Math.round(forecastMax)
      : showCelsiusTemperature(forecastMax);
    const forecastMinConverted = isFahrenheit
      ? Math.round(forecastMin)
      : showCelsiusTemperature(forecastMin);

    forecastHtml =
      forecastHtml +
      `
    <div class="col-2">
      <div><b>${dailyForecastDay}</b></div>
      <div>
        ${forecastMaxConverted}° | <span class="forecast-min">${forecastMinConverted}°</span>
      </div>
    </div>
    `;
  });

  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

getCurrentTemperature("Austin");

const button = document.querySelector("#button-addon2");
button.addEventListener("click", getCity);

const form = document.querySelector("#city-search-form");
form.addEventListener("submit", getCityViaForm);

const now = new Date();
let h3 = document.querySelector("#date");

const date = now.getDate();
const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
const day = days[now.getDay()];
const year = now.getFullYear();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const month = months[now.getMonth()];
const hours = now.getHours();
const minutes = now.getMinutes();

const hoursWithLeadingZeroIfNecessary = ("0" + hours).slice(-2);
const minutesWithLeadingZeroIfNecessary = ("0" + minutes).slice(-2);

h3.innerHTML = `${day}, ${month} ${date} ${year} - ${hoursWithLeadingZeroIfNecessary}:${minutesWithLeadingZeroIfNecessary}`;

function displayForecast(response) {
  console.log("data from api call", response.data);

  const nextEightDaysOfTemperatures = response.data.daily;
  dailyForecasts = nextEightDaysOfTemperatures.slice(1, 7);
  console.log(dailyForecasts);

  toggleForecasts();
}

const temperatureElement = document.querySelector("#current-temperature");

let fahrenheitTemp = null;
let dailyForecasts = [];

const celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toggleTemperature);
