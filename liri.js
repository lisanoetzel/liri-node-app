require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
 
var getArtistName = function(artist){
    return artist.name;
}

var getMySpotify = function(songName){
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

// The Switch statement that holds the different ARGUMENTS chosen by the user
var pick = function(caseData, functionData){
    switch(caseData){
        case 'spotify-this-song':
            getMySpotify(functionData);
            break;
        default:
            console.log('Liri does not know this');
    }
}

// This function passes the user chosen ARGUMENTS to the above PICK function
    var runThis = function(argOne, argTwo){
        pick (argOne, argTwo);
    };

    //Calling function - starting with argv[2] because argv[0] is word 'node' and argv[1] is the 'file' being run ith node
    runThis(process.argv[2], process.argv[3]);