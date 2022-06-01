let currentTime = new Date();
let time = document.querySelector("#current-time");
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
let date = currentTime.getDate();
let today = document.querySelector("#current-date");
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
let month = months[currentTime.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let dayOfWeek = document.querySelector("#current-day");

dayOfWeek.innerHTML = `${day}`;

if (date < 10) {
  date = `0${date}`;
}
today.innerHTML = `${month}/${date}`;

if (hour < 10) {
  hour = `0${hour}`;
}

if (minute < 10) {
  minute = `0${minute}`;
}
time.innerHTML = `${hour}:${minute}`;

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchValue = searchInput.value;
  let apiKey = "c97684934a4c071aba1bb207f0e71af6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

function showTemperature(response) {
  let temp = document.querySelector("#current-temp");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp}`;
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;
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
