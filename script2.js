
//  -------------------------------------------------------------------------------
//  ---------------------     for search html    ----------------------------------

let temp_img = document.querySelector("#search-temp-img");
let wind_speed=document.querySelector("#search-wind-speed");
let humidity=document.querySelector("#search-humidity");
let temperature=document.querySelector("#search-temp-curr"); 
let feels_like=document.querySelector("#search-feels_like");
let search_button=document.querySelector("#searching-location");
let temp_img_desc = document.querySelector("#search-temp-img-desc");
let search_location;

search_button.addEventListener("click",function(){
  
    let tname=document.querySelector("#tname").value;
    search_location=tname;

    function GetlocationWeather(search_location){
        let rq=new XMLHttpRequest();
        let method='GET';
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${search_location}&units=metric&appid=c678d134a995fa3151eccd5fab174d7d`
        rq.open(method,url);
        rq.onload=()=>{
            if(rq.status==404){
                alert("Please Enter a valid location!!!")
            }else{
                let data=JSON.parse(rq.responseText);
                let icon=data.weather[0].icon;
                let disc=data.weather[0].description;
                let iconurl= `https://openweathermap.org/img/wn/${icon}@2x.png`;
                temp_img.src=iconurl;
                temp_img_desc.innerHTML=disc;
                temperature.innerHTML= "Currently "+data.main.temp+"°c" ;
                feels_like.innerHTML= "feels like " + data.main.feels_like+"°c" ;
                let val=Math.round(data.wind.speed);
                wind_speed.innerHTML=val+ "m/s";
                humidity.innerHTML=data.main.humidity + "%";
                let a=document.querySelector(".container-middle-search").style.visibility="visible";
                let b=document.querySelector(".container-end").style.visibility="visible";
            }
        }
        let a=document.querySelector(".container-middle-search").style.visibility="hidden";
        let b=document.querySelector(".container-end").style.visibility="hidden";
        rq.send()
    }
    GetlocationWeather(search_location);
});
