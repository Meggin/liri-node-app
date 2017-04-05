var fs = require("fs");
var Twitter = require("twitter");
var twitterKeysFile = require("./keys.js");

console.log("Can we see what's in keys?" + twitterKeysFile);

// Take in one of these commands:
//
// my-tweets
// command: node liri.js my-tweets
// Shows last 20 tweets and when they were created in terminal.

var mytweets = process.argv[2];

var client = new Twitter(twitterKeysFile.twitterKeys);

//var client = new Twitter({
	//consumer_key: 'AwjAXDZ28e8eGPvVHl6dHE51u',
	//consumer_secret: 'dbpifIyGR6viQ5cCDOyyKlPDDwoxmZvMbhH4LTuXLsrWvqieWb',
	//access_token_key: '3885326479-pYKYP7NfARIPh8fcseYNN8jsvjcW7a5kB0u7oiV',
	//access_token_secret: 'BimsVaruUP3k4JgvYcYN9xtqOVQDuQ1xKxKFfi3N2vf2t'
//});


var params = {q: 'node.js'};

client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else {
  	console.log(error);
  }
});
//
// spotify-this-song
// command: node liri.js spotify-this-song '<song name here>'
// Shows the following information about the song in terminal:
// Artist(s)
// song's name
// preview link of song from Spotify,
// album song is from.
// If no song is provided, default to "The Sign" by Ace of Base.
//
// movie-this
// command: node liri.js movie-this '<movie name here>'
// Shows the following information about the movie in the terminal:
// Title of the movie
// Year the movie came out
// IMDB raiging of the movie
// Country where the movie was produced
// Language of the movie
// Plot of the movie
// Actors in the movie
// Rotten Tomatoes rating
// Rotten Tomatoes URL
// If the user doesn't type a movie in, output data for movie, 'Mr. Nobody'. 
//
// do-what-it-says
// command: node liri.js do-what-it-says
// Using the fs Node package, take the text inside random.txt,
// and use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way".
// Change text in that document to test out feature for other commands.
//
// Bonus
// In addition to logging data to terminal,
// output data to .txt file called log.txt.
// Make sure to append each command run to the log.txt file.
// Do not overwrite your file each time you run a command.
