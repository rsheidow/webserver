document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "c659eaa0c8083d9298d08833d0d75258"; // OpenWeatherMap API key
  const geoApiKey = "0a0dc8a1e67171"; // IP Geolocation API key

  // Get user's location based on IP
  fetch(`https://ipinfo.io/json?token=${geoApiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const zipCode = data.postal;

      if (zipCode) {
        getWeather(zipCode, apiKey);
      } else {
        handleError("Could not determine ZIP code from IP address.");
      }
    })
    .catch((error) => {
      handleError("Error determining location from IP.");
      console.error("Error fetching IP Geolocation:", error);
    });
});

document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const zipCode = document.getElementById("zipCode").value;
  const apiKey = `c659eaa0c8083d9298d08833d0d75258`;

  if (zipCode) {
    getWeather(zipCode, apiKey);
  } else {
    handleError("Please enter a ZIP code.");
  }
});

// Fetch weather data from OpenWeatherMap
function getWeather(zipCode, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        handleError("Weather data not found.");
      }
    })
    .catch((error) => {
      handleError("Error fetching weather data.");
      console.error("Error fetching weather data:", error);
    });
}

// Display weather information on the webpage
function displayWeather(data) {
  const weatherDescription = capitalizeFirstLetter(data.weather[0].description);
  const temperature = Math.round(data.main.temp);
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  console.log(data);

  document.getElementById("weatherResult").innerHTML = `
    <div class="weather-container">
      <img src="${iconUrl}"/>
      <div class="weather-details">
        <h3>Weather for ${data.name}</h3>
        <p>${weatherDescription}<span class="desc-temp-space">${temperature}°F</span></p>
      </div>
    </div>
  `;
}

// Handle errors by displaying them in the UI
function handleError(message) {
  document.getElementById("weatherResult").innerHTML = `<p>${message}</p>`;
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
