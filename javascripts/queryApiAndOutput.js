
//This module handles querying the api with a movie title and outputting results

define(["jquery", "firebase", "q", "bootstrapJs", "getMoviesFromAPI", "generalVariables"], 
  function($, firebase, Q,  bootstrapJs, getMoviesFromAPI, generalVariables) {

return function(){
  $("body").on("click", "#find_movies_btn", function(){
  		$("#find_movies_modal").modal();

  		//User enters title and searches
  		$("body").on("click", "#search_for_movies", function(){

	  		//Api returns movie data
  			getMoviesFromAPI()

	  		//output data via hbs file
  			.then(function(data){

  				//set the current movie
  				generalVariables.setCurrentMovieReturned(data);

  				console.log("currentMoveReturned: ", generalVariables.getCurrentMovieReturned());

  				console.log("checking data", data);
  				require(["hbs!../templates/findMovies"], function(logInTemplate){
                  $("#main_ouput").html(logInTemplate(data));
                 
                });

  				//remove extra modal styling if modal styling not cleared
                $(".modal-backdrop").remove();
                $("body").removeClass("modal-open");

  			});
  		});

  	});
  }
});