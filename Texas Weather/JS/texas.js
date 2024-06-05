const submit = document.querySelector("#submit");
const tdyWea = document.querySelector(".tdyDiv");
const weekDiv = document.querySelector("#main-weather");
const apiKey = "3d8d7e3772c59d486c6023acf03a4346";
const userCity = document.getElementById("city");
const tdyDate = dayjs().format('MM DD, YYYY')
console.log(tdyDate)
let cityStorage = JSON.parse(localStorage.getItem("cities"));

if (cityStorage == null) {
}

function todayweather(data) {
  const tdyMainDiv = document.createElement("div");
  tdyMainDiv.setAttribute("class", "col-12 pt-5 ps-4 bg-light");
  tdyWea.append(tdyMainDiv);
  console.log('todayweather', data)

  const cityName = document.createElement("h2");
  console.log('hellow')
  cityName.textContent = `City: ${data[0].name}` ;
  tdyMainDiv.append(cityName);
  
  const tdyTemp = document.createElement('h2');
  console.log(data)
  tdyTemp.textContent =  `Temp: ${geodata.list[0].main.temp} `;
  tdyMainDiv.append(tdyTemp);

  const tdyWind = document.createElement('h3');
  tdyWind.textContent =  `Wind: mph`;
  tdyMainDiv.append(tdyWind)

  const tdyHum = document.createElement('h3');
  tdyHum.textContent = `Humidity:`;
  tdyMainDiv.append(tdyHum)
}









function initial() {
  weaDiv.textContent = ""
  tdyWea.textContent = ""
}

function weather(data) {
  initial()
  weekWeather(data)
  todayweather(data)
}

















submit.addEventListener("click", function () {
  console.log("submit");
  const city = userCity.value;
  let cityStorage =[]
  //   let lat = 29.4252
  // let lon = -98.4946
  // let city = 'San Antonio'
  fetch(
    ` https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      getWeather(data);
      todayweather(data);
    });
  function getWeather(geodata) {
    console.log('geodata');
    let lat = geodata[0].lat;
    let lon = geodata[0].lon;
    // const sampleGeodata = [{lat: 40.7128, lon: -74.0060}]
    // console.log(sampleGeodata)

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (geodata) {
        console.log(geodata);
        // tdyWea(data);
        // fivedayforcast(data);
      });
  }
});
