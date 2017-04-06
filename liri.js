// **Todo: write a decent intro this time!

// Creates empty string to hold song title.
var songTitle = "";

// Creates empty string to hold movie title.
var movieTitle = "";

// Creates empty string to hold movie title.
var randomArgument = "";

var argument = "";

var action = process.argv[2];

doSomething(action, argument);

function doSomething(action, argument) {

	argument = getThirdArgument();

	switch (action) {
		case "my-tweets": 
		getMyTweets();
		break;

		case "spotify-this-song":
		
		// First get song title argument.
		songTitle = argument;

		if (songTitle === "") {
			lookupSpecificSong();
		} else {
			// Get song information from Spotify.
			getSongInfo(songTitle);
		}
		
		break;

		case "movie-this":

		// First get movie title argument.
		// **Todo: I must refactor this to have one function
		// That gets process.argv[3] for every action.
		// Realizing now that do-what-it-says won't work!
		movieTitle = argument;

		if (movieTitle === "") {
			getMovieInfo("Mr. Nobody");
		} else {
			getMovieInfo(movieTitle);
		}

		break;

		case "do-what-it-says": 
		
		randomArgument = argument;
		doWhatItSays(randomArgument);
		break;
	}
}

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

	// Access twitter API through twitter module.
	var Twitter = require("twitter");

	// Access twitter keys in keys.js.
	var twitterKeysFile = require("./keys.js");
	
	// Passes twitter keys into call to Twitter API.
	var client = new Twitter(twitterKeysFile.twitterKeys);

	// Search parameters includes my tweets up to last 20 tweets;
	var params = {q: '@MegginKearney', count: 20};

	// Shows last 20 tweets and when created in terminal.
	client.get('search/tweets', params, function(error, tweets, response) {
	  if (!error) {

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
}

//
// spotify-this-song
// command: node liri.js spotify-this-song '<song name here>'

// Shows the following information about the song in terminal:
// Artist(s)
// song's name
// preview link of song from Spotify,
// album song is from.
// If no song is provided, default to "The Sign" by Ace of Base.

function getSongTitle() {
	// Stores all the song title arguments in array.
	var songTitleArgument = process.argv;

	// Loops through words in node argument.
	// To be able to pass song title as a parameter to call to Spotify API.
	for (var i = 3; i < songTitleArgument.length; i++) {
		songTitle += songTitleArgument[i];
	}

	return songTitle;
}

function lookupSpecificSong() {

	// Access spotify API through spotify module.
	// ** Will most likely move all of these out of functions!
	var spotify = require("spotify");


	// Calls spotify API to retrieve a specific track, The Sign, Ace of Base.
	spotify.lookup({type: 'track', id: '3DYVWvPh3kGwPasp7yjahc'}, function(err, data) {
		if (err) {
			console.error(err);
			return
		}

		console.log(data);

		// Priting the artist, track name, preview url, and album name.
		console.log("Artist: " + data.artists[0].name);
		console.log("Song: " + data.name);
		console.log("Spotify preview URL: " + data.preview_url);
		console.log("Album name: " + data.album.name);
	});
}

function getSongInfo(songTitle) {

	// Access spotify API through spotify module.
	var spotify = require("spotify");

	console.log("Song title: " + songTitle);

	// Calls spotify API to retrieve a track.
	spotify.search({type: 'track', query: songTitle}, function(err, data) {
		if (err) {
			console.error(err);
			return
		}

		// **Todo: limit seems to be set to 20 no matter what!
		// ** I tried adding limit, as part of search parameters,
		// ** But it didn't seem to change things.
		// ** So instead of limit, I've forced a return of first item for track.
		// ** Seems like this could be better.
		// Also, might be nice to see more than one item for the track?
		var artistsArray = data.tracks.items[0].album.artists;

		// Need this array to be able to push artists names to it.
		var artistsNames = [];

		// Pushing artists for track to array.
		for (var i = 0; i < artistsArray.length; i++) {
			artistsNames.push(artistsArray[i].name);
		}

		// Converting artists array to string, and making it pretty.
		var artists = artistsNames.join(", ");

		// Priting the artist(s), track name, preview url, and album name.
		console.log("Artist(s): " + artists);
		console.log("Song: " + data.tracks.items[0].name)
		console.log("Spotify preview URL: " + data.tracks.items[0].preview_url)
		console.log("Album name: " + data.tracks.items[0].album.name);
	});
	
}


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

//function getMovieTitle() {

	// Stores all the song title arguments in array.
//	var movieTitleArgument = process.argv;

	// Loops through words in node argument.
	// To be able to pass song title as a parameter to call to Spotify API.
//	for (var i = 3; i < movieTitleArgument.length; i++) {
//		movieTitle += movieTitleArgument[i];
//	}

//	return movieTitle;
//}

function getMovieInfo(movieTitle) {
	console.log("We are getting the movie!" + movieTitle);

	// Include the request npm package.
	var request = require("request");

	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";
	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {
	  // If the request is successful
	  if (!error && response.statusCode === 200) {
	    
	    // Parse the body of the site and recover movie info.
	    var movie = JSON.parse(body);

	    console.log(movie);

	    // Print out movie info.
	    console.log("Movie Title: " + movie.Title);
	    console.log("Release Year: " + movie.Year);
	    console.log("IMDB Rating: " + movie.imdbRating);
	    console.log("Country Produced In: " + movie.Country);
	    console.log("Language: " + movie.Language);
	    console.log("Plot: " + movie.Plot);
	    console.log("Actors: " + movie.Actors);

	    // Need to use value in array,
	    // As rotten tomato rating value is always n/a.
	    // Seems like a little bug in API?
	    console.log("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
	    console.log("Rotten Tomatoes URL: " + movie.tomatoURL);
	  }
	});
}

// do-what-it-says
// command: node liri.js do-what-it-says
// Using the fs Node package, take the text inside random.txt,
// and use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way".
// Change text in that document to test out feature for other commands.
function doWhatItSays() {
	// Needed to read files. Not being used yet!
	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			console.error(err);
		} else {


			randomArray = data.split(",");


			console.log(randomArray);

			action = randomArray[0];

			console.log("Random Action: " + action);

			argument = randomArray[1];

			console.log("Random argument: " + argument);

			doSomething(action, argument);
		}
	});
}



// Bonus
// In addition to logging data to terminal,
// output data to .txt file called log.txt.
// Make sure to append each command run to the log.txt file.
// Do not overwrite your file each time you run a command.