define(["jquery", "firebase", "lodash", "q", "loginandRegistrationHandler", "queryApiAndOutput", "allSearchFunctionality", "bootstrapJs", "addMovieToUser", "changedUnwatchedToWatched", "addRatingsandColorStars"], 
  function($, firebase,  _, Q, loginandRegistrationHandler, queryApiAndOutput, allSearchFunctionality, bootstrapJs, addMovieToUser, changedUnwatchedToWatched, addRatingsandColorStars) {


  	//run login/registration functionality in loginandRegistrationHandler.js
    loginandRegistrationHandler();

 	  //handles querying API for movies and outputting them to page when Find movies button is clicked
    queryApiAndOutput();


  	// Handles adding a movie to firebase data list when any "add" button is clicked below a movie poster when finding movies
 	  $("body").on("click", "#add_movie_button", function(){		
  		//add movie to users movies list
 		   addMovieToUser();

      //after movie is added, reload the screen with movies from the users database
       allSearchFunctionality();
 
  	});
/// ??? # 16 somewhere we need to get off the "add" screen so user knows something happened //
    // when search moves button is clicked, run searchUserMovies.js module
    // THIS IS THE NEW "ALL" BUTTON!!!
    // when user clicks on All, all movies in their DB are displayed
    $("body").on("click", "#all_user_movies", function(){

  	// handler for searching movies, outputting, and changing rating star styling
  	   allSearchFunctionality();
    });

    //handles filtering for watched movies using the searchMovies.hbs template to assign a class of "watched" and "unwatched" ///
    $("body").on("click", "#watched_filter", function(){

        //hide anything with unwatched class
        $("#main_ouput .row").children(".unwatched").hide();

        //show anything with watched class
        $("#main_ouput .row").children(".watched").show();
    });

    // handles filtering for unwatched movies
    $("body").on("click", "#unwatched_filter", function(){

        //hide anything with watched class
        $("#main_ouput .row").children(".watched").hide();

        //show anything with unwatched class
        $("#main_ouput .row").children(".unwatched").show();
    });  

    //handles functionality for changing unwatched movies to watched
   changedUnwatchedToWatched();

    // handles functionality for adding ratings to firebase and coloring stars when 'search my movies buttn in clicked'
      //other functionality for dynamically changing stars color after search my movies is already populated is in 'allSearchFunctionality.js'
   addRatingsandColorStars();

});