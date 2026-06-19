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

function deletechars(string){

   string = string.replace('{',"");
   string = string.replace('}',"");
   string = string.replace('"',"");
   string = string.replace('"',"");
   string = string.replace('"',"");
   string = string.replace('"',"");



    return string;


}




function showtime()
{


    let witch = "PM";
   
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
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

    const Timings = response.data.data.timings;
    document.getElementById("Next-Prayer").innerHTML = deletechars(JSON.stringify(Timings, null, 1))
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

showtime();
NextPrayer();

// onload functions only downbelow! //



setInterval(() => {
    showtime();
}, 500);

setInterval(() => {
    NextPrayer();
}, 1800000);








