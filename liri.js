require("dotenv").config();
var keys = require(".//keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var cmd = process.argv[2];
var queryArr = [];
var queryJoined = "";
var queryJoinedPlus = "";

function takeCmd() {
    takeQuery();
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

function takeQuery() {
    for (var i = 3; i < process.argv.length; i++) {
        queryArr.push(process.argv[i]);
    };
    queryJoined = queryArr.join(" ");
    queryJoinedPlus = queryArr.join("+");
};

function myTweets() {
    var maxTweets = 20;
    var params = {screen_name: 'Liri31970224'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets[0]);
            for (var i = 0; i < maxTweets; i ++) {
                console.log("Tweet: " + tweets[i].text);
                console.log("Created: " + tweets[i].created_at);
            };
        };
    });
};

function spotifyThisSong() {
    if (queryJoined === "") {
        queryJoined = "The Sign";
        spotify
        .search({type: "track", query: queryJoined})
        .then(function(response) {
            // console.log(JSON.stringify(response.tracks.items[7], null, 2));
            console.log("Track: " + response.tracks.items[7].name);
            console.log("Artist: " + response.tracks.items[7].artists[0].name);
            console.log("Album: " + response.tracks.items[7].album.name);
            console.log("Link: " + response.tracks.items[7].external_urls.spotify);
        }).catch(function(err) {
            console.log(err);
        });
    } else {
        spotify
        .search({ type: "track", query: queryJoined, limit: "1"})
        .then(function(response) {
            // console.log(JSON.stringify(response.tracks.items[0], null, 2));
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("Link: " + response.tracks.items[0].external_urls.spotify);
        }).catch(function(err) {
            console.log(err);
        });
    };
};

function movieThis() {
    var queryURL = "https://www.omdbapi.com/?t=" + queryJoinedPlus + "&y=&plot=short&apikey=trilogy";
    if (queryJoinedPlus === "") {
        queryURL = "https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
        request(queryURL, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else if (!error && response.statusCode === 200) {
            // console.log('statusCode:', response && response.statusCode);
            // console.log('body:', JSON.parse(body));
            console.log('Title:', JSON.parse(body).Title);
            console.log('Year:', JSON.parse(body).Year);
            console.log('IMDB Rating:', JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
            console.log('Country:', JSON.parse(body).Country);
            console.log('Language:', JSON.parse(body).Language);
            console.log('Plot:', JSON.parse(body).Plot);
            console.log('Actors:', JSON.parse(body).Actors);
            };
        });
    } else {
        request(queryURL, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else if (!error && response.statusCode === 200) {
            // console.log('statusCode:', response && response.statusCode);
            // console.log('body:', JSON.parse(body));
            console.log('Title:', JSON.parse(body).Title);
            console.log('Year:', JSON.parse(body).Year);
            console.log('IMDB Rating:', JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
            console.log('Country:', JSON.parse(body).Country);
            console.log('Language:', JSON.parse(body).Language);
            console.log('Plot:', JSON.parse(body).Plot);
            console.log('Actors:', JSON.parse(body).Actors);
            };
        });
    };
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        } else {
            // var allCmds = data.split("\n");
            // console.log(allCmds);
            if (data.includes(",")) {
            var textArr = data.split(",");
            cmd = textArr[0];
            var textQuery = textArr[1];
            var textQueryArr = textQuery.split(" ");
            queryArr = textQueryArr;
            var textQueryJoined = queryArr.join(" ");
            var textQueryJoinedPlus = queryArr.join("+");
            queryJoined = textQueryJoined;
            queryJoinedPlus = textQueryJoinedPlus;
            } else {
                cmd = data;
            };
            console.log(cmd);
            // console.log(queryArr);
            // console.log(queryJoined);
            // console.log(queryJoinedPlus);
            takeCmd();
        };
    });
};

takeCmd();