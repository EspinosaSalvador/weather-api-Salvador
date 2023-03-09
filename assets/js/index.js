// ! Define the API endpoints and API key
const API_CURRENT = "https://api.openweathermap.org/data/2.5/weather";
const API_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "b2f19c6737c0072132e8bdd78f8b1882";

// ! Initialize an empty array to store search history
let searchHistory = [];

// ! This function handles the search button click event
function handleSearch() {
  // ! Get the city name from the input field
  const city = $("#city-name").val();
  // ! If the city is not already in the search history, add it
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    // ! Add the city name to the search history list in the HTML
    $("#search-history").append(
      `<p class="city-history" data-city="${city}">${city}</p>`
    );
  }
  // ! Call the functions to get the current weather and weather forecast for the given city
  getCurrentWeather(city);
  getWeatherForecast(city);
}
// ! When the document is ready, attach the handleSearch function to the search button click event
$(document).ready(function () {
  $("#search-button").click(handleSearch);
});

// ! This function fetches and displays the current weather for a given city
async function getCurrentWeather(city) {
  try {
    // ! Make a GET request to the current weather API endpoint for the given city using the API key
    const response = await fetch(`${API_CURRENT}?q=${city}&appid=${API_KEY}`);
    // ! Parse the response data into a JSON object
    const data = await response.json();
    // ! Extract the weather data from the JSON object
    const weather = data.weather[0];
    const temp = data.main.temp - 273.15;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const date = new Date();
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;
    // ! Update the HTML elements with the weather data
    $("#currentCity").html(data.name);
    $("#date").html(date.toDateString());
    $("#weatherIconCurrent").attr("src", iconUrl);
    $("#temperature").html(`Temperature: ${temp.toFixed(2)}°C`);
    $("#humidity").html(`Humidity: ${humidity}%`);
    $("#wind-speed").html(`Wind Speed: ${windSpeed} m/s`);
  } catch (error) {
    // ! If there is an error, display a message to the user
    $("#current-weather").html(
      "<h2>try again please the city was not found in the system. please check for grammar errors</h2>"
    );
  }
}
// ! This function fetches and displays the weather forecast for a given city
async function getWeatherForecast(city) {
  try {
    // ! Make a GET request to the weather forecast API endpoint for the given city using the API key
    const response = await fetch(`${API_FORECAST}?q=${city}&appid=${API_KEY}`);
    // ! Parse the response data into a JSON object
    const data = await response.json();
    // ! Update the HTML elements with the city name for the weather forecast
    $("#cityNameForecast").html(data.city.name);
    // ! Loop through the weather forecast data and update the HTML elements for each forecast
    for (let i = 0; i < data.list.length; i += 8) {
      // ! Extract data for each forecast
      const forecast = data.list[i];
      const forecastDate = new Date(forecast.dt * 1000);
      // ! the icons were taken form openweathermap.org this is due that it was easier instead of taking other api and uploading it to this work
      const forecastIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
      const forecastTemp = (forecast.main.temp - 273.15).toFixed(2);
      const forecastHumidity = forecast.main.humidity;
      const forecastWindSpeed = forecast.wind.speed;
      // ! Update HTML elements with forecast data
      $(`#forecastDate-${i / 8 + 1}`).html(forecastDate.toDateString());
      $(`#forecastIcon-${i / 8 + 1}`).attr("src", forecastIconUrl);
      $(`#forecastTemperature-${i / 8 + 1}`).html(
        `Temperature: ${forecastTemp}°C`
      );
      $(`#forecastHumidity-${i / 8 + 1}`).html(
        `Humidity: ${forecastHumidity}%`
      );
      $(`#forecastWindSpeed-${i / 8 + 1}`).html(
        `Wind Speed: ${forecastWindSpeed} m/s`
      );
    }
    // ! If an error occurs, display an error message in the forecast element
  } catch (error) {
    $("#forecast").html("<h2>City not found</h2>");
  }
}
