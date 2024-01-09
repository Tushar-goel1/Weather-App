let temp_img = document.querySelector("#temp-img");
let wind_speed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let current_location = document.querySelector("#location");
let temp_img_desc = document.querySelector("#temp-img-desc");

setInterval(function () {
  let currentDate = new Date();
  let cDate = currentDate.getDate();
  let cMonth = currentDate.getMonth();
  let cYear = currentDate.getFullYear();
  let n = currentDate.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let dated = cDate + "-" + (cMonth + 1) + "-" + cYear;
  let date = document.querySelector("#date-time");
  date.innerHTML = dated + "," + n;
}, 1000);

let temperature = document.querySelector("#temp-curr");
let feels_like = document.querySelector("#feels_like");

async function getLatLon(lat, lon) {
  

   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c678d134a995fa3151eccd5fab174d7d`;

  try{
    let respons=await fetch(url);
    let data =await respons.json();
    let icon = data.weather[0].icon;
    let disc=data.weather[0].description;
    let iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    temp_img_desc.innerHTML=disc;
    temp_img.src = iconurl;
    temperature.innerHTML = "Currently " + data.main.temp + "°c";
    feels_like.innerHTML = "feels like " + data.main.feels_like + "°c";
    let val = Math.round(data.wind.speed);
    wind_speed.innerHTML = val + "m/s";
    humidity.innerHTML = data.main.humidity + "%";
  }
   catch(error){
      alert("Not able to fetch current location!!!");
   }
}

async function getCityName(lat, lon) {
  let URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=c678d134a995fa3151eccd5fab174d7d`;
  try{
    let respons=await fetch(URL);
    let data = await respons.json();
    current_location.innerHTML = "Current location: " + data[0].name;
  }
   catch(error){
    alert("Error fetching city name:", error);
   }
}

function getCurrentLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
  
         getCityName(lat, lon);
         getLatLon(lat, lon);
      },
      (error) => {
        alert("Error getting location: " + error.message);
      }
    )
  }
  else{
    alert("Geolocation is not supported by the browser");
  }
}
getCurrentLocation();
