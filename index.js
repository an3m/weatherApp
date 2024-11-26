const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (data.cod === 200) {
            console.log(`Weather in ${data.name}: ${data.weather[0].description}`);
            console.log(`Temperature: ${data.main.temp}°C`);
        } else {
            console.log(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

// Example usage:
getWeather('London');