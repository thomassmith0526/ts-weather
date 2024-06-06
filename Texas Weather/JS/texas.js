const submit = document.querySelector("#submit");
const tdyWea = document.querySelector(".tdyDiv");
const weekDiv = document.querySelector("#main-weather");
const apiKey = "3d8d7e3772c59d486c6023acf03a4346";
const userCity = document.getElementById("city");
const tdyDate = dayjs().format("MM DD, YYYY");
console.log(tdyDate);
  let cityStorage = JSON.parse(localStorage.getItem("cities"));

  if (cityStorage == null) {
  }
submit.addEventListener("click", function () {
  console.log("submit");
  const city = userCity.value;
  let cityStorage = [];
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
      console.log(data);
      getWeather(data);
      tdycity(data);
    });
  function getWeather(geodata) {
    console.log("geodata");
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
        todayweather(geodata);
        fivedayforcast(geodata);
      });
  }


  function tdycity(data) {
    
    const tdyMainDiv = document.createElement("div");
    tdyMainDiv.setAttribute("class", "col-12 pt-5 ps-4 bg-light");
    tdyWea.append(tdyMainDiv);
    console.log("city", data); 

     const cityName = document.createElement("h2");
    console.log("hello");
    cityName.textContent = `City: ${data[0].name}`;
    tdyMainDiv.append(cityName);
  }
  
  function todayweather(geodata){ 
     let realTemp = ((Number(geodata.list[0].main.temp)- 273.15)* 9/5 +32).toFixed(0)
    const mainDiv = document.createElement("div")
    mainDiv.setAttribute("class", "col-12 pt-5 ps-4 bg-light")
    tdyWea.append(mainDiv)
    const tdyTemp = document.createElement("h2");
    console.log(geodata);
    tdyTemp.textContent = `Temp: ${realTemp}F `;
    mainDiv.append(tdyTemp);

    const tdyWind = document.createElement("h3");
    tdyWind.textContent = `Wind: ${geodata.list[0].wind.speed}mph`;
    mainDiv.append(tdyWind);

    const tdyHum = document.createElement("h3");
    tdyHum.textContent = `Humidity: ${geodata.list[0].main.humidity}%`;
    mainDiv.append(tdyHum);

    // const icon = document.createElement("h3");
    // icon.textContent = `${geodata.list[0].weather[0].id}`;
    // mainDiv.append(icon)
  }

  function fivedayforcast(geodata){
    console.log(geodata)
    for (let i=4; i<40; i+8){
      let realTemp = ((Number(geodata.list[0].main.temp)- 273.15)* 9/5 +32).toFixed(0)
      let wEmoji = '☀️'
      switch(geodata.list[i].weather[0].main) {
        case 'Rain':
          wEmoji = '🌧️'
          break;
        case 'Clouds':
          wEmoji = '☁️'
          break;
      default:
          wEmoji = '☀️' 
      }
      const tdyCard = document.createElement("div")
      tdyCard.setAttribute("class", "col-2 bg-info")
      weekDiv.append(tdyCard)
      console.log('hello', geodata)


    }

  }
  

  // function initial() {
  //   weaDiv.textContent = "";
  //   tdyWea.textContent = "";
  // }

  // function weather(data) {
  //   initial();
  //   weekWeather(data);
  //   todayweather(data);
});
