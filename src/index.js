let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";

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

function weather(response) {
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = response.data.name;
  let placeTemp = document.querySelector(".temp");
  let temperature = Math.round(response.data.main.temp);
  placeTemp.innerHTML = `${temperature}`;
}

function findCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${url}`).then(weather);
}

function findLocation(position) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${url}`).then(weather);
}

function submitPlace(event) {
  event.preventDefault();
  let place = document.querySelector("#search-bar");
  findCity(place.value);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function fahrenheitClick(event) {
  event.preventDefault();
  let fahrenheitElemtent = document.querySelector(".temp");
  fahrenheitElemtent.innerHTML = "85";
}

function celsiusClick(event) {
  event.preventDefault();
  let celsiusElemtent = document.querySelector(".temp");
  celsiusElemtent.innerHTML = "19";
}

//Challenge 1
let dateChange = document.querySelector("#date");
let now = new Date();
dateChange.innerHTML = dateFormat(now);

let search = document.querySelector("#change-city");
search.addEventListener("submit", submitPlace);

let currentLocatonButton = document.querySelector("#current-location");
currentLocatonButton.addEventListener("click", getCurrentLocation);
findCity("Detroit");
