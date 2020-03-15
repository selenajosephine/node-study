const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/399f47b1909ba2f6042da8815e1397ed/'+latitude+','+longitude;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } 
        else if ( response.body.error) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
            callback(undefined, {
                longitude: response.body.currently,
                // latitude: response.body.features[0].geometry.coordinates[1],
                // location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = forecast;