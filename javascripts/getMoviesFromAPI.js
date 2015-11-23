
//This module handles calls to the api OMDB for movies

define(["jquery", "firebase", "q"], 
function ($, firebase, Q) {

	return function(){

		//create differed object for promise
		 	 var deferred = Q.defer();

		//variable to hold string that we will pass to API
			var titleToPass;

		//capture user input for search
			var eneteredTitle = $("#find_move_input").val();

			console.log("val entered is: ", eneteredTitle);

			//split the title that the user entered at every space character
			splitTitle = eneteredTitle.split(" ");

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

		 $.ajax({

		 	//request movie detail of title entered
		 		//this returns all data for the movie such as title, etc, the movie poster is output via a hbs file img src link
		 			//e.g. see findMovies.hbs , and look at image in the ".img-wrap" div
		 	url: "http://www.omdbapi.com/?t="+titleToPass+"&y=&r=json"

		 	//after data is returned
		 }).done(function(data){

		 	console.log("movie data returned", data);

		 	//resolve data returned
		 	deferred.resolve(data);
		 });

		//return promise state
		return deferred.promise;
	}
});