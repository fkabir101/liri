require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

let inputString = process.argv;
let command = process.argv[2];
let search = "";

for(let i = 3; i<inputString.length; i++){
  if (i > 3 && i < inputString.length) {
    if(command === "movie-this"){
      search = search + "+" + inputString[i];
    }
    else if(command === "band-this"){
      search = search + "%20" + inputString[i];
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
  queryUrl = `http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`;
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
  );
}
else if(command === "concert-this"){
  queryUrl = `https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`;
  axios.get(queryUrl).then(
    function(response) {
      const data = response.data[0];
      const time = data.datetime.replace("T", " ");
      const convertedTime = moment(time, "YYYY-MM-DD HH:mm:ss").format("MMM Do, YYYY hh:mmA");
      console.log("===================================");
      console.log(`Venue Name: ${data.venue.name}`);
      console.log(`Venue Location: ${data.venue.city}, ${data.venue.region}`);
      console.log(`Date: ${convertedTime}`);
      console.log("===================================");
    }
  );
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
  console.log("============================");
  console.log(`Artist: ${artists}`);
  console.log(`Song Name: ${spotifyData.name}`);
  console.log(`Preview: ${spotifyData.preview_url}`);
  console.log(`Album: ${spotifyData.name}`);
  console.log("============================");
  });
}
