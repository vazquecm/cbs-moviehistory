
//this module handles search feature that displays/ searches all movies connected with a user in firebase

define(["jquery", "firebase", "q", "generalVariables"], 
function ($, firebase, Q, generalVariables) {

	return function(){
		//set variable to hold user movies
		var userMovies = {};

		//create deferred object
		var deferred = Q.defer();

		//get current uid of user
		var currentUid = generalVariables.getCurrentUid();

		//reference to firebase data
		var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+currentUid+"/movies");

		//every time the module runs, do the following with the data in ref
		ref.on("value", function(snapshot) {

  			//set the current user movies
  			generalVariables.setCurrentUserMovies(snapshot.val());

			//resolve data returned
			deferred.resolve();
			
		});




		//return promise state
		return deferred.promise;


	}


});