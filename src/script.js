// Format the date to get the date of the week and the hours and minutes
function formatDate() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes;
  }

  let day = days[now.getDay()];
  let formattedDate = `${day} ${hour}:${minutes}`;

  return formattedDate;
}

// Update the current temperature with the current temperature
function showTemp(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-desc").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getCity(city);
}

// Update the city name with the city entered in the search
function getCity(city) {
  let apiKey = "fb2202991880ec9c8bd86bd6cf3cb526";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}
`;
  axios.get(weatherUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "fb2202991880ec9c8bd86bd6cf3cb526";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showTemp);
}

// Update the HTML with the current date
let date = document.querySelector("#current-date");
date.innerHTML = formatDate();

// Call the getCity function when the search button is pressed
let search = document.querySelector("#city-form", "#search-button");
search.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

getCity("Melbourne");
