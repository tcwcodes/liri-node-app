# liri-node-app

Liri is a Node app that looks up and displays information based on commands and queries the user enters into the terminal. JSON data is obtained and displayed via the terminal and continuously logged to a file called log.txt. If the user does not enter a query, Liri chooses one for the user. The user must supply their own .env file containing their API keys.

Commands / queries accepted by Liri:
    spotify-this-song / song title or query : returns information about the queried song
    movie-this / movie title or query : returns information about the queried movie
    my-tweets / username : returns the user's last 20 tweets
    do-what-it-says : runs commands / queries saved into a file called random.txt

Packages used in Liri:
    Spotify
    Twitter
    Request
    Fs

APIs:
    OMDB
