
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
		var allMovies = {};
		for (var key in snapshot.val())	{
			if (snapshot.val()[key]["deleted"] === true) {
				console.log("this will be deleted ");
				delete snapshot.val()[key];
			}
			else {
				allMovies[key] = snapshot.val()[key];
				console.log("this will be included");
			}
			// console.log("current movie is ", snapshot.val()[key]);
		}


  			//set the current user movies
  			generalVariables.setCurrentUserMovies(allMovies);

			//resolve data returned
			deferred.resolve();
			
		});
		//return promise state
		return deferred.promise;

	};

});