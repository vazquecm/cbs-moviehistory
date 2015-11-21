
//This module handles calls to the api OMDB for movies

define(["jquery", "firebase", "q"], 
function ($, firebase, Q) {

	return function(){

		//create differed object for promise
		 	 var deferred = Q.defer();

		//capture user input for search
			var eneteredTitle = $("#find_move_input").val();

		 $.ajax({

		 	//request movie details
		 	url: "http://www.omdbapi.com/?t="+eneteredTitle+"&y=&r=json"

		 }).done(function(data){

		 	console.log("movie data returned", data);

		 	//resolve data returned
		 	deferred.resolve(data);
		 });

		//return promise state
		return deferred.promise;
	}
});