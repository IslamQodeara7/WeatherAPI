var listo = [];
var findLocation = document.getElementById("findLocation");
var findLocationButton = document.getElementById("findLocationButton");
var searchResult = document.getElementById("searchResult");
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var month = ["January", "Febraury", "March", "April",
    "May", "June", "July","August", "Septemper", "October", "November", "December"];
var subscribeList = [];
var sAlert = document.getElementById("subscribtionAlert");
var subscribtion = document.getElementById("subscribtion");
var subButton = document.getElementById("subscribeButton");
subButton.addEventListener("click", addSubscribe);
var validEmail = /^[a-z_0-9A-Z]{7,20}@[a-zA-Z]{5,20}\.[a-zA-Z]{2,5}$/;
if (localStorage.getItem("subscribeList") != null) {
    subscribeList = JSON.parse(localStorage.getItem("subscribeList"));
}
function addSubscribe() {
    var exist=0;
    if (validEmail.test(subscribtion.value)) {
        for (var i = 0; i < subscribeList.length; i++) {
              if(subscribeList[i]==subscribtion.value){
              exist++;
              break; 
              }
        }
        if(exist==0){
            subscribeList.push(subscribtion.value);
            localStorage.setItem("subscribeList", JSON.stringify(subscribeList));
            sAlert.innerHTML = "";
            console.log(subscribeList);
        }
        else{
            sAlert.innerHTML = "you are already a subscriber";
        }
    }
    else {
        sAlert.innerHTML = "invalid Email reenter again please.";
    }
}
var calendar = new Date();
var days = [];
days[0] = week[calendar.getDay()];
if (days[0] == "Saturday") {
    days[1] = week[0];
    days[2] = week[1];
}
else {
    days[1] = week[calendar.getDay() + 1];
    if (days[1] == "Saturday") {
        days[2] = week[0];
    }
    else {
        days[2] = week[calendar.getDay() + 2];
    }
}

findLocation.addEventListener("keyup", function () {
    getData(findLocation.value);

})
findLocationButton.addEventListener("click", function () {
    getData(findLocation.value);

})

function getData(input) {
    var api = new XMLHttpRequest();
    api.open("GET", `http://api.weatherapi.com/v1/forecast.json?key=52e3cb71626746feb70173626220506&q=${input}&days=3`);
    api.send();
    api.addEventListener("readystatechange", function () {
        if (api.readyState == 4 && api.status == 200) {
            listo = JSON.parse(api.response);
            display();
        }
    })
}

function display() {
    var calculator = ' ';
    calculator = `<div class="day1 col-md-4">
    <div class="present text-muted p-2 w-100 border-bottom">
        <h5 class="float-start">${days[0]}</h5>
        <h5 class="float-end">${calendar.getDate()} ${month[calendar.getMonth()]}</h5>
        <div class="clearfix"></div>
    </div>
    <div class="day1Result p-5 w-100">
        <h5 class="status">${listo.location.name}</h5>
        <div class="my-3">
            <h1 class="float-start text-white">${listo.current.temp_c}<sup>o</sup>C</h1>
            <img class="float-end" src="https:${listo.current.condition.icon}" alt="">
            <div class="clearfix"></div>
        </div>
        <h5 class="status">${listo.current.condition.text}</h5>
        <div class="row mt-5 text-muted m-auto">
            <div class="col-4 text-center">
                <i class="float-start fa-solid fa-umbrella"></i>
                <h6 class="float-end">20%</h6>
                <div class="clearfix"></div>

            </div>
            <div class="col-4  text-center">
                <i class="float-start fa-solid fa-wind"></i>
                <h6 class="float-end">${listo.current.wind_kph}</h6>
                <div class="clearfix"></div>
                <h6>KM/H</h6>

            </div>
            <div class="col-4 text-center">
                <i class="float-start fa-solid fa-compass"></i>
                <h6 class="float-left">${listo.current.wind_dir}</h6>
                 <div class="clearfix"></div>
            </div>

        </div>
    </div>
</div>
<div class="day2 col-md-4 text-center">
    <div class="future border-bottom p-2 text-muted">
        <h5>${days[1]}</h5>
    </div>
    <div class="p-5">
        <img src="https:${listo.forecast.forecastday[1].day.condition.icon}" alt="">
        <h1 class="my-3 text-white">${listo.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h1>
        <h5 class="status">${listo.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</h5>
        <h5 class="status">${listo.forecast.forecastday[1].day.condition.text}</h5>

    </div>
</div>
<div class="day2 col-md-4 text-center">
    <div class="future border-bottom p-2 text-muted">
        <h5>${days[2]}</h5>
    </div>
    <div class="p-5">
        <img src="https:${listo.forecast.forecastday[2].day.condition.icon}" alt="">
        <h1 class="my-3 text-white">${listo.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h1>
        <h5 class="status">${listo.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</h5>
        <h5 class="status">${listo.forecast.forecastday[2].day.condition.text}</h5>

    </div>
</div>`
    searchResult.innerHTML = calculator;
}

getData("cairo");