require("dotenv").config();
var keys = require(".//keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var cmd = process.argv[2];
var queryJoined = process.argv.splice(3).join(" ");
var divider = "\n==================================================================\n";

function takeCmd() {
    if (cmd === "my-tweets") {
        myTweets();
    } else if (cmd === "spotify-this-song") {
        spotifyThisSong();
    } else if (cmd === "movie-this") {
        movieThis();
    } else if (cmd === "do-what-it-says") {
        doWhatItSays();
    } else {
        console.log("I'm afraid I can't do that.")
    };
};

function myTweets() {
    var maxTweets = 20;
    if (queryJoined === "") {
        var params = {screen_name: "Liri31970224"};
    } else {
        var params = {screen_name: queryJoined};  
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var outputArr = [];
            for (var i = 0; i < maxTweets; i ++) {
                console.log("Tweet: " + tweets[i].text);
                console.log("Created: " + tweets[i].created_at);
                outputArr.push("Tweet: " + tweets[i].text + "\nCreated: " + tweets[i].created_at + "\n"); 
            };
            outputJoined = outputArr.join("");
            fs.appendFile("log.txt", outputJoined + divider + "\n", function(err) {
                if (err) throw err;
            });
        };
    });
};

function spotifyThisSong() {
    if (queryJoined === "") {
        queryJoined = "Ace of Base The Sign";
    } else {}
    spotify
    .search({ type: "track", query: queryJoined, limit: "1"})
    .then(function(response) {
        // console.log(JSON.stringify(response.tracks.items[0], null, 2));
        console.log("Track: " + response.tracks.items[0].name);
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("Link: " + response.tracks.items[0].external_urls.spotify);
        fs.appendFile("log.txt", "Track: " + response.tracks.items[0].name + "\nArtist: " + response.tracks.items[0].artists[0].name + "\nAlbum: " + response.tracks.items[0].album.name + "\nLink: " + response.tracks.items[0].external_urls.spotify + "\n" + divider + "\n", function(err) {
            if (err) throw err;
        });
    }).catch(function(err) {
        console.log(err);
    });
};

function movieThis() {
    if (queryJoined === "") {
        var queryURL = "https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    } else {
        var queryURL = "https://www.omdbapi.com/?t=" + queryJoined + "&y=&plot=short&apikey=trilogy";
    };
    request(queryURL, function (error, response, body) {
        if (error) {
            console.log('error:', error);
        } else if (!error && response.statusCode === 200) {
            // console.log('statusCode:', response && response.statusCode);
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            fs.appendFile("log.txt", "Title: " + jsonData.Title + "\nYear: " + jsonData.Year + "\nIMDB Rating: " + jsonData.imdbRating + "\nRotten Tomatoes Rating: " + jsonData.Ratings[1].Value + "\nCountry: " + jsonData.Country + "\nLanguage: " + jsonData.Language + "\nPlot: " + jsonData.Plot + "\nActors: " + jsonData.Actors + "\n" + divider + "\n", function(err) {
                if (err) throw err;
            });
        };
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        } else {
            var allCmds = data.split("\n");
            console.log(allCmds)
            for (var i = 0; i < allCmds.length; i++) {
                data = allCmds[i];
                if (data.includes(",")) {
                    var textArr = data.split(",");
                    cmd = textArr[0];
                    var textQuery = textArr[1];
                    var textQueryArr = textQuery.split(" ");
                    var textQueryJoined = textQueryArr.join(" ");
                    queryJoined = textQueryJoined;
                    takeCmd();
                } else {
                    cmd = data;
                    queryJoined = "";
                    takeCmd();
                };
            };
        };
    });
};

takeCmd();