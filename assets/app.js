window.addEventListener("load", () => {
  let lat, lon;
  let temperatureDescription = document.querySelector(".description");
  let temperatureDegree = document.querySelector(".degree");
  let locationTimezone = document.querySelector(".location-timezone");
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
          locationTimezone.textContent = data.timezone;
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
});
