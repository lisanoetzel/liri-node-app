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

    // Creating empty variable for movie title
    // var movieName = "";

    // var getMyMovie = function (movieName){
    //     if (!movieName){
    //         movieName = "Mr. Nobody"
    //     }
    //     axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy&")
    //         .then(function(response) {
    //             // If the axios was successful...log the body from the site!
    //                  console.log(response.data);
    //             })
    //         .catch(function (error) {
    //             // The request was made, the server responded with a status code                     that falls out of the range of 2xx
    //                  console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                // } else if (error.request) {
                    // The request was made, no response was received `error.request` is an object that comes back with details pertaining to the error that occurred.
                        // console.log(error.request);
                // } else {
                    // Something happened in setting up the request that triggered an Error
                //     console.log("Error", error.message);
                //     }
                //     console.log(error.config);
                // }
    //         .finally(function () {
    //             // always executed
    //         });

    // }
        

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
    runThis(process.argv[2], process.argv.slice(3).join(" "))