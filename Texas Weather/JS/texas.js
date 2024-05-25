// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={3d8d7e3772c59d486c6023acf03a4346} 


fetch('http://api.openweathermap.org/geo/1.0/direct?q={san antonio}&appid={3d8d7e3772c59d486c6023acf03a4346}', {
//   method: 'GET', //GET is the default.
//   credentials: 'same-origin', // include, *same-origin, omit
//   redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
