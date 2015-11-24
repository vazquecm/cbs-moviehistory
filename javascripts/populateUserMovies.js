define(["jquery", "firebase", "q", "generalVariables"],
function ($, firebase, Q, generalVariables) {

	return function(){

		console.log("I made it to populate user");

		//deferred object for promise
		var deferred = Q.defer();
		
        console.log("user object: ", generalVariables.getCurrentUserMovies());


			//populate page with user movies
			require(["hbs!../templates/searchMovies"], function(logInTemplate){
                  $("#main_ouput").html(logInTemplate(generalVariables.getCurrentUserMovies()));

                  deferred.resolve();
             });

		return deferred.promise;
	}
	
})