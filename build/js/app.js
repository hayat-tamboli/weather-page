const preload = document.querySelector(".preload");

const information = document.querySelector(".information");
let openClose = 0;
const info = async () => {
  if(openClose%2==0)
  information.classList.replace("info-closed", "info-open");
  else
  information.classList.replace("info-open", "info-closed");

  openClose++;
};
let Time = document.querySelector(".time");
let startTime = async () => {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  if (h == 00) {
    Time.innerHTML = 12 + ":" + m + " AM";
  } else if (h < 12) {
    Time.innerHTML = h + ":" + m + " AM";
  } else if (h == 12) {
    Time.innerHTML = h + ":" + m + " PM";
  } else {
    Time.innerHTML = h - 12 + ":" + m + " PM";
  }
  var t = setTimeout(startTime, 10000);
  function theme(hour) {
    if (hour >= 16) {
      document.querySelector("body").classList.replace("morning", "evening");
    }
  }
  theme(h);
};
let checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
};
window.addEventListener("offline", () => {
  startTime();
  alert("you are offline");
  preload.classList.add("preload-finish");
});
window.addEventListener("load", () => {
  startTime();
  preload.classList.add("preload-finish");
  let lat, lon;
  let temperatureDescription = document.querySelector(".description");
  let temperatureDegree = document.querySelector(".degree");
  let temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section h3");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/e1860b64a0659d4b8db4b7ecd8ba2840/${lat},${lon}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
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
    const locationOFF = document.querySelector(".locationOFF");
    locationOFF.textContent = "please turn on your location";
  }

  //for random quotes

  let quotesText = document.querySelector(".quote-text");
  let quotesAuthor = document.querySelector(".quote-author");
  fetch(`https://favqs.com/api/qotd`, {})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { body, author } = data.quote;
      quotesText.textContent = `"${body}"`;
      quotesAuthor.textContent = `-${author}`;
    })
    .catch((err) => {
      console.log(err);
    });

  //covid-19 cases in india

  const totalCases = document.querySelector(".total-cases");
  const deaths = document.querySelector(".deaths");
  const recovered = document.querySelector(".recovered");
  fetch(
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=India",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "afb1d9f079msh8d9ad31bf2f8fa0p1cbe57jsn286d3344856f",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const {
        total_cases,
        total_deaths,
        total_recovered,
      } = data.latest_stat_by_country[`${0}`];
      totalCases.textContent = "TC-" + total_cases;
      deaths.textContent = "D-" + total_deaths;
      recovered.textContent = "R-" + total_recovered;
    })
    .catch((err) => {
      console.log(err);
    });
});
