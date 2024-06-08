const submit = document.querySelector("#submit");
const tdyWea = document.querySelector(".tdyDiv");
const weekDiv = document.querySelector("#main-weather");
const apiKey = "3d8d7e3772c59d486c6023acf03a4346";
const userCity = document.getElementById("city");
const tdyDate = dayjs().format("MM,DD,YYYY");
console.log(tdyDate);
let cityStorage = JSON.parse(localStorage.getItem('cities'));
  if (cityStorage == null) {
    cityStorage = []
  } 
submit.addEventListener("click", function () {
  console.log("submit");
  const city = submit.value;   
  localStorage.setItem('userCities', cityStorage)
  // cityStorage = []
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
  function getWeather(data) {
    console.log("geodata");
    let lat = data[0].lat;
    let lon = data[0].lon;
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
    console.log(tdyWea)
    tdyWea.innerHTML = ""
    const tdyMainDiv = document.createElement("div");
    tdyMainDiv.setAttribute("class", "col-12 pt-5 ps-4");
    tdyWea.append(tdyMainDiv);
    console.log("city", data);

    const cityName = document.createElement("h2");
    console.log("hello");
    cityName.textContent = `City: ${data[0].name} ${tdyDate}`;
    tdyMainDiv.append(cityName);
  }

  function todayweather(geodata) {
    let realTemp = (
      ((Number(geodata.list[0].main.temp) - 273.15) * 9/5 +
      32)
    ).toFixed(0);
    let wEmoji = "☀️";
    switch (geodata.list[0].weather[0].main) {
      case "Rain":
        wEmoji = "🌧️";
        break;
      case "Clouds":
        wEmoji = "☁️";
        break;
      default:
        wEmoji = "☀️";
    }

    console.log(geodata);
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "col-12 pt-5 ps-4 ");
    tdyWea.append(mainDiv);

    const icon = document.createElement("p");
    icon.textContent = `${wEmoji}`;
    mainDiv.append(icon);

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
  }

  function fivedayforcast(geodata) {
    console.log(weekDiv)
    weekDiv.innerHTML = ''
    for (let i = 4; i < 40; i = i + 8) {
      // console.log(i);
      let realTemp = (
        ((Number(geodata.list[i].main.temp_max) - 273.15) * 9/5 +
        32)
      ).toFixed(0);
      let wEmoji = "☀️";
      switch (geodata.list[i].weather[0].main) {
        case "Rain":
          wEmoji = "🌧️";
          break;
        case "Clouds":
          wEmoji = "☁️";
          break;
        default:
          wEmoji = "☀️";
      }
      const tdyCard = document.createElement("div");
      tdyCard.setAttribute("class", "col-2 p-3 m-2 ");
      weekDiv.append(tdyCard);

      const dayDate = document.createElement("h3");
      // console.log("hello");
      dayDate.textContent = ` ${dayjs(geodata.list[i].dt_txt).format(
        "MM/DD/YYYY"
      )}`;
      tdyCard.append(dayDate);

      const dayEmo = document.createElement("p");
      dayEmo.textContent = `${wEmoji}`;
      tdyCard.append(dayEmo);

      const dayTemp = document.createElement("h3");
      dayTemp.textContent = `${realTemp}F`;
      tdyCard.append(dayTemp);

      const dayWind = document.createElement("h3");
      dayWind.textContent = `${geodata.list[i].wind.speed}mph`;
      tdyCard.append(dayWind);

      const dayHum = document.createElement("h3");
      // console.log('god lord')
      dayHum.textContent = `${geodata.list[i].main.humidity}%`;
      tdyCard.append(dayHum);
    }
  }
  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("class", "col-12 pt-5 ps-4 ");
  const tdyCard = document.createElement("div");
      tdyCard.setAttribute("class", "col-2 p-3 m-2 ")
  function initial() {
    tdyCard.textContent = "";
    mainDiv.textContent = "";
  }

  // function weather(geodata) {
  //   initial();
  //   fivedayforcast(geodata);
  //   todayweather(geodata);
  // }
  // weather();
 
    // let cityStorage = [];
  
  
});
const hist = document.getElementById('history')
function cityHistory (){
  console.log(submit.value)
  if (submit.value == null) {
    return
  } else {
    console.log(false)
  }

  cityStorage.push(submit.value)

  localStorage.setItem("cities", JSON.stringify(cityStorage));

  for( let i = (cityStorage.length -1); i>0; i--){
     const cityOne = document.createElement('button')
 cityOne.setAttribute('class', 'col-12 mt-1 bg-info')
 cityOne.textContent = `austin`
 hist.append(cityOne)   

  }
  }
  




cityHistory()
// const city = document.getElementById(submit)
// function handleFromSubmit(event) {
//     event.preventDefault();

//     const cities = document.getElementById('submit')
    // const citiesData = JSON.stringify(cities)
    
    // for (i=0, i)

//     updatedLastRegisterdUser(citiesData)

// }

// function updatedLastRegisterdUser(citiesData) {
//   const lastCity = document.createElement('lastUsedCity')
//   lastCity.textContent = `${citiesData}`
// }


// cityhistory();
// let cityStorage = JSON.parse(localStorage.getItem("cities"));

// if (cityStorage == null) {
// }
 
    // console.log(submit.value)
  // if (submit.value == null){
  //   console.log(true)
  //   return
  // } else {
  //   console.log(false)
  // }