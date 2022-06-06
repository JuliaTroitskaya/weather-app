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

function formatDayShort(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastDaily = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col first-day">
          <div class="card third-row">
            <div class="card-body">
              <div class="day">${formatDayShort(forecastDay.dt * 1000)}</div>
              <div class="date">${formatDateMonth(forecastDay.dt * 1000)}</div>
              <div class="weather"><img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width="80"/></div>
              <div class="temperature">${Math.round(
                forecastDay.temp.max
              )} °C</div>
            </div>
          </div>
           </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c97684934a4c071aba1bb207f0e71af6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  let icon = document.querySelector("#current-weather-image");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  getForecast(response.data.coord);
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

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  celsius.classList.add("non-active");
  fahrenheit.classList.remove("non-active");
  let farenheitTemp = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  celsius.classList.remove("non-active");
  fahrenheit.classList.add("non-active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

search("London");
