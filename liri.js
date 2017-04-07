/* LIRI is a Language Interpretation and Recognition Interface.
It takes in an action request and an optional argument,
such as a movie-title, both using node's process.argv.

Action requests include retrieving tweets from Twitter API,
song information from Spotify API, and movie information from OMDB.
LIRI also calls out to a random text file that can include any action or argument.

LIRI includes logging support both to the console and an output file, log.txt.
It uses the npm node module, 'simple-node-logger', for it's logging solution.
*/ 

// Required NPM modules and files.
// ____________________________________________________________________________________

// NPM module used to access Twitter API.
var Twitter = require("twitter");

// Used to access Twitter keys in local file, keys.js.
var twitterKeysFile = require("./keys.js");

// NPM module used to access Spotify API.
var spotify = require("spotify");

// NPM module used to access OMDB API.
var request = require("request");

// NPM module used to read the random.txt file.
var fs = require("fs");

// Output file for logs.
var filename = './log.txt';

// NPM module used for logging solution.
var log = require('simple-node-logger').createSimpleFileLogger( filename );

// All log information printed to log.txt.
log.setLevel('all');

// Controller and required parameters.
// ____________________________________________________________________________________


// Action requested.
var action = process.argv[2];

// Optional argument to request specific information.
// Based on action type.
var argument = "";

// Controller function that determines what action is taken,
// and specific data to complete that action.
doSomething(action, argument);

// Switch operation used to determin which action to take.
function doSomething(action, argument) {

	/* Controls optional third argument.
	Defines specific data relating to the action.
	For example, when requesting song information,
	you can pass in a song title.
	*/ 
	argument = getThirdArgument();

	switch (action) {
		
		// Gets list of tweets.
		case "my-tweets": 
		getMyTweets();
		break;

		// Gets song information.
		case "spotify-this-song":
		
		// First gets song title argument.
		var songTitle = argument;

		// If no song title provided, defaults to specific song.
		if (songTitle === "") {
			lookupSpecificSong();

		// Else looks up song based on song title.
		} else {
			// Get song information from Spotify.
			getSongInfo(songTitle);
		}
		break;

		// Gets movie information.
		case "movie-this":

		// First gets movie title argument.
		var movieTitle = argument;

		// If no movie title provided, defaults to specific movie.
		if (movieTitle === "") {
			getMovieInfo("Mr. Nobody");

		// Else looks up song based on movie title.
		} else {
			getMovieInfo(movieTitle);
		}
		break;

		// Gets text inside file, and uses it to do something.
		case "do-what-it-says": 
		doWhatItSays();
		break;
	}
}

// Returns optional third argument, for example,
// when requesting song information, include a song title.
function getThirdArgument() {

	// Stores all possible arguments in array.
	argumentArray = process.argv;

	// Loops through words in node argument.
	for (var i = 3; i < argumentArray.length; i++) {
		argument += argumentArray[i];
	}
	return argument;
}

// Function to show my last 20 tweets.
function getMyTweets() {
	
	// Passes Twitter keys into call to Twitter API.
	var client = new Twitter(twitterKeysFile.twitterKeys);

	// Search parameters includes my tweets up to last 20 tweets;
	var params = {q: '@MegginKearney', count: 20};

	// Shows up to last 20 tweets and when created in terminal.
	client.get('search/tweets', params, function(error, tweets, response) {
	  if (!error) {

	  	// Loops through tweets and prints out tweet text and creation date.
	  	for (var i = 0; i < tweets.statuses.length; i++) {
	  		var tweetText = tweets.statuses[i].text;
	  		logOutput("Tweet Text: " + tweetText);
	  		var tweetCreationDate = tweets.statuses[i].created_at;
	  		logOutput("Tweet Creation Date: " + tweetCreationDate);
	  	}
	  } else {
	  	logOutput(error);
	  }
	});
}

// Calls Spotify API to retrieve song information for song title.
function getSongInfo(songTitle) {

	// Calls Spotify API to retrieve a track.
	spotify.search({type: 'track', query: songTitle}, function(err, data) {
		if (err) {
			logOutput.error(err);
			return
		}

		/* The Spotify node module defaults to 20 no matter what.
		Attempted to add a limit, which seems to do nothing.
		Homework requirements suggest we should only return one song.
		Used array properties to retrict songs returns.
		There could very well be a better way to do this.
		But it's as close to requirements I could get using Spotify module.
		*/
		var artistsArray = data.tracks.items[0].album.artists;

		// Array to hold artist names, when more than one artist exists for a song.
		var artistsNames = [];

		// Pushes artists for track to array.
		for (var i = 0; i < artistsArray.length; i++) {
			artistsNames.push(artistsArray[i].name);
		}

		// Converts artists array to string, and makes it pretty.
		var artists = artistsNames.join(", ");

		// Prints the artist(s), track name, preview url, and album name.
		logOutput("Artist(s): " + artists);
		logOutput("Song: " + data.tracks.items[0].name)
		logOutput("Spotify Preview URL: " + data.tracks.items[0].preview_url)
		logOutput("Album Name: " + data.tracks.items[0].album.name);
	});
	
}

// When no song title provided, defaults to specific song, The Sign.
function lookupSpecificSong() {

	// Calls Spotify API to retrieve a specific track, The Sign, Ace of Base.
	spotify.lookup({type: 'track', id: '3DYVWvPh3kGwPasp7yjahc'}, function(err, data) {
		if (err) {
			logOutput.error(err);
			return
		}

		// Prints the artist, track name, preview url, and album name.
		logOutput("Artist: " + data.artists[0].name);
		logOutput("Song: " + data.name);
		logOutput("Spotify Preview URL: " + data.preview_url);
		logOutput("Album Name: " + data.album.name);
	});
}

// Passes a query URL to OMDB to retrieve movie information for movie title.
// If no movie title provided, defaults to the movie, Mr. Nobody.
function getMovieInfo(movieTitle) {

	// Runs a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers movie info.
	    var movie = JSON.parse(body);

	    // Prints out movie info.
	    logOutput("Movie Title: " + movie.Title);
	    logOutput("Release Year: " + movie.Year);
	    logOutput("IMDB Rating: " + movie.imdbRating);
	    logOutput("Country Produced In: " + movie.Country);
	    logOutput("Language: " + movie.Language);
	    logOutput("Plot: " + movie.Plot);
	    logOutput("Actors: " + movie.Actors);

	    // Had to set to array value, as there seems to be a bug in API response,
	    // that always returns N/A for movie.tomatoRating.
	    logOutput("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
	    logOutput("Rotten Tomatoes URL: " + movie.tomatoURL);
	  }
	});
}

// Uses fs node package to take the text inside random.txt,
// and do something with it.
function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			action = randomArray[0];

			// Sets optional third argument to second item in array.
			argument = randomArray[1];

			// Calls main controller to do something based on action and argument.
			doSomething(action, argument);
		}
	});
}

// Logs data to the terminal and output to a text file.
function logOutput(logText) {
	log.info(logText);
	console.log(logText);
}