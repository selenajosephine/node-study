const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Salem', (error, data) => {
    if (error) { console.log('error', error); }
    if (data) { console.log('data', data); }
})

forecast(-75.7088, 44.1545, (error, data) => {
    if(error) console.log('Error', error)
    if(data) console.log('Data', data);
  })