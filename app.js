// creating vars //

const time = new Date();


const hours = new Date().getHours();
const period = hours >= 12 ? "PM" : "AM";






// creating functions //

function print(string)
{
  console.log(string);
}

function displayWeather(idName,value)
{

  document.getElementById(idName).textContent = value;

}
function GetWaether()
{

  let params = {
    
    place_id : "Jeddah",
    sections : "all",
    timezone : "UTC",
    language: "en",
    units : "metric",
    key: "ouem5egroff2vzapxempbe1arny08kb2mt7zbim3"

};


axios.get("https://www.meteosource.com/api/v1/free/point",
  {params : params})
  .then((response) => {

    let temperature = response.data.hourly.data[0].temperature;
    console.log(temperature);
    displayWeather("weather-C",temperature);
   

  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    // console.log("Request completed for weather");
  });




  
  

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
function DisplayContext(localtime,weatherTemp){


   document.getElementById("Local-Time").textContent = localtime;

   document.getElementById("weather-C").textContent = weatherTemp;


   
   


  // document.getElementById("Next-prayer-name").textContent = 
  
}

function getThePrayer(string)
{
  let temp = "";

  let arrayOfAddan = ["Fajr","Dhuhr","Asr","Maghrib","Isha"];
  for (let i = 0; i < arrayOfAddan.length; i++) {

     if (Object.keys(string).includes(arrayOfAddan[i])) {
        temp = arrayOfAddan[i];
     }
    
  }
  
  return temp;

}

function printTheTimeFormatedPrayer(string)
{

  let timeformatted = "";

  let temp = getThePrayer(string);

  if (temp == "Fajr") {
     timeformatted = string.Fajr;
  }
  if (temp == "Dhuhr") {
     timeformatted = string.Dhuhr;
    }
     
  if (temp == "Asr") {
     timeformatted =  string.Asr;
    }
     
  if (temp == "Maghrib") {
     timeformatted =string.Maghrib;
  }
  if (temp == "Isha") {
     timeformatted = string.Isha;
  }

  return timeformatted;


}

function showtime()
{
  // this one is already formatted so we can't changed something otherwise it's included with PM or AM ;
  const formatted = time.toLocaleTimeString('en-US', {
  hour:'2-digit',
  minute: '2-digit',
  hour12: true
});

    // this one need to include pm or am but you free to count because it's int value not string;
      return formatted;
}

function add0Totheleft(hours,minutes)
{
  let temptime ;
  let hourS;
  let mintueS;

  if (hours < 10) {

       hours = '0' + hours;
  }
  if(minutes < 10) {

      minutes = '0' + minutes;
  }

  temptime = hours + ':' + minutes;

  return temptime;
 

}

function displayDate()
{
    let date = new Date();
    
    const result = date.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month:"long",
          year:"numeric"
});



    
    document.getElementById("Date").textContent = result;
}

function displayAdhanTime(idName,string){

  let adhantime =  printTheTimeFormatedPrayer(string);


  
  const [hours1, minutes1] = adhantime.split(":").map(Number);


  

  document.getElementById(idName).textContent = add0Totheleft(hours1,minutes1) + ' ' + period;

}

function displayAdhanName(idName,string)
{
  let adhanName = getThePrayer(string);
  console.log(adhanName);

  document.getElementById(idName).textContent = adhanName;
}

function displayReminingTime(string)
{
   let adhantime =  printTheTimeFormatedPrayer(string);

   const [hours1, minutes1] = adhantime.split(":").map(Number);

  let Time1 = new Date();
  let hours = Time1.getHours();
  let minutes = Time1.getMinutes();
  let remainingHours ;
  let remainingMinutes ;

  
  remainingHours = hours1 - hours ;
  
  remainingMinutes = minutes1 - minutes;


  if (remainingHours < 0) {
    remainingHours = Math.abs(remainingHours);
  }
  if(remainingMinutes < 0){
    remainingMinutes = Math.abs(remainingMinutes);
  }

  
  
  
  print(remainingHours + ":" + remainingMinutes);

  document.getElementById("Remaining").textContent = remainingHours + ":" + remainingMinutes;








}



function NextPrayer(){

  
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
    
    let Timings = response.data.data.timings;
    displayAdhanName("Next-Prayer-name",Timings);

    displayAdhanTime("Adhan-Time",Timings);

    displayReminingTime(Timings);

    

    
    
    
    

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
DisplayContext(showtime(),GetWaether());
displayDate();


// onload functions only downbelow! //


setInterval(() => {
    location.reload();  
    NextPrayer();
    GetWaether();

    
}, 300000);










