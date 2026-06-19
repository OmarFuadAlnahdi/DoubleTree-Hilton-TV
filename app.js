


const time = new Date();

time.toLocaleTimeString('en-US',{
        minute:'2-digit',
        second:'2-digit',
        hour:'2-digit'
    });

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let LocalTime = hours + ':' + minutes + ':' + seconds ;
    












let params = {
    
    date: "18-6-2026",
    city: "Jeddah",
    country: "SA"
}


axios.get("https://api.aladhan.com/v1/timingsByCity",
    {params: params})
  .then((response) => {

    let Timings = response.data.data.timings;
    console.log(response.data.data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request completed");
  });


// this is for the local time //

document.getElementById("Local-Time").innerHTML = LocalTime;

document.getElementById("Next-Prayer").innerHTML = Timings.Fajr;



