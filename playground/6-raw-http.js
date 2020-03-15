const https = require('https');
const url = 'https://api.darksky.net/forecast/399f47b1909ba2f6042da8815e1397ed/11.0168,76.9558';

const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    })
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })
})

request.on('error', (error)=>{
    console.log('error', error);
})
request.end();