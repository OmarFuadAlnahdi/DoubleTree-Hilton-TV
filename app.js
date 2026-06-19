// creating vars //

const time = new Date();



// creating functions //

function print(string)
{
  console.log(string);
}

function reloadfunctions()
{
  showtime();
  NextPrayer();
}
function getPray(string){

    const prays = ["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];

    for (let i = 0; i < prays.length; i++) {
        if(string.includes(prays.at(i)))
        {
          return prays.at(i);
        }
    }


  return Pray;
}
function getTime(string)
{
  let Time = "00";

  return Time;

}

function deletechars(string){

   string = string.replace('{',"");
   string = string.replace('}',"");
   string = string.replace('"',"");
   string = string.replace('"',"");
   string = string.replace('"',"");
   string = string.replace('"',"");



    return string;


}

function filteringtheObject()
{
    let pray = getPray();
    let time = getTime();

    console.log(pray);
}



function showtime()
{
    var time = new Date();

    var hours = time.getHours();
    // get am/pm info BEFORE converting hours
    var ampm = hours >= 12 ? "PM" : "AM";

    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // 01, 02, 03, 04...
    hours = hours > 12 ? hours % 12 : hours; 
    hours = hours <= 9 ? '0' + hours: hours;

    // 01, 02, 03, 04.. 
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let LocalTime = hours + ':' + minutes + ':' + seconds +  ' ' + ampm;

    document.getElementById("local-time").innerHTML = LocalTime; 
    console.log(LocalTime);
    requestAnimationFrame(showtime);
}

function NextPrayer()
{

  let todayDate = time.getDay() + '-' + time.getMonth() + '-' + time.getFullYear();

  let params = {
    date: todayDate,
    latitude: 21.5435,
    longitude: 39.16
  };


  axios.get("https://api.aladhan.com/v1/nextPrayer",
    {params: params})
    .then((response) => {

      let count = 0;
      const Timings = response.data.data.timings;

      if(count == 0){
          document.getElementById("Next-Prayer").innerHTML = deletechars(JSON.stringify(Timings, null, 1));
          count++;
      }
      if (count == 1) {
        document.getElementsByClassName("Next-Prayer").innerHTML = deletechars(JSON.stringify(Timings, null, 1));
        count--;
      }

      console.log(Timings);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log("Request completed");
    });

}
    
// functions usages //

NextPrayer();
window.requestAnimationFrame(showtime);


// onload functions only //


setInterval(() => {
    location.reload();
    NextPrayer();
    
}, 15 * 60 * 1000);










