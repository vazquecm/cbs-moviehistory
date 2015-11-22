define(["jquery", "firebase", "lodash", "q", "loginandRegistrationHandler", "queryApiAndOutput", "allSearchFunctionality", "bootstrapJs", "addMovieToUser", "changedUnwatchedToWatched", "addRatingsandColorStars"], 
  function($, firebase,  _, Q, loginandRegistrationHandler, queryApiAndOutput, allSearchFunctionality, bootstrapJs, addMovieToUser, changedUnwatchedToWatched, addRatingsandColorStars) {


  	//run login/registration functionality in loginandRegistrationHandler.js
    loginandRegistrationHandler();

 	  //handles querying API for movies and outputting them to page
    queryApiAndOutput();


  	// Handles adding a movie to firebase data list
 	$("body").on("click", "#add_movie_button", function(){		
  		//add movie to users movies list
 		   addMovieToUser();
  	});


  	// handler for searching movies, outputting, and changing rating star styling
  	allSearchFunctionality();

    //handles filtering for watched movies
    $("body").on("click", "#watched_filter", function(){
        $("#main_ouput .row").children(".unwatched").hide();
        $("#main_ouput .row").children(".watched").show();
    });

    // handles filtering for unwatched movies
    $("body").on("click", "#unwatched_filter", function(){
        $("#main_ouput .row").children(".watched").hide();
        $("#main_ouput .row").children(".unwatched").show();
    });  

    //handles functionality for changing unwatched movies to watched
   changedUnwatchedToWatched();

    // handles functionality for adding ratings to firebase and coloring stars when 'search my movies buttn in clicked'
      //other functionality for dynamically changing stars color after search my movies is already populated is in 'allSearchFunctionality.js'
   addRatingsandColorStars();

});