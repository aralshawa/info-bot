/*
 * A very simple bot built with claudia-bot-builder.
 * Goal: A client that performs quick lookups based on a textual query.
 */

var botBuilder = require('claudia-bot-builder');

var bot = botBuilder(function(message) {
  return 'Hello world!';
});

module.exports = bot;

