// Using the permissions API to make a function that allows geolocation permission if user wishes.
function handlePermission() {
    navigator.permissions.query({
        name: 'geolocation'
    }).then(function (result) {
        if (result.state == 'granted') {
            report(result.state);
        } else if (result.state == 'prompt') {
            report(result.state);
            navigator.geolocation.getCurrentPosition(revealPosition, positionDenied, geoSettings);
        } else if (result.state == 'denied') {
            report(result.state);
        }
        result.addEventListener('change', function () {
            report(result.state);
        });
    });
}

function report(state) {
    console.log('Permission ' + state);
}

handlePermission();

// using geolocation API to get the user's current lat and long
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
// using the users location in weather api fetch to get relevant data
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let key = "d29562ea3b7db5e9961939c42b0220cd";
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

    fetch(api)
        .then(res => {
            return res.json()
        })
        .then(data => {
            
            const sevenDay = $('#sevenDay')


            var fday = "";
            data.daily.forEach((value, index) => {
                if (index > 0 && index < 4) {
                    var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
                        weekday: "long",
                    });
                    var icon = value.weather[0].icon;
                    var temp = value.temp.day.toFixed(0);
                    var tempnight = value.temp.night.toFixed(0);
                    var humidity = value.humidity.toFixed(0);
                    var uvi = value.uvi.toFixed(1);

                    fday = `<div class="box has-background-white forecast-day is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
						<p class="subtitle is-4 is-underlined has-text-weight-bold">${dayname}</p>
						<figure class="image is-64x64 "><img src="http://openweathermap.org/img/w/${icon}.png" alt="${icon}"></figure>
						<div class="forecast-day--temp"><p>Day Temp: ${temp}<sup>\u00B0 F</sup></p></div>
                        <div class="forecast-day--temp"><p>Night Temp: ${tempnight}<sup>\u00B0 F</sup></p></div>
                        <div class="forecast-humidity"><p>Humidity: ${humidity}%</p></div>
                        <div class="forecast-uvi"><p>UV index: ${uvi}</p></p>
                        
					</div>`;
                    sevenDay[0].insertAdjacentHTML('beforeend', fday);
                }
            });


        })
        .catch(error => console.log('Dun goofed again...'))


}
getLocation()