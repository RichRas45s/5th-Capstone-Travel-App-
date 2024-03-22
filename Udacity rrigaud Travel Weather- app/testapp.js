const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const strtDate = document.getElementById('start').value

let count_down = new Date(`${strtDate}`).getTime();
let x = setInterval(() => countDown(), second);

function countDown() {
  let now = new Date(Date.now()).getTime();
  let diff = count_down - now;
 

  document.getElementById('days').innerText =  "Days left : "  +  Math.floor(diff / day);
  document.getElementById('hours').innerText = "Hours left : "  +  Math.floor(diff % day / hour);
  document.getElementById('minutes').innerText = "minutes left : "  +  Math.floor(diff % hour / minute);
  document.getElementById('seconds').innerText = "seconds left : "  +  Math.floor(diff % minute / second);
}


  clearInterval(x);
  let trip_start = document.form_main.tripStart.value;
  count_down = new Date(`${trip_start} 00:00:00`).getTime();
  x = setInterval(() => countDown(), second);
