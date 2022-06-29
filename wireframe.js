function getCurrentTemperature(cityName) {
  const apiKey = "0c5cd3271ca5da27f88448575bac1056";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  function showTemperature(response) {
    console.log(response);

    const temperatureElement = document.querySelector("#current-temperature");
    const cityElement = document.querySelector("#ciudad");
    const temperature = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    const humidityElement = document.querySelector("#humidity");
    const humidity = Math.round(response.data.main.humidity);
    const windElement = document.querySelector("#wind");
    const wind = Math.round(response.data.wind.speed);
    const descriptionElement = document.querySelector("#description");
    const description = response.data.weather[0].description;

    temperatureElement.innerHTML = `${temperature}°F`;
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
