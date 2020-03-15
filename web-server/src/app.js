var express = require('express');
var app = express();

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.get("/help", (req, res) => {
    res.send("Help Page")
});

app.get("/about", (req, res) => {
    res.send("About page")
});

app.get("/showweather", (req, res) => {
    res.send("Your Weather")
})

app.listen(3000, () => {
    console.log('Server is up at 3000')
});