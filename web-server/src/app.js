const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: 'Selena'
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: 'Selena'
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        content: "This is some helpful message",
        name: 'Selena'
    })
})

app.get("/weather", (req, res) => {
    res.send({ location: "Philadelphia", forecast: "mostly sunny" })
})

app.listen(3000, () => { console.log('Server is up at 3000') });