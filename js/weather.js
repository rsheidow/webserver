document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "c659eaa0c8083d9298d08833d0d75258"; // OpenWeatherMap API key
  const geoApiKey = "0a0dc8a1e67171"; // IP Geolocation API key

  // Load weather icon mapping from JSON file
  fetch("weatherIconsMapping.json")
    .then((response) => response.json())
    .then((iconMapping) => {
      // Get user's location based on IP
      fetch(`https://ipinfo.io/json?token=${geoApiKey}`)
        .then((response) => response.json())
        .then((data) => {
          const zipCode = data.postal;

          if (zipCode) {
            getWeather(zipCode, apiKey, iconMapping);
          } else {
            handleError("Could not determine ZIP code from IP address.");
          }
        })
        .catch((error) => {
          // handleError("Error determining location from IP.");
          getWeather("03032", apiKey, iconMapping);
          console.error("Error fetching IP Geolocation:", error);
        });
    });
});

document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const zipCode = document.getElementById("zipCode").value;
  const apiKey = `c659eaa0c8083d9298d08833d0d75258`;

  // Load weather icon mapping from JSON file
  fetch("weatherIconsMapping.json")
    .then((response) => response.json())
    .then((iconMapping) => {
      if (zipCode) {
        getWeather(zipCode, apiKey, iconMapping);
      } else {
        handleError("Please enter a ZIP code.");
      }
    });
});

// Fetch weather data from OpenWeatherMap
function getWeather(zipCode, apiKey, iconMapping) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data, iconMapping);
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
function displayWeather(data, iconMapping) {
  const weatherDescription = capitalizeFirstLetter(data.weather[0].description);
  const temperature = Math.round(data.main.temp);
  const conditionCode = data.weather[0].id.toString(); // OpenWeatherMap weather condition code
  const iconClass = iconMapping[conditionCode] || "wi-na"; // Use mapping or fallback
  const iconElement = `<i class="wi ${iconClass} large-icon"></i>`; // Add the custom class here
  console.log(data);

  document.getElementById("weatherResult").innerHTML = `
    <div class="weather-container">
      ${iconElement}
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
