//Moduli npm
const express = require('express')
const fs = require('fs').promises
const axios = require('axios')

//Moduli Locali
const news = require('./script/news')
const weather = require('./script/weather')
const twit = require('./script/twit')

//parametri express
const app = express()
const port = 5000

//Inizializzo le variabili delle api a null
var weatherAPI = null
var newsAPI = null
var twitAPI = null

//Specifico che utilizzo ejs
app.set('views', './public')
app.set('view engine', 'ejs');

//Rotta Statica
app.use(express.static('public'))


//aggiorno i file json contenti i dati 
const update = async () => {
    weather.getWeather()
    news.getNews()
    twit.getTweet()

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

    } catch (err) {
        console.error('Error: ', err)
    }

}

//renderizzo la schermata home
const renderHome = async (req, res) => {

    await update() //aspetto che tutti i file vengano scaricati

    try {
        res.render('index', { twitt: twitAPI.statuses, weather: weatherAPI.list, articles: newsAPI.articles, centralContent: 'tweet', content: 'weather' })
    } catch (err) {
        res.render('index', { twitt: null, weather: null, articles: null, centralContent: 'tweet', content: 'weather' })
        console.error('Error: ', err)
    }
}

//renderizzo la geolocalizzazione
const renderGeo = async (req, res, navigator) => {

    await update() //aspetto che tutti i file vengano scaricati

    try {
        const lat = req.query.lat
        const lon = req.query.lon

        const result = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=118da32ae6600e2bc26a348e52bc4522&lang=it&units=metric')
            .then((response) => {
                return response
            })

        res.render('index', { twitt: twitAPI.statuses, articles: newsAPI.articles, city: result.data, centralContent: 'tweet', content: 'geolocation' })
    } catch {
        res.render('index', { twitt: twitAPI.statuses, articles: newsAPI.articles, city: null, centralContent: 'tweet', content: 'geolocation' })
    }


}

//gestisco index.ejs
app.get('/', renderHome)

//gestisco la visualizzazione dell'articolo selezionato
app.get('/article/:id', async (req, res) => {

    await update() //aspetto che tutti i file vengano scaricati

    const title = req.params['id']
    newsAPI = JSON.parse(await fs.readFile(__dirname + '/script/json/news.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }

        return data
    }))

    var indice = null
    newsAPI.articles.forEach((article, index) => {
        if (article.title === title) {
            indice = index
        }
    });


    res.render('index', { articles: newsAPI.articles, article: newsAPI.articles[indice], weather: weatherAPI.list, centralContent: 'news', content: 'weather' })
})

//gestisco la geolocalizzazione
app.get('/geolocation', renderGeo)


// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))