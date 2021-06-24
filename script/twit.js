var Twit = require('twit')
const fs = require('fs')

var T = new Twit({
    consumer_key: 'uaU8quZ4IVxPgte2OmQvShjMv',
    consumer_secret: 'ctfNa9qt4ErmOXF62ZKivzEMarpEQAp7AmKC3O282Bfci65SQI',
    app_only_auth: true,
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
T.get('search/tweets', { q: 'Valtellina', count: 10 }, function (err, data, response) {
    fs.writeFile(__dirname + '/json/twitt.json', JSON.stringify(data), 'utf8', (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Json Tweet Saved")
        }
    })
})