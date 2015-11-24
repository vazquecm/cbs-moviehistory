define(["jquery", "firebase", "q", "generalVariables"],
function ($, firebase, Q, generalVariables) {

	return function(){

		//deferred object for promise
		var deferred = Q.defer();

			//populate page with user movies
			require(["hbs!../templates/searchMovies"], function(logInTemplate){
                  $("#main_ouput").html(logInTemplate(generalVariables.getCurrentUserMovies()));

                  deferred.resolve();
             });

		return deferred.promise;
	};
	
});