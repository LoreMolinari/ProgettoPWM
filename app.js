const express = require('express')
const fs = require('fs').promises
const axios = require('axios')

const news = require('./script/news')
const weather = require('./script/weather')

const app = express()
const port = 5000

//Specifico che utilizzo ejs
app.set('views', './public')
app.set('view engine', 'ejs');

//Rotta Statica
app.use(express.static('public'))

/* Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)
app.use('/article', newsRouter)*/

weather.getWeather()
news.getNews()

const renderHome = async (req, res) => {
    try {
        twitAPI = JSON.parse(await fs.readFile(__dirname + '/script/json/twitt.json', 'utf8', (error, data) => {
            if (err) {
                console.error(err)
            }

            return data
        }))


        weatherAPI = JSON.parse(await fs.readFile(__dirname + '/script/json/weather.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            }

            return data
        }))


        newsAPI = JSON.parse(await fs.readFile(__dirname + '/script/json/news.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            }

            return data
        }))
        res.render('index', { twitt: twitAPI.statuses, weather: weatherAPI.list, articles: newsAPI.articles })
    } catch (err) {
        res.render('index', { twitt: null, weather: null, articles: null })
        console.error('Error: ', err)
    }
}

const renderGeo = async (req, res) => {
    if (navigator.geolocation) {
        try {
            const position = navigator.geolocation.getCurrentLocation()
            const lat = position.coords.latitude
            const lon = position.coords.longitude

            const result = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=118da32ae6600e2bc26a348e52bc4522&lang=it&units=metric')
            .then((response) => {
                return response
            })

            console.log(result)
        } catch {

        }
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    
}

//gestisco index.ejs
app.get('/', renderHome)

app.get('/geolocation', renderGeo)


// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))