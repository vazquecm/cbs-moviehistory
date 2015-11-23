//This module gets passed the title requested, searchs for it in the API database and, 
// if successful, returns the poster to be displayed on the page

define(["jquery", "firebase", "q"], 
function ($, firebase, Q) {

	return function(titeToAdd){

		//create differed object for promise
		 	 var deferred = Q.defer();

			//Need to replace the spaces in the title with "+" to get correct syntax
			// for the ajax call

			var str = titeToAdd;
			var formattedMovieTitle = str.split(' ').join('+');

			//using the passed in variable as the key, make an Ajax call to OMDb API to return object
			// containing movie data

			$.ajax({url: "http://www.omdbapi.com/?t=" + formattedMovieTitle + "&y=&plot=short&r=json"})
			.done(function(movieData) {
              deferred.resolve(movieData);
			  console.log("YAY!!! returned for the ajax call ", movieData);
            }).fail(function(xhr, status, error) {
              deferred.reject(error);
            });

		    //return state of promise
		    return deferred.promise;
		
					
			};

});