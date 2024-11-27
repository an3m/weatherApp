const weatherInfo = document.getElementById("weather-info");
const apiKey = "864bd3edaba92d9d2c1e9e2231787580";
const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("get-weather");

getWeatherButton.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeather(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city name");
  }
}

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

function displayWeather(data) {
  const weatherIcon = getWeatherIcon(data.weather[0].main);
  let sunrise = new Date(data.sys.sunrise * 1000);
  let sunset = new Date(data.sys.sunset * 1000);

  weatherInfo.innerHTML = `
        <h2 class="city-name">${data.name}, ${data.sys.country}</h2>
        <div class="icon">${weatherIcon}</div>
        <p class="temp-display">${data.main.temp.toFixed(1)}°C</p>
        <p class="weather-description">Weather: ${
          data.weather[0].description
        }</p>
        <p class="humidity">Humidity: ${data.main.humidity}%</p>
        <p class="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
        <p class="pressure">Pressure: ${data.main.pressure} hPa</p>
        <p class="sunrise">Sunrise: ${sunrise.toLocaleTimeString()}</p>
        <p class="sunset">Sunset: ${sunset.toLocaleTimeString()}</p>
    `;
}

function displayError(message) {
  weatherInfo.innerHTML = `<p class="error">${message}</p>`;
}

function getWeatherIcon(weather) {
  switch (weather.toLowerCase()) {
    case "clear":
      return '<i class="fas fa-sun"></i>';
    case "clouds":
      return '<i class="fas fa-cloud"></i>';
    case "rain":
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case "snow":
      return '<i class="fas fa-snowflake"></i>';
    case "thunderstorm":
      return '<i class="fas fa-bolt"></i>';
    default:
      return '<i class="fas fa-smog"></i>';
  }
}
