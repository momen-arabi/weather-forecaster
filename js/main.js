var baseUrl = "https://api.weatherapi.com/v1/forecast.json";
var apiKey = "31663b1152a741e98bb184542240201";
var days = 3;

var cards = document.getElementsByClassName("card");
var dayName = document.getElementsByClassName("day-name");
var dayMonth = document.getElementsByClassName("day-month");
var city = document.getElementsByClassName("city");
var temp = document.getElementsByClassName("temp");
var minTemp = document.getElementsByClassName("min-temp");
var maxTemp = document.getElementsByClassName("max-temp");
var condImg = document.getElementsByClassName("cond-img");
var condText = document.getElementsByClassName("cond-text");
var humidity = document.getElementsByClassName("humidity");
var wind = document.getElementsByClassName("wind");
var direction = document.getElementsByClassName("direction");

var findInput = document.getElementById("find-inp");
var findBtn = document.getElementById("find-btn");

async function getForcastData(inputLocation) {
  var url = await fetch(`${baseUrl}?key=${apiKey}&q=${inputLocation}&days=${days}`);
  var data = await url.json();
  if (url.ok) {
    // current data
    dayName[0].innerText = new Date(data.current.last_updated).toLocaleString("en-us", { weekday: "long" });
    dayMonth[0].innerText = new Date(data.current.last_updated).toLocaleString("en-uk", { day: "2-digit", month: "short" });
    city[0].innerText = data.location.name;
    temp[0].innerText = data.current.temp_c + "°C";
    condImg[0].setAttribute("src", data.current.condition.icon);
    condText[0].innerText = data.current.condition.text;
    humidity[0].innerText = data.current.humidity + "%";
    wind[0].innerText = data.current.wind_kph + " km/h";
    direction[0].innerText = data.current.wind_dir;
    // forecast data
    for (var i = 1; i < cards.length; i++) {
      dayName[i].innerText = new Date(data.forecast.forecastday[i].date).toLocaleString("en-us", { weekday: "long" });
      dayMonth[i].innerText = new Date(data.forecast.forecastday[i].date).toLocaleString("en-uk", { day: "2-digit", month: "short" });
      // city[i].innerText = data.location.name;
      minTemp[i - 1].innerText = data.forecast.forecastday[i].day.mintemp_c + "°C";
      maxTemp[i - 1].innerText = data.forecast.forecastday[i].day.maxtemp_c + "°C";
      condImg[i].setAttribute("src", data.forecast.forecastday[i].day.condition.icon);
      condText[i].innerText = data.forecast.forecastday[i].day.condition.text;
    }
  } else {
    document.querySelector(".card-group").classList.add("d-none");
    document.querySelector(".city").classList.add("d-none");
  }
}

findInput.addEventListener("input", function (e) {
  if (e.target.value.length >= 3) {
    getForcastData(e.target.value);
    document.querySelector(".card-group").classList.remove("d-none");
    document.querySelector(".city").classList.remove("d-none");
  } else {
    document.querySelector(".card-group").classList.add("d-none");
    document.querySelector(".city").classList.add("d-none");
  }
});
