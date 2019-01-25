require("dotenv").config();
const keys = require("./keys.js");
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

console.log(command);
console.log(search);