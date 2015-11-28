// This module has getters and setters for variables that need to be used accross the app in different modules
define(["jquery"], 
	
function ($) {

	var currentUid;
	var currentUser;
	var currentMovieReturned;
	var currentUserMovies;


	//return an objected with various getters and setters
	return {

		getCurrentUid: function(){
			return currentUid;
		},

		setCurrentUid: function(value){
			currentUid = value;
		},

		getCurrentUser: function(){
			return currentUser;
		},

		setCurrentUser: function(value){
			currentUser = value;
		},

		getCurrentMovieReturned : function(){
			return currentMovieReturned;
		},

		setCurrentMovieReturned : function(value){
			currentMovieReturned = value;
		},

		getCurrentUserMovies: function(){
			return currentUserMovies;
		},

		setCurrentUserMovies: function(value){
			currentUserMovies = value;
		}

	};

});