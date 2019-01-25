require("dotenv").config();
const keys = require("./keys.js");
let axios = require("axios");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

let inputString = process.argv;
let command = process.argv[2];
let search = "";

for(let i = 3; i<inputString.length; i++){
  if (i > 3 && i < inputString.length) {
    if(command === "movie-this"){
      search = search + "+" + inputString[i];
    }
    else{
      search = search + " " + inputString[i];
    }
  }
  else {
    search += inputString[i];
  }
}
let queryUrl = "";
if(command === "movie-this"){
  queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function(response) {
      const data = response.data;
      console.log("===================================");
      console.log(`Title: ${data.Title}`);
      console.log(`Release Date: ${data.Release}`);
      console.log(`IMDB rating: ${data.imdbRating}`);
      console.log(`Rotten Tomatoes rating: ${data.Ratings[1].Value}`);
      console.log(`Produced in: ${data.Country}`);
      console.log(`Languages: ${data.Language}`);
      console.log(`Plot: ${data.Plot}`);
      console.log(`Cast: ${data.Actors}`);
      console.log("===================================");
    }
  )
}

else if(command === "spotify-this-song"){
  spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  let spotifyData = data.tracks.items[0];
  let artists = "";
  for(let i = 0; i < spotifyData.artists.length; i++){
    if(i !== 0)
      artists = artists + ", " + spotifyData.artists[i].name;
    else
      artists = spotifyData.artists[i].name;
  }
  //console.log(spotifyData.album);
  console.log("============================");
  console.log(`Artist: ${artists}`);
  console.log(`Song Name: ${spotifyData.name}`);
  console.log(`Preview: ${spotifyData.preview_url}`);
  console.log(`Album: ${spotifyData.name}`);
  console.log("============================");
  });
}
