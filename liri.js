require("dotenv").config();
const keys = require("./keys.js");
var axios = require("axios");
//const spotify = new Spotify(keys.spotify);

let inputString = process.argv;
let command = process.argv[2];
let search = "";

for(let i = 3; i<inputString.length; i++){
  if (i > 3 && i < inputString.length) {
    search = search + "+" + inputString[i];
  }
  else {
    search += inputString[i];
  }
}
let queryUrl = ""
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
  );
}
