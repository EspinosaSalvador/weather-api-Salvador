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
