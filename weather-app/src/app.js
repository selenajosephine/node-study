const request = require('request');
const url = 'https://api.darksky.net/forecast/399f47b1909ba2f6042da8815e1397ed/37.8267,-122.4233';

request({ url, json: true }, (err, response) => {
    if (err) console.log(err);
    console.log(response.body.currently.precipProbability);
    console.log('it is currently ' + response.body.currently.temperature + ' degrees, and there is '+ (response.body.currently.precipProbability*100)+ '% chances of rain');
})