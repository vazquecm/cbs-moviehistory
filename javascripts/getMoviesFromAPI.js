
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

			splitTitle = eneteredTitle.split(" ");

			if(splitTitle.length === 1){

				titleToPass = splitTitle[0].toLowerCase();

			} else {

			rejoinedTitle = splitTitle.join("+");

			titleToPass = rejoinedTitle.toLowerCase();

			}

		 $.ajax({

		 	//request movie details
		 	url: "http://www.omdbapi.com/?t="+titleToPass+"&y=&r=json"

		 }).done(function(data){

		 	console.log("movie data returned", data);

		 	//resolve data returned
		 	deferred.resolve(data);
		 });

		//return promise state
		return deferred.promise;
	}
});