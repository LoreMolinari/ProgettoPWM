const express = require('express')
const fs = require('fs')
const axios = require('axios')

const news = require('./script/news')
const weather = require('./script/weather')

const app = express()
const port = 5000

let totalPages;
const maxPages = 50;
const pageSize = 10;

//Specifico che utilizzo ejs
app.set('views', './public')
app.set('view engine', 'ejs');

//Rotta Statica
app.use(express.static('public'))

/* Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)
app.use('/article', newsRouter)*/

//news.getNews();

/*ricevo le news
const goToNews = async (req, res, result) => {
    console.log(result)
    try{
        res.render('index.ejs', { articles: result.articles })
        
    } catch (err) {
        if (err.response) {
            res.render('index.ejs', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('index.ejs', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('index.ejs', { articles: null })
            console.error('Error', err.message)
        }
    }
    //res.render(__dirname + '/public/index.ejs', { title: "News Section", result: result });
}*/

const goToNews = async (req, res) => {
    try {
        const newsAPI = await axios.get('https://newsapi.org/v2/everything?q=Valtellina&sortBy=publishedAt&language=it&apiKey=e6a80fa766a64766a79e31bdfef38a6f')
            .then((response) => {
                return response
            })
        res.render('index', { articles: newsAPI.data.articles })
    } catch (err) {
        if (err.response) {
            res.render('index', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('index', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('index', { articles: null })
            console.error('Error', err.message)
        }
    }
}



//weather.getWeather()

//gestisco index.ejs
app.get('/', goToNews);




// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))