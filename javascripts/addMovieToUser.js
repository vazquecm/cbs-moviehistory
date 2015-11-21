
//This module handles adding a movie to a user under the movies key

define(["jquery", "firebase", "q", "generalVariables"], 
function ($, firebase, Q, generalVariables) {

	return function(){

		//create differed object for promise
		 var deferred = Q.defer();

		 //reference to firebase
		 var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());

		 var movieRef = ref.child("movies");

		 // get major actors and split them into array (api returns a string with each actor separated with a comma)
		 var majorActors = generalVariables.getCurrentMovieReturned().Actors.split(",");

		 //get movie title
		 var movieTitle = generalVariables.getCurrentMovieReturned().Title;

		 //get year released
		 var year = generalVariables.getCurrentMovieReturned().Year;

		 //get imdbId for later image output
		 var imdbID = generalVariables.getCurrentMovieReturned().imdbID;


		 movieRef.child(movieTitle).set({

    				majorActors : majorActors,
    				movieName: movieTitle,
    				rating: 0,
    				watched: false,
    				yearReleased: year,
    				imdbID: imdbID

    					
    		});
		
		//resolve data returned
		deferred.resolve();

		//return promise state
		return deferred.promise;
	}
});