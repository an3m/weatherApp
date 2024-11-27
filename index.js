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
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city name");
  }
}

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    // Parse the response JSON
    const data = await response.json();
    // Handle API response errors (like 404)
    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data; // Return the parsed weather data
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

function displayWeather(data) {
  const weatherIcon = getWeatherIcon(data.weather[0].main);
  let sunrise = new Date(data.sys.sunrise * 1000);
  let sunset = new Date(data.sys.sunset * 1000);
  let coordnates = data.coord;
  let icon = data.weather[0].icon;
  weatherInfo.innerHTML = `
        <h2 class="city-name">${data.name}, ${data.sys.country}</h2>
        <div class="icon">${weatherIcon}</div>
        <p class="temp-display">${data.main.temp.toFixed(1)}°C</p>
        <p class="weather-description">Weather: ${
          data.weather[0].description
        }</p>
        <!--<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">-->
        <p class="humidity">Humidity: ${data.main.humidity}%</p>
        <p class="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
        <p class="pressure">Pressure: ${data.main.pressure} hPa</p>
        <p class="sunrise">Sunrise: ${sunrise.toLocaleTimeString()}</p>
        <p class="sunset">Sunset: ${sunset.toLocaleTimeString()}</p>
        <p class="coordinates">Coordinates: ${coordnates.lat.toFixed(
          2
        )}, ${coordnates.lon.toFixed(2)}</p>
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
