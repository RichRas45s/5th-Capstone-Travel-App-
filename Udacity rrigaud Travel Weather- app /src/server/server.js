/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const  path = require('path')





// Require Express to run server and routes
const express= require('express');
const request = require('request');
const apiResponse = require('express-api-response')
const http = require('http')

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());

// Initialize the main project folder
// app.use(express.static('website'));   
app.use(express.static('dist'))
app.use(express.json())
app.use(express.json({limit: '10mb'}))

/* Setup Server
local server running and producing feedback thru working call back function */
const port= 8081;
const server = app.listen(port, listening);
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

app.get('/', function (req, res) {
  res.sendFile('dist/index.html') 
  // res.sendFile(path.resolve('src/client/views/index.html'))
})

const geoKey = process.env.API_KEY
process.env.API_KEY
 

app.post('/addCity', async function (req, res){
  const city = req.body.name;
  const apiURL =`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoKey}`
  
  const requestOptions = {
  method: 'POST',
  body: city,
  redirect: 'follow'
}
const response = await fetch(apiURL, requestOptions)
.then((res) => {
  if (res.ok) {
  return res.json(); 
  }else {
    throw new Error ('NETWORK RESPONSE NOT OK');
  }
})
.then(function(data) {
  const countryName = data.geonames[0].countryName
  const lat = data.geonames[0].lat
  const lng = data.geonames[0].lng
  const population = data.geonames[0].population
  res.send(data)
  console.log(data);
  console.log('Country: ' + countryName, 'Latitude: ' + lat, 'Longitude: ' + lng);
  console.log('Population: ' + population);


  const weatherKey = process.env.weatherAPI_KEY


  app.get('/weather', async (req, res) => {
    const weatherURL= (`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherKey}&units=[Fahrenheit]`)
    const fetch_response = await fetch(weatherURL);
    const jsData = await fetch_response.json();
    res.send(jsData);
    console.log(jsData);
   
})
});
})
  const pixKey = process.env.pixAPI_KEY

  app.post('/pixabay', async (req,res) => {
    const city = req.body.text
    const pixabayURL = (`https://pixabay.com/api/?key=${pixKey}&q=${city}&image_type=photo`);
    // const pixabayURL = (`https://pixabay.com/api/?key=39296552-c97c86c2c0105944c247600a8&q=${city}&image_type=photo`);
    const requestOptions = {
      method: 'POST',
      body: city,
      redirect: 'follow'
  }
    const response = await fetch(pixabayURL, requestOptions)
    .then((res) => {
      if (res.ok) {
      return res.json(); 
      }else {
        throw new Error ('NETWORK RESPONSE NOT OK');
      }
    })
    .then(function(data) {
      const cityPic = data.hits[0].webformatURL
      res.send(data)
      console.log(cityPic);
    })
    
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    })
    
     });
    




