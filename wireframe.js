function getCurrentTemperature(cityName) {
  const apiKey = "0c5cd3271ca5da27f88448575bac1056";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  function showTemperature(response) {
    console.log(response);

    fahrenheitTemp = Math.round(response.data.main.temp);

    const cityElement = document.querySelector("#ciudad");
    const temperature = fahrenheitTemp;
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

function showCelsiusTemperature() {
  const celsiusTemperature = ((fahrenheitTemp - 32) * 5) / 9;
  return Math.round(celsiusTemperature);
}

let isFahrenheit = true;

function toggleTemperature(event) {
  event.preventDefault();

  toggleTempText();

  if (isFahrenheit) {
    temperatureElement.innerHTML = showCelsiusTemperature();
  } else {
    temperatureElement.innerHTML = fahrenheitTemp;
  }

  isFahrenheit = !isFahrenheit;
}

function toggleTempText() {
  const celsiusElement = document.querySelector("#celsius-link");
  const fahrenheitElement = document.querySelector("#fahrenheit-link");
  if (isFahrenheit) {
    celsiusElement.innerHTML = "°F";
    fahrenheitElement.innerHTML = "°C";
  } else {
    celsiusElement.innerHTML = "°C";
    fahrenheitElement.innerHTML = "°F";
  }
}

getCurrentTemperature("Austin");

const button = document.querySelector("#button-addon2");
button.addEventListener("click", getCity);

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

const temperatureElement = document.querySelector("#current-temperature");

let fahrenheitTemp = null;

const celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toggleTemperature);
