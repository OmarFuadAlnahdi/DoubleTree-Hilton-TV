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


    let witch = "PM";
   
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    let LocalTime ;
    

    

    if(hours < 10){
      hours = '0' + hours;
      
    }

    if(hours < 13){

      LocalTime = hours + ':' + minutes + ':' + seconds ;
    }
    if(hours > 12){

      hours = hours - 12;

      LocalTime = hours + ':' + minutes + ':' + seconds ;

    }
    

    

    document.getElementById("Local-Time").textContent = LocalTime; 
    console.log(LocalTime);

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
    
// functions usgaes //

NextPrayer();
showtime();


// onload functions only downbelow! //



setInterval(() => {
    location.reload();
    showtime();
    NextPrayer();

    
}, 900);










