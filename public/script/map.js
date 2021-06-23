var map;
var geoJSON;
var request;
var gettingData = false;
let openWeatherMapKey = "9a4587a0f83d35f36a7754df073c1553"


function initialize() {
    var mapOptions = {
        center: { lat: 46.264396692438055, lng: 9.85011883588303 },
        zoom: 9,
    };

    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    // Sets up and populates the info window with details
    map.data.addListener('click', function (event) {
        infowindow.setContent(
            "<img src=" + event.feature.getProperty("icon") + ">"
            + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
            + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
            + "<br />" + event.feature.getProperty("weather")
        );
        infowindow.setOptions({
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            },
            pixelOffset: {
                width: 0,
                height: -15
            }
        });
        infowindow.open(map);
    });

    getWeather();
}



// Make the weather request BassaValtellina
var getWeather = function () {
    gettingData = true;
    var requestString = "https://api.openweathermap.org/data/2.5/find?"
        +"lat=46.264396692438055&lon=9.85011883588303&cnt=40&lang=it&units=metric"
        + "&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();

    getWeather2();
};

// Make the weather request AltaValtellina
var getWeather2 = function () {
    gettingData = true;
    var requestString = "https://api.openweathermap.org/data/2.5/find?"
        + "lat=46.43618990709245&lon=10.358607931054953&cnt=40&lang=it&units=metric"
        + "&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();

    getWeather3();
};


// Make the weather request Valchiavenna
var getWeather3 = function () {
    gettingData = true;
    var requestString = "https://api.openweathermap.org/data/2.5/find?"
        + "lat=46.32122543089687&lon=9.402582084964186&cnt=30&lang=it&units=metric"
        + "&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
};

// Take the JSON results and proccess them
var proccessResults = function () {
    console.log(this);
    var results = JSON.parse(this.responseText);
    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
            geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        drawIcons(geoJSON);
    }
};

var infowindow = new google.maps.InfoWindow();

// For each result that comes back, convert the data to geoJSON
var jsonToGeoJson = function (weatherItem) {
    var feature = {
        type: "Feature",
        properties: {
            city: weatherItem.name,
            weather: weatherItem.weather[0].description, //italiano
            temperature: weatherItem.main.temp,
            min: weatherItem.main.temp_min,
            max: weatherItem.main.temp_max,
            humidity: weatherItem.main.humidity,
            pressure: weatherItem.main.pressure,
            windSpeed: weatherItem.wind.speed,
            windDegrees: weatherItem.wind.deg,
            icon: "http://openweathermap.org/img/w/"
                + weatherItem.weather[0].icon + ".png",
            coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
        },
        geometry: {
            type: "Point",
            coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
        }
    };
    // Set the custom marker icon
    map.data.setStyle(function (feature) {
        return {
            icon: {
                url: feature.getProperty('icon'),
                anchor: new google.maps.Point(25, 25)
            }
        };
    });

    // returns object
    return feature;
};

// Add the markers to the map
var drawIcons = function (weather) {
    map.data.addGeoJson(geoJSON);
    // Set the flag to finished
    gettingData = false;
};

// Clear data layer and geoJSON
var resetData = function () {
    geoJSON = {
        type: "FeatureCollection",
        features: []
    };
    /*map.data.forEach(function (feature) {
        map.data.remove(feature);
    });*/
};

google.maps.event.addDomListener(window, 'load', initialize);