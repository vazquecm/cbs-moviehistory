define(["jquery", "firebase", "q", "generalVariables"], 
	function($, firebase, Q, generalVariables){

	return function(indivMovie){
		var deferred = Q.defer();

		generalVariables.setCurrentMovieReturned(indivMovie);

      	deferred.resolve();


		return deferred.promise;
	}

});