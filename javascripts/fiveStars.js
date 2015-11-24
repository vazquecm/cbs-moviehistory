//this module that goes through the user movies, outputting only those that have 5 star

define(["jquery", "firebase", "q", "bootstrapJs", "generalVariables"], 
  function($, firebase, Q, bootstrapJs, generalVariables) {

	return function(){
// Go through all movies in the users list and put the ones with 5 star ratings in an arrya
	var userMovies = generalVariables.getCurrentUserMovies();	console.log("RATING ");
	console.log("made it to fiveStars after generalVariables");
	console.log("rating ", this.rating);
// Need to sort through the object of movies to creat a new object with only movies containg a 5 star rating

	}
	// 	if (userMovies.movie.rating[i] === 5) {
	// 		favoriteMovies[i]
	// 	}	
	
});