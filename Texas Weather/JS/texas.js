const submit = document.getElementById("submit");
const tdyWea = document.getElementById("todayweather");
const weaDiv = document.getElementById("main-weather");
const apiKey = "3d8d7e3772c59d486c6023acf03a4346";
// let cityStorage = JSON.parse(localStorage.getItem("cities"));

// if (cityStorage == null) {
 let cityStorage = [];
// }

submit.addEventListener("click", function (city) {
  console.log("submit");
  fetch(
    ` https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "col-2 pt-5 ps-4 ");
      tdyWea.append(mainDiv);

      const cityName = document.createElement("h3");
      // cityName.textContent = `${}`
    });
});

// function getWeather(geodata) {
//   let lat = geodata[0].lat;
//   let lon = geodata[0].lon;

//   fetch(
//     `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       userCity(data);
//       fivedayforcast(data);
//     });
// }
