let apiKey = "55ea3bd4ftf0bf63c7f231oa6c374c08";

// Date and time formate

function dateFormat(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  let dayformat = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayformat];

  return `${day} ${hours}:${minutes}`;
}

// Weather disply
function weather(response) {
  let weatherDecription = document.querySelector(".description");
  let displayCity = document.querySelector("#city");
  let placeTemp = document.querySelector(".temp");
  let humidityValue = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind-speed");
  let windValue = Math.round(response.data.wind.speed);

  fahrenheitTemp = response.data.temperature.current;

  weatherDecription.innerHTML = response.data.condition.description;
  displayCity.innerHTML = response.data.city;
  placeTemp.innerHTML = Math.round(fahrenheitTemp);
  humidityValue.innerHTML = `Humidity: ${response.data.temperature.humidity}`;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  windElement.innerHTML = `Wind speed: ${windValue}`;
}

function findCity(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(`${url}`).then(weather);
}

function findLocation(position) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let url = `https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key=${apiKey}&units=imperial`;
  axios.get(`${url}`).then(weather);
}

// Search form
function submitPlace(event) {
  event.preventDefault();
  let place = document.querySelector("#search-bar");
  findCity(place.value);
}

// Find current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

// Unit conversion

function celsiusClick(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let celsiustemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiustemp);
}

function fahrenheitClick(event) {
  event.preventDefault();
  let fahrenheitElemtent = document.querySelector(".temp");
  fahrenheitElemtent.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let dateChange = document.querySelector("#date");
let now = new Date();
dateChange.innerHTML = dateFormat(now);

let search = document.querySelector("#change-city");
search.addEventListener("submit", submitPlace);

let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", celsiusClick);

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", fahrenheitClick);

let currentLocatonButton = document.querySelector("#current-location");
currentLocatonButton.addEventListener("click", getCurrentLocation);
findCity("Detroit");
