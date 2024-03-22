

// document.getElementById("button").addEventListener("click", performAction);
   
// function to store users info ...........

async function performAction(event){
      event.preventDefault();     
      
     const newCity = document.getElementById('city').value
     const strtDate = document.getElementById('start').value
     const endDate = document.getElementById('end').value

     console.log(newCity);
     console.log(strtDate);
     console.log(endDate);
  
     const second = 1000;
     const minute = second * 60;
     const hour = minute * 60;
     const day = hour * 24;

    let count_down = new Date(`${strtDate}`).getTime();
    let count_up = new Date(`${endDate}`).getTime();
   
    let x = setInterval(() => countDown(), second);


    function countDown() {
    let now = new Date(Date.now()).getTime();
    let diff = count_down - now;
    let length = count_up - count_down;


  document.getElementById('days').innerText = Math.floor(diff / day) + " Days to leave ";
  document.getElementById('hours').innerText = Math.floor(diff % day / hour) +  " H  ";
  document.getElementById('minutes').innerText = " : "  +  Math.floor(diff % hour / minute);
  document.getElementById('seconds').innerText = " : "  +  Math.floor(diff % minute / second);
  document.getElementById('tripDays').innerText = " Total trip days : "  +  Math.floor(length / day);

}

// ...............function to Countdown
// eslint-disable-next-line no-unused-vars
// ...........resetCountdown  ...................calculating 
  clearInterval(x);
     let trip_start = document.form_main.tripStart.value;
  // let trip_end = document.form_main.tripEnd.value;
     count_down = new Date(`${trip_start} 00:00:00`).getTime();
  // count_up = new Date(`${trip_end} 00:00:00`).getTime();
      x = setInterval(() => countDown(), second);

// 


         await fetch('http://localhost:8081/addCity', {
          method: 'POST',
          headers: {
                 'Content-type': 'application/json'
             },
          body: JSON.stringify({ name: newCity })

        })
        .then(res => res.json())
        .then(function(data) {
        document.getElementById('leaveDate').innerHTML = "Leaving Date : "  + strtDate
        document.getElementById('cityPlace').innerHTML = "Destination : "  + newCity 
        // document.getElementById('lat').innerHTML = "Latitude : " + data.geonames[0].lat
        // document.getElementById('lng').innerHTML = "Longitude : " + data.geonames[0].lng
        document.getElementById('countryName').innerHTML = "Country : " + data.geonames[0].countryName
        document.getElementById('population').innerHTML = "Population : " + data.geonames[0].population

     })

  
     await fetch('http://localhost:8081/weather')     
     .then(res => res.json())
     .then(function(res) {
         console.log(res);
        //  console.log(res.data[0]);
        const {weather} = res.data[0]
        const {description} = weather
        console.log(description);
        document.getElementById('temp').innerHTML = "Temperature : "  + res.data[0].temp
        document.getElementById('description').innerHTML = "Description : "  + description
    //     document.getElementById('description').innerHTML = "Description : "  + res.data[0].weather.main
     })

     // asynchronous fetch for city photo

     await fetch('http://localhost:8081/pixabay', {
     method: 'POST',
     headers: {
           'Content-type': 'application/json'
    },
      body: JSON.stringify({ text: newCity })
})     
    .then(res => res.json())
    .then(function(res) {
     console.log(res);
     const cityPic = res.hits[0].webformatURL
     console.log(cityPic);

    //  const div =document.createElement('div');
    //  div.style.width = "400px";
    //  div.style.height= "400px";
    //  div.innerHTML

    document.getElementById('cityPic').innerHTML =`<img src= "${cityPic}" "width="175px" height="400px"alt="an image that describee the city nature">`
 
  })

}

export {performAction}  
     