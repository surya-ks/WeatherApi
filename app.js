// jshint esversion:6

const express = require('express');
const https = require('https');
const bodyparser = require('body-parser')
const {apiKey} = require("./api")


const app = express();
app.use(bodyparser.urlencoded({
  encoded: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const cityName = req.body.city
  const url = "https://api.openweathermap.org/data/2.5/weather?&q="+ cityName+"&units=metric&appid="+apiKey;

  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
     
      const weatherData = JSON.parse(data);
      console.log(weatherData)
      const temp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      res.write("<h1>Weather today in "+cityName +" is " + weatherDes);
      res.write("<br>Temperature in "+cityName+ " right now is " + temp + "  celcius</h1>");
      res.write("<img src=" + imgUrl + ' alt="image of weather at your area">');
      res.send()
    })
  });
});


app.listen(3000, function() {
  console.log("server started on port 3000");
});
