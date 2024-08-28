document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const zipCode = document.getElementById("zipCode").value;
  const apiKey = `c659eaa0c8083d9298d08833d0d75258`; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        document.getElementById("weatherResult").innerHTML = `
                  <h2>Weather for ${data.name}</h2>
                  <p>${weatherDescription}</p>
                  <p>Temperature: ${temperature}°F</p>
              `;
      } else {
        console.log(data); // Log the full response for debugging
        document.getElementById("weatherResult").innerHTML =
          `<p>Weather data not found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error); // Log the error to console
      document.getElementById("weatherResult").innerHTML =
        `<p>Error fetching data.</p>`;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "c659eaa0c8083d9298d08833d0d75258"; // Replace with your OpenWeatherMap API key
  const geoApiKey = "0a0dc8a1e67171"; // Replace with your ipinfo.io API key

  fetch(`https://ipinfo.io/json?token=${geoApiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const location = data.loc.split(","); // Extract latitude and longitude
      const zipCode = data.postal; // Extract the postal code (zip code)

      if (zipCode) {
        getWeather(zipCode, apiKey);
      } else {
        // Fallback: Use latitude and longitude to get the city name and then get the weather
        console.error("No ZIP code found for this IP.");
        document.getElementById("weatherResult").innerHTML =
          `<p>Could not determine ZIP code from IP address.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching IP Geolocation:", error);
      document.getElementById("weatherResult").innerHTML =
        `<p>Error determining location from IP.</p>`;
    });
});

function getWeather(zipCode, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        document.getElementById("weatherResult").innerHTML = `
                    <h2>Weather for ${data.name} (ZIP: ${zipCode})</h2>
                    <p>${weatherDescription}</p>
                    <p>Temperature: ${temperature}°F</p>
                `;
      } else {
        document.getElementById("weatherResult").innerHTML =
          `<p>Weather data not found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherResult").innerHTML =
        `<p>Error fetching weather data.</p>`;
    });
}