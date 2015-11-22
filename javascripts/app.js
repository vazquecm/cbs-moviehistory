define(["jquery", "firebase", "lodash", "q", "loginandRegistrationHandler", "queryApiAndOutput", "allSearchFunctionality", "populateUserMovies", "createUserInFirebase", "loginAuth", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "addMovieToUser", "searchUserMovies", "changedUnwatchedToWatched"], 
  function($, firebase,  _, Q, loginandRegistrationHandler, queryApiAndOutput, allSearchFunctionality,  populateUserMovies, createUserInFirebase, loginAuth, bootstrapJs, getMoviesFromAPI, generalVariables, addMovieToUser, searchUserMovies, changedUnwatchedToWatched) {


  	//run login/registration functionality in loginandRegistrationHandler.js
    loginandRegistrationHandler();

 	  //handles querying API for movies and outputting them to page
    queryApiAndOutput();


  	// Handles adding a movie to firebase data list
 	$("body").on("click", "#add_movie_button", function(){		
  		//add movie to users movies list
 		   addMovieToUser();
  	});


  	// handler for searching movies, outputting, and changeing rating star styling
  	allSearchFunctionality();

    //handles filtering for watched movies
    $("body").on("click", "#watched_filter", function(){
        console.log("filterwatched now");
        $("#main_ouput .row").children(".unwatched").hide();
        $("#main_ouput .row").children(".watched").show();
    });

    // handles filtering for unwatched movies
    $("body").on("click", "#unwatched_filter", function(){
        console.log("filterwatched now");
        $("#main_ouput .row").children(".watched").hide();
        $("#main_ouput .row").children(".unwatched").show();
    });  

    //handles functionality for changing unwatched movies to watched
   changedUnwatchedToWatched();

    // handles functionality for adding ratings to firebase and coloring stars after click
    $("body").on("click", ".movies_btn span", function(){

      //get the star-x class of each element where x is a number 1-5
      var currentStarRating = $(this).attr("class").split(" ")[2];

      //split the string that returns the class and get only the number
      var numOfStar = currentStarRating.split("-")[1];

      //convert number to integer instead of string
      var finalNumber = parseInt(numOfStar);

      //get title of movie to add rating to
      var movieTitle = $(this).parent().parent().children("span")[0].innerHTML;

      //reference firebase location of current user
      var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());

      //reference to current movie rated within movie object within current user
      var movieReference = ref.child("movies").child(movieTitle);

      //change rating key in firebase to whatever star number was clicked on 
      movieReference.update({
        "rating": finalNumber
      });

      //Change css styles
      console.log("numOfStar ", numOfStar );

      console.log("this star", $(this));

      //clear colors in order to update colors with for loop
      $(this).parent().find($(".glyphicon")).css({"color": "#333"});

      for( var i = finalNumber; i > 0; i -= 1){
        console.log("i is now", i);
        $(this).parent().find($(".star-"+i)).css({"color": "goldenrod"});      
      }


    });


});