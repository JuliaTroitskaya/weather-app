function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function formatDateMonth(timestamp) {
  let now = new Date(timestamp);
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  return `${month}/${date}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}`;
}

function search(city) {
  let apiKey = "c97684934a4c071aba1bb207f0e71af6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchValue = searchInput.value;
  search(searchValue);
}

search("London");
let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

function showTemperature(response) {
  let temp = document.querySelector("#current-temp");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp}`;
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formatTime(response.data.dt * 1000);
  let today = document.querySelector("#current-date");
  today.innerHTML = formatDateMonth(response.data.dt * 1000);
  let dayOfWeek = document.querySelector("#current-day");
  dayOfWeek.innerHTML = formatDay(response.data.dt * 1000);
}

function showCurrentPosition(position) {
  let apiKey = "c97684934a4c071aba1bb207f0e71af6";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentTemperature(response) {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentButton = document.querySelector(".c-button");
currentButton.addEventListener("click", showCurrentTemperature);

//let celsius = document.querySelector("#celsius");
//let fahrenheit = document.querySelector("#fahrenheit");

//function changeToCelsius(event) {
//event.preventDefault();
//let currentTempOne = document.querySelector("#current-temp");
//currentTempOne.innerHTML = "19";
//}

//function changeToFahrenheit(event) {
//event.preventDefault();
//let currentTempTwo = document.querySelector("#current-temp");
//currentTempTwo.innerHTML = "66";
//}
//celsius.addEventListener("click", changeToCelsius);
//fahrenheit.addEventListener("click", changeToFahrenheit);
