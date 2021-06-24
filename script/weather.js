const fs = require("fs")
const axios = require('axios')

exports.getWeather = () => {
    axios.get('https://api.openweathermap.org/data/2.5/group?id=3181730,3174664,3166398,3165647,6539617,3178808,3172617,3178829&appid=118da32ae6600e2bc26a348e52bc4522&lang=it&units=metric')
        .then((response) => {
            data = JSON.stringify(response.data)
            return data
        })
        .then((data) => {
            fs.writeFile(__dirname + '/json/weather.json', data, 'utf8', (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Json Weather Saved")
                }
            })
        })

};