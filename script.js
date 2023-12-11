let temp_img = document.querySelector("#temp-img");
let wind_speed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let current_location = document.querySelector("#location");

setInterval(function () {
  let currentDate = new Date();
  let cDate = currentDate.getDate();
  let cMonth = currentDate.getMonth();
  let cYear = currentDate.getFullYear();
  let n = currentDate.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let dated = cDate + "-" + (cMonth + 1) + "-" + cYear;
  let date = document.querySelector("#date-time");
  date.innerHTML = dated + "," + n;
}, 1000);

let temperature = document.querySelector("#temp-curr");
let feels_like = document.querySelector("#feels_like");

function getLatLon(lat, lon) {
  let request = new XMLHttpRequest();
  let method = "GET";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c678d134a995fa3151eccd5fab174d7d`;

  request.open(method, url);
  request.onload = function () {
    let data = JSON.parse(request.responseText);
    let icon = data.weather[0].icon;
    let iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    temp_img.src = iconurl;
    temperature.innerHTML = "Currently " + data.main.temp + "°c";
    feels_like.innerHTML = "feels like " + data.main.feels_like + "°c";
    let val = Math.round(data.wind.speed);
    wind_speed.innerHTML = val + "m/s";
    humidity.innerHTML = data.main.humidity + "%";
  };
  request.send();
}

function getcityname(lat, lon) {
  let req = new XMLHttpRequest();
  let method = "GET";
  let URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=c678d134a995fa3151eccd5fab174d7d`;
  req.open(method, URL);
  req.onload = function () {
    let data = JSON.parse(req.responseText);
    current_location.innerHTML = "Current location: " + data[0].name;

    console.log(data);
  };
  req.send();
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  getcityname(lat, lon);
  getLatLon(lat, lon);
}

navigator.geolocation.getCurrentPosition(currentLocation);
