document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "c659eaa0c8083d9298d08833d0d75258"; // Replace with your OpenWeatherMap API key
  const geoApiKey = "0a0dc8a1e67171"; // Replace with your ipinfo.io API key

  // Fetch geolocation data and get weather based on IP's ZIP code
  fetch(`https://ipinfo.io/json?token=${geoApiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const zipCode = data.postal; // Extract the postal code (zip code)
      if (zipCode) {
        getWeather(zipCode, apiKey);
      } else {
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

  // Event listener for manual ZIP code input
  document
    .getElementById("getWeatherBtn")
    .addEventListener("click", function () {
      const zipCode = document.getElementById("zipCode").value;
      getWeather(zipCode, apiKey);
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
          <h3>Weather for ${data.name} (ZIP: ${zipCode})</h3>
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
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherResult").innerHTML =
        `<p>Error fetching weather data.</p>`;
    });
}
