var path = require('path');
var express = require('express');
var app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
    res.send({ location: "Philadelphia", forecast: "mostly sunny" })
})

app.listen(3000, () => {
    console.log('Server is up at 3000')
});