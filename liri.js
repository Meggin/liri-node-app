

// Needed to read files. Not being used yet!
var fs = require("fs");

// Access twitter API through twitter module.
var Twitter = require("twitter");

// Access twitter keys in keys.js.
var twitterKeysFile = require("./keys.js");

// Takes in my-tweets command.
var my%2Dtweets = process.argv[2];

// Passes twitter keys into call to Twitter API.
var client = new Twitter(twitterKeysFile.twitterKeys);

// Search parameters includes my tweets up to last 20 tweets;
var params = {q: '@MegginKearney', count: 20};

// Shows last 20 tweets and when created in terminal.
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {

  	// Check we can access tweets statuses array.
  	console.log(tweets.statuses);

  	// Loop through tweets and print out tweet text and create date.
  	for (var i = 0; i < tweets.statuses.length; i++) {
  		var tweetText = tweets.statuses[i].text;
  		console.log("Here's the tweet's text: " + tweetText);
  		var tweetCreationDate = tweets.statuses[i].created_at;
  		console.log("Here's the tweet's creation date: " + tweetCreationDate);
  	}
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
