//Declare a variable to store the searched city
var city = "";
// variable declaration
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
var sCity = [];
var currentDay = moment().format("DD/MM/YYYY");
console.log(currentDay);

//Set up the API key
var APIKey = "3e55dd6b578b0ad05e1279f3847fb34a";
// Display the curent and future weather to the user after grabing the city form the input text box.
function displayWeather(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}
// Here we create the fetch API call
function currentWeather(city) {
  // Here we build the URL so we can get a data from server side.
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric" +
    "&APPID=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // parse the response to display the current weather including the City name. the Date and the weather icon.
      console.log(response);
      //Dta object from server side Api for icon property.
      var weathericon = response.weather[0].icon;
      var iconurl =
        "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      //parse the response for name of city and concating the date and icon.
      $(currentCity).html(
        response.name + "(" + currentDay + ")" + "<img src=" + iconurl + ">"
      );
      // parse the response to display the current temperature.

      var tempC = response.main.temp;
      $(currentTemperature).html(tempC.toFixed(2) + "&#8451");
      // Display the Humidity
      $(currentHumidty).html(response.main.humidity + "%");
      //Display Wind speed and convert to MPH
      var ws = response.wind.speed;
      var windsmph = (ws * 2.237).toFixed(1);
      $(currentWSpeed).html(windsmph + "MPH");
      // Display UVIndex.
      //By Geographic coordinates method and using appid and coordinates as a parameter we are going build our uv query url inside the function below.
      UVIndex(response.coord.lon, response.coord.lat);
    });
}
// This function returns the UVIindex response.
function UVIndex(ln, lt) {
  //lets build the url for uvindex.
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;

  fetch(uvqURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      $(currentUvindex).html(response.value);
    });
}

//Click Handlers
$("#search-button").on("click", displayWeather);
