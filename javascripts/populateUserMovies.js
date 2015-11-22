define(["jquery", "firebase", "q", "generalVariables"],
function ($, firebase, Q, generalVariables) {

	return function(){

		console.log("inside the func");

		//deffered object for promise
		var deferred = Q.defer();

			require(["hbs!../templates/searchMovies"], function(logInTemplate){
                  $("#main_ouput").html(logInTemplate(generalVariables.getCurrentUserMovies()));

                  deferred.resolve();
             });

		return deferred.promise;
	}
	
})