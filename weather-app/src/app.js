const request = require('request');
const url = 'https://api.darksky.net/forecast/399f47b1909ba2f6042da8815e1397ed/37.8267,-122.4233';

request({ url, json: true }, (err, response) => {
    if (err) console.log(err);
    //  console.log(response.body);
    console.log(response.body.daily.data[0].summary +
        ' It is currently ' + response.body.currently.temperature + ' degrees, and there is ' + (response.body.currently.precipProbability * 100) + '% chances of rain');
})

const locationUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2VsZW5ham9zZXBoaW5lIiwiYSI6ImNrNjU3NzN6cjA0eWszZGx2YjRudTlqcDUifQ.OQobJ_TStm-4k7V_cqT8AQ"
request({ url: locationUrl, json: true }, (err, response) => {
    if (err) console.log(err);
    const longitude = response.body.features[0].geometry.coordinates[0];
    const latitude = response.body.features[0].geometry.coordinates[1];
    console.log('latitude', latitude, 'longitude', longitude);
})

// user will give address => Lat/Long => Weather