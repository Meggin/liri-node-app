# liri-node-app

LIRI is a Language Interpretation and Recognition Interface.
Use LIRI to get your latest tweets, find out about a song,
or a movie, or just choose a random action from your own random file.

## Installs

The [package.json](https://github.com/Meggin/liri-node-app/blob/master/package.json)
lists dependent node packages, but for your convenvice, these are the ones to install.

### Twitter

`npm install twitter`

### Spotify

`npm install spotify`

### Request

`npm install request`

### FS

`npm install fs`

### Simple Node Logger

`npm install simple-node-logger`

## Get Started

Here's a quick rundom of the commands you can use in LIRI.

### Get Tweets

Retrieves up to your latest 20 tweets:

`node liri.js my-tweets`

### Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song "American Girl"`

### Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this "Star Wars"`

### Get Random Info

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`

