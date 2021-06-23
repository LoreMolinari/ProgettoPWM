const fs = require("fs")
const axios = require('axios')

exports.getWeather = () => {
    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=46.4684&lon=10.3721&exclude=minutely,hourly,alerts&appid=118da32ae6600e2bc26a348e52bc4522&lang=it&units=metrics')
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