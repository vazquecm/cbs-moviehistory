
//This module handles adding a movie to a user under the movies key

define(["jquery", "firebase", "q", "generalVariables"], 
function ($, firebase, Q, generalVariables) {

	return function(data){

		console.log("data check   >>>>>>>>>>>>>>>>>>>", data);

		//create differed object for promise
		 var deferred = Q.defer();

		 //reference to firebase
		 var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());

		 //reference movies object in current user object
		 var movieRef = ref.child("movies");

		 //get actors in string form
		 var actorString = data.Actors;

		 // get major actors and split them into array (api returns a string with each actor separated with a comma)
		 //The line below isnt working because it doesnt have actors, what we need to do then is
		 	//get id of parent div after add is clicked, do another query for that, then pass that to this module

		 var majorActors = data.Actors.split(",");

		 console.log("majorActors", majorActors );

		 //get plot
		 var plot = data.Plot;


		 //get movie title
		 var movieTitle = data.Title;

		 //get year released
		 var year = data.Year;

		 //get imdbId for later image output
		 var imdbID = data.imdbID;

//// this code looks exacly like how the firebase database looks/nested  ///
		 movieRef.child(movieTitle).set({

    				majorActors : majorActors,
    				actorString: actorString,
    				plot: plot,
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
	};
});