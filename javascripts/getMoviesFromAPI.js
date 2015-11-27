
//This module handles calls to the api OMDB for movies

define(["jquery", "firebase", "q", "lodash"], 
function ($, firebase, Q, _) {

	return function(){

		//create differed object for promise
		 	 var deferred = Q.defer();

		//variable to hold string that we will pass to API
			var titleToPass;

		//capture user input for search
			var eneteredTitle = $("#search_for_movies").val();

			console.log("val entered is: ", eneteredTitle);

			//split the title that the user entered at every space character
			splitTitle = eneteredTitle.split(" ");

			console.log("splitTitle ", splitTitle);

			//pop the last space off if entered
			if(splitTitle[(splitTitle.length) - 1] === ""){
				console.log("this should be popped off");

				//should now remove this
				splitTitle.pop(splitTitle[(splitTitle.length) - 1]);
			}

			//if length is only 1, that means only one word was entered
			if(splitTitle.length === 1){

				//convert enetered word to lowercase, and set it as the title to pass to OMDB
				titleToPass = splitTitle[0].toLowerCase();

			//if the title enetered was more than 1 word
			} else {

				// rejoin the words with a "+" in between them (this is because the string must be put into the url on ajax request)
					//e.g.  when we request, "star wars", the request to the api in the url will include "star+wars"
				rejoinedTitle = splitTitle.join("+");

				//convert the rejoined string to lower case
				titleToPass = rejoinedTitle.toLowerCase();


			}
			console.log("titleToPass >>>>>>>>>>>>>>>>>", titleToPass);

		 $.ajax({

		 	//request movie detail of title entered
		 		//this returns all data for the movie such as title, etc, the movie poster is output via a hbs file img src link
		 			//e.g. see findMovies.hbs , and look at image in the ".img-wrap" div
		 	url: "http://www.omdbapi.com/?s="+titleToPass+"&y=&r=json"

		 	//need to get actors

		 	//after data is returned
		 }).done(function(data){

		 	var searchListObject = {}

		 	console.log("movie data returned", data);

		 	for(var i = 0; i < data.Search.length; i ++){
		 		console.log("data[i] ", data.Search[i]);
		 		searchListObject[data.Search[i].imdbID] = data.Search[i];
		 	}



		 	//resolve data returned
		 	deferred.resolve(searchListObject);
		 });

		//return promise state  sends us back to app.js where promise is first called ///
		return deferred.promise;
	}
});