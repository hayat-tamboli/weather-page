let Time = document.querySelector(".time");
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  if (h == 00) {
    Time.innerHTML = 12 + ":" + m + " AM";
  } else if (h < 12) {
    Time.innerHTML = h + ":" + m + " AM";
  }
  else if(h==12){
    Time.innerHTML = h + ":" + m + " PM";
  }
  else{
    Time.innerHTML = h-12 + ":" + m + " PM";
  }
  var t = setTimeout(startTime, 10000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
window.addEventListener("load", () => {
  startTime();
  const preload = document.querySelector(".preload");
  preload.classList.add("preload-finish");
  let lat, lon;
  let temperatureDescription = document.querySelector(".description");
  let temperatureDegree = document.querySelector(".degree");
  let temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section h3");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/e1860b64a0659d4b8db4b7ecd8ba2840/${lat},${lon}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          let num = (temperature - 32) * (5 / 9);
          let celcius = num.toPrecision(4);
          temperatureDegree.textContent = celcius + "°";
          temperatureDescription.textContent = summary;
          //(x-32)*5/9 F=C
          //set icon
          setIcons(icon, document.querySelector(".icon"));
          temperatureSpan.textContent = "C";
          //changing from °F to °C and vice versa
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent == "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature + "°";
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = celcius + "°";
            }
          });
          function setIcons(icon, iconID) {
            const skycons = new Skycons({ color: "white" }); //creating a new object
            const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //for perfect syntax
            skycons.play(); //for animations
            return skycons.set(iconID, Skycons[currentIcon]);
          }
        });
    });
  } else {
    alert(
      "we can't show you the weather if u don't allow us to access your location"
    );
  }

  //for random quotes
  let quotes = document.querySelector(".quote-text");
  fetch(`https://quotes15.p.rapidapi.com/quotes/random/?language_code=en`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "quotes15.p.rapidapi.com",
		"x-rapidapi-key": "afb1d9f079msh8d9ad31bf2f8fa0p1cbe57jsn286d3344856f"
	}
})
.then(response => {
  return response.json();
})
.then(data =>{
  const {content}=data;
  quotes.textContent=`"${content}"`;
})
.catch(err => {
	console.log(err);
});
});
