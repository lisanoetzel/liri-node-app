require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var axios = require("axios");


//SPOTIFY
var spotify = new Spotify(keys.spotify);
    var getArtistName = function(artist){
        return artist.name;
    }
var getMySpotify = function(songName){
    //setting up default response if no song chosen
    if (!songName) {
        songName = "The Sign by Ace of Base";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
         // console.log(data.tracks.items[0]);
    var songs = data.tracks.items
        for (var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistName));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('_______________________');
        }
      });
}

//OMDB

    //Creating empty variable for movie title
    var movieName = "";

    var getMyMovie = function (movieName){
        if (!movieName){
            movieName = "Mr. Nobody"
        }
         else {axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy&")
            .then(function(response) {
                // handle success
                console.log(response.data);
                })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }
        

// The Switch statement that holds the different ARGUMENTS - Spotify, OMDB, Bands in Town - chosen by the user
var pick = function(caseData, functionData){
    switch(caseData){
        case 'spotify-this-song':
            getMySpotify(functionData);
            break;
        case 'movie-this':
            getMyMovie(functionData);
        default:
            console.log('Liri does not know this');
    }
};

// This function passes the user chosen ARGUMENTS to the above PICK function
    var runThis = function(argOne, argTwo){
        pick (argOne, argTwo);
    };

    //Calling function - starting with argv[2] because argv[0] is word 'node'; argv[1] is the 'file' being run with node; SLICE is used to join multiple words (arguments) within array to a string
    runThis(process.argv[2], process.argv.slice(3).join(" "))}