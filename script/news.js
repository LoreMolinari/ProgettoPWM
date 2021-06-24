const fs = require("fs")
const axios = require('axios')

exports.getNews = () => {
    axios.get('https://newsapi.org/v2/everything?q=Valtellina&sortBy=publishedAt&language=it&apiKey=e6a80fa766a64766a79e31bdfef38a6f')
        .then((response) => {
            data = JSON.stringify(response.data)
            return data
        })
        .then((data) => {
            fs.writeFile(__dirname + '/json/news.json', data, 'utf8', (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Json News Saved")
                }
            })
        })

};