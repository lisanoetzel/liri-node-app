require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");



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

    var getMyMovie = function (movieName){
        if (!movieName){
            movieName = "Mr. Nobody"
        }
        axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy&")
            .then(function(response) {
                // If the axios was successful...log the body from the site!
                    //  console.log(response.data);
                     console.log(response.data.Title);
                     console.log(response.data.Year);
                     console.log(response.data.Rated);
                     console.log(response.data.imdbRating);
                     console.log(response.data.Country);
                     console.log(response.data.Language);
                     console.log(response.data.Plot);
                     console.log(response.data.Actors);
                })
            .catch (function (error) {
                     console.log(error)
            })
            
        }

//Bands in Town

    var getMyBand = function (band){
      
        axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
            .then(function(response) {
                // If the axios was successful...log the body from the site!
                    //  console.log(response.data);
                    response.data.forEach(function (event){
                        console.log(event.venue.name);
                        console.log(event.venue.city + ", " + event.venue.region);
                        console.log(moment(event.datetime).format("MM/DD/YYYY"));
                    })
                   
                    
                })
            .catch (function (error) {
                    console.log(error)
            })
            
        }
//Random text
// Get the Text from randm.txt -> Parse the text -> make a command + a search term -> run it in the runThis function
        var doWhatItSays = function(){
            //fs accesses/reads the local file & returns the file's contents as data
            fs.readFile("random.txt", "utf8", function(error, data){
                // console.log(data.split(",")); // "split" converts a string into a data array, which has a command & a search option 
                var dataArray = data.split(",");
                //this calls the pick function, which runs the commands
                pick(dataArray[0], dataArray[1]);
            })
        }

// The Switch statement that holds the different ARGUMENTS - Spotify, OMDB, Bands in Town - chosen by the user
var pick = function(caseData, functionData){
    switch(caseData){
        case 'spotify-this-song':
            getMySpotify(functionData);
            break;
        case 'movie-this':
            getMyMovie(functionData);
            break;
        case 'concert-this':
            getMyBand(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Liri does not know this');
    }
};

// This function passes the user chosen ARGUMENTS to the above PICK function
    // var runThis = function(argOne, argTwo){
    //     pick (argOne, argTwo);
    // };

    //Calling function - starting with argv[2] because argv[0] is word 'node'; argv[1] is the 'file' being run with node; SLICE is used to join multiple words (arguments) within array to a string
    // runThis(process.argv[2], process.argv.slice(3).join(" "))
    pick(process.argv[2], process.argv.slice(3).join(" "))