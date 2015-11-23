
//This module handles querying the api with a movie title and outputting results when find movies button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "getMoviesFromAPI", "generalVariables"], 
  function($, firebase, Q,  bootstrapJs, getMoviesFromAPI, generalVariables) {

return function(){

  //when find movies button is clicked, show find movies modal
  // $("body").on("click", "#find_movies_btn", function(){
  		// $("#find_movies_modal").modal();

  		//User enters title and clicks search button
  		$(document).on("keyup", "#search_for_movies", function(e){

        if (e.keyCode === 13) {
        console.log("heard click for searching")
	  		//Api returns movie data
  			getMoviesFromAPI()

        //when data is returned
        .then(function(data){

          //set the current movie for use in other modules via generalVariables
          generalVariables.setCurrentMovieReturned(data);

          console.log("currentMoveReturned: ", generalVariables.getCurrentMovieReturned());
          console.log("checking data", data);

	  		//output data via hbs file
  				require(["hbs!../templates/findMovies"], function(logInTemplate){
                  $("#main_ouput").html(logInTemplate(data));
                 
                });

  				//remove extra modal styling if modal styling not cleared
                $(".modal-backdrop").remove();
                $("body").removeClass("modal-open");

  			  });
  		  };
    });
  };
});



