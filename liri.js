require("dotenv").config();

// VARS
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


// Take two arguments.
// The first will be the action (i.e. "command", "option", etc.)

var option = process.argv[2];
var parameter = process.argv[3];

userInputs(option, parameter);

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
function userInputs(option, parameter) {
    switch (option) {
        case 'concert-this':
            ConcertInfo(parameter);
            break;

        case 'spotify-this-song':
            SongInfo(parameter);
            break;

        case 'movie-this':
            MovieInfo(parameter);
            break;

        case 'do-what-it-says':
            info();
            break;

        default:
            console.log("Invalid option.Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

userInputs(option, parameter);

//======================================== BANDS IN TOWN FUNCTION =============================================
function ConcertInfo(parameter) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
    console.log("ConcertInfo()", queryUrl);


    axios.get(queryUrl)
        .then(function (response) {
            var concerts = response.data;
            for (var i = 0; i < concerts.length; i++) {
                console.log("*****Event Info*****");
                fs.appendFileSync("log.txt", "*****Event Info*****\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n")
                console.log("Name of the Venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
                console.log("Venue Location:" + concerts[i].venue.city);
                fs.appendFileSync("log.txt", "Venue Location:" + concerts[i].venue.city + "\n");
                console.log("Date of Event" + concerts[i].venue.daytime + "\n");
                fs.appendFileSync("log.txt", "Date Of The Event:" + concerts[i].daytime + "\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************" + "\n");

            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

//======================================== FUNCTION FOR MOVIE INFO & ONDB API =============================================
function MovieInfo(parameter) {

    if (parameter === undefined) {
        inputParameter === "Mr Nobody"
        console.log("***************");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }

    // Request with AXIOS

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=full&apikey=46375a92";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Release Year: " + response.data.Title);
            fs.appendFileSync("log.txt", "Title:" + response.data.Title + "\n");
            console.log("Release Year: " + response.data.Year);
            fs.appendFileSync("log.txt", "Year:" + response.data.Year + "\n");
            console.log("Release Year: " + response.data.imdbRating);
            fs.appendFileSync("log.txt", "imbd:" + response.data.imdbRating + "\n");
            console.log("Release Year: " + response.data.Ratings[1]);
            fs.appendFileSync("log.txt", "Rotten Tomatoes:" + response.data.Ratings[1] + "\n");
            console.log("Release Year: " + response.data.Country);
            fs.appendFileSync("log.txt", "country:" + response.data.Country + "\n");
            console.log("Release Year: " + response.data.Language);
            fs.appendFileSync("log.txt", "Language:" + response.data.Language + "\n");
            console.log("Release Year: " + response.data.Plot);
            fs.appendFileSync("log.txt", "Plot:" + response.data.Plot + "\n");
            console.log("Release Year: " + response.data.Actors);
            fs.appendFileSync("log.txt", "Actors:" + response.data.Actors + "\n");
        })

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

};

//=============================function for music (Spotify)===============================================//


 function SongInfo(parameter){

    spotify.search({ type: 'track', query: parameter }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);

          return;
        }
       
  
      

      var songs = data.tracks.items;

                  for (var i = 0; i < songs.length; i++) {
                      console.log("************Song Info*********");
                      fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                      console.log(i);
                      fs.appendFileSync("log.txt", i + "\n");
                      console.log("Song name: " + songs[i].name);
                      fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                      console.log("Preview song: " + songs[i].preview_url);
                      fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                      console.log("Album: " + songs[i].album.name);
                      fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                      console.log("Artist(s): " + songs[i].artists[0].name);
                      fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                      console.log("*****************************");
                      fs.appendFileSync("log.txt", "*****************************\n")
      
                  }
                });
              }
