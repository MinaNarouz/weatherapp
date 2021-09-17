/* Global Variables */
let box = document.querySelector("#feelings");
let btn = document.getElementById("generate");

// Saving the API key in a variable
const api_key = '889730c3fbd99d674ae8abb23d7ff98c';

// This is function to run the alerts in case needed
function alerting(){
    alert("Please fill in text area/s in Red");
}

//Declaring function used later to check if user inserted the blanks area or not
function checkEntries(value, stringId){
    if (value === ""){
        document.getElementById(stringId).classList.add('wrongentry');
        return 1;
    }else {
        document.getElementById(stringId).classList.remove('wrongentry');
        return 0;
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

/* Event for the button and second argument as async function to fetch the API Url based on my KEY
also in the same function I used two functions above to ensure correct inputs */
btn.addEventListener('click', async () => {
    let zipCode = document.getElementById("zip").value;
    let countryCode = document.getElementById("country").value;
    let feelLike = document.getElementById("feelings").value;
    const apiFullUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${api_key}&units=metric`;

// Saving the return value of each function in Array.
    let errorReturn = [checkEntries(zipCode, "zip"), checkEntries(countryCode, "country"), checkEntries(feelLike, "feelings")];
// Using array returns to display the alert but ensuring to be displayed ones not based on count of functions.
    if (errorReturn[0] === 1 || errorReturn[1] === 1 || errorReturn[2] === 1){
        alerting();
    }

    // fetching the URL and returning its value as JSON to be able to get the temp from it
    let res = await fetch (apiFullUrl);
    let responseWithTemp = await res.json();
    let temp = responseWithTemp.main.temp;

  // Using try to make a post with the data
   try{
    await fetch("/saveAll", {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feelings: feelLike
        }) 
      });
      const reviewData = await fetch("/get_weather")
      const reviewDataJson = await reviewData.json()

      // Displaying the output of the fetch made in the text area at the button of page in <p> element inside the divs.
      document.getElementById("date").innerHTML = `<p>${reviewDataJson.date}</p>`
      document.getElementById("temp").innerHTML = `<p>${reviewDataJson.temp}</p>`
      document.getElementById("content").innerHTML = `<p>${reviewDataJson.feelings}</p>`

      // Catching errors just in case happened, to be logged for a review.
    }catch(err){
        console.log("ERROR", err);
    }
});
