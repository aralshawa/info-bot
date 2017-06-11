/*
 * A very simple bot built with claudia-bot-builder.
 * Goal: A client that performs quick lookups based on a textual query.
 */

var botBuilder = require('claudia-bot-builder');

var greeting = require('greeting');
var fetch = require('node-fetch');
var weather = require("weather-js")

const WEATHER_REGEX = /(weather|forecast)/gi

// Bot - - -
var bot = botBuilder(function(message) {
  let msg = message.text;
  if (msg.match(WEATHER_REGEX)) {
    let targetLocation = msg.replace(WEATHER_REGEX,'');
    return requestWeather(targetLocation, 'C').then((response) => {
      return response;
    });
  } else if (msg.match(/quote/i)) {
    return fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en').then(function(res) {
      return res.text();
    });
  } else {
    return greeting.random();
  }
});

/*
 * Weather Utility
 */
function requestWeather(query, unit) {
  return new Promise((resolve, reject) => {
    weather.find({search: query, degreeType: unit}, function(err, result) {
      var response = null;

      if (err == null && result && result.length > 0) {
        let targetLoc = result[0]
        let current = targetLoc.current
        var forecast = targetLoc.forecast

        // Current weather
        response = targetLoc.location.name + "\n";
        response += "Currently, " + current.skytext + " " + current.temperature + "°C\n"

        if (forecast.length >= 3) {
            // If at least a 3 day forecast is avaialble
            // Note: [0, 1, 2, ...] => [yesturday, today, tomorrow, ...]
            let today = forecast[1]
            response += "High " + today.high + "°C | Low " + today.low + "°C"

            let tomorrow = forecast[2]
            response += "\n\nTomorrow's Forecast \n"
            response += tomorrow.skytextday + "\n"
            response += "High " + tomorrow.high + "°C | Low " + tomorrow.low + "°C"
        }

      } else {
        response = "Sorry, the weather in '" + query +"' couldn't be found.";
      }

      resolve(response)
    });
  });
}

module.exports = bot;
