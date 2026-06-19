
function print(string)
{
  console.log(string);
}

// function GetTheNextPrayer(extend){

//     const prayers = ["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
   
//     for (let index = 0; index < prayers.length; index++) {
//       const element = prayers[index];
//       if( == element)
//         {
//             return element;
//         }
//     }
// }

const time = new Date();

function showtime()
{
  time.toLocaleTimeString('en-US',{
        minute:'2-digit',
        second:'2-digit',
        hour:'2-digit',
        hour12:true
    });
  

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let LocalTime = hours + ':' + minutes + ':' + seconds ;

    document.getElementById("Local-Time").innerText = LocalTime;
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
    document.getElementById("Next-Prayer").innerHTML = Timings;
    console.log(Timings);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request completed");
  });



}
    





    














// this is for the local time //





window.onload = function () {

  setInterval(showtime, 500); 
}

window.onload = function () {

  setInterval(NextPrayer,1000000);   // 3,600,000 = 1hour // 1,800,000 = half hour;
}




