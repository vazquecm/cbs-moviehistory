define(["jquery", "firebase", "lodash", "q", "setCurrentMovie", "loginandRegistrationHandler", "queryApiAndOutput", "allSearchFunctionality", "bootstrapJs", "addMovieToUser", "changedUnwatchedToWatched", "addRatingsandColorStars", "searchUserMovies", "fiveStars", "generalVariables", "colorStars", "modalOutput"], 
  function($, firebase,  _, Q, setCurrentMovie, loginandRegistrationHandler, queryApiAndOutput, allSearchFunctionality, bootstrapJs, addMovieToUser, changedUnwatchedToWatched, addRatingsandColorStars, searchUserMovies, fiveStars, generalVariables, colorStars, modalOutput) {


  	//run login/registration functionality in loginandRegistrationHandler.js
    loginandRegistrationHandler();

 	  //handles querying API for movies and outputting them to page when movie is searched for
    queryApiAndOutput();

  	// Handles adding a movie to firebase data list when any "add" button is clicked below a movie poster when finding movies
 	  $("body").on("click", "#add_movie_button", function(){	

        var title = $(this).parent().attr("id");

        var splitTitle = title.split("_")[1];

        console.log("splitTitle ", splitTitle);


        //ajax call here for imdb id

        $.ajax({
          url: "http://www.omdbapi.com/?i="+splitTitle+"&plot=short&r=json"

        }).done(function(data){

          console.log("data is ", data);

      		//add movie to users movies list
      		  addMovieToUser(data);
            
          //after movie is added, reload the screen with movies from the users database
           allSearchFunctionality();
        });
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

// if the favorites filter is clicked, then show all movies on the users DB that have a 5 star rating
    $("body").on("click", "#user_favorites", function(){

      console.log("heard favorite click");
     // checking for 5 star rating star and outputting movie favorites
             //hide anything with watched class

      searchUserMovies()
      .then(function(){
    //this calls a module that filters for only 5 star favorites and then output them 
    console.log("Made it to fiveStars calls");
        fiveStars()
    console.log("back from fiveStars call");
      });
    });


    //handles functionality for changing unwatched movies to watched
   changedUnwatchedToWatched();

    // handles functionality for adding ratings to firebase and coloring stars when 'search my movies buttn in clicked'
      //other functionality for dynamically changing stars color after search my movies is already populated is in 'allSearchFunctionality.js'
   addRatingsandColorStars();

    //handles removing movie from a user's movies object in firebase
   $("body").on("click", ".glyphicon-remove", function(){

      //get title
      var titleToRemove = $(this).parent().parent().find(".hiddenSpanId").html();

      //reference movie location
      var refOfMovie = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid()+"/movies/"+titleToRemove);

      //remove movie from firebase
      refOfMovie.remove();

      //remove from page
      $(this).parent().parent().remove();

      $("#existingMovieModal").modal("hide");
   });


   //handles modal display for movies when a poster is clicked
    modalOutput();

    //handles logout 
    /// this functionality allows the user to log out of firebase and then it brings the user to initial login/register page ///
  $("body").on("click", "#logOut", function(){

    var ref = new Firebase("https://cbs-moviehistory.firebaseio.com");

    ref.unauth();

    generalVariables.setCurrentUid("");

    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }

    require(["hbs!../templates/splash"], function(logInTemplate){
                  $("#mainContainer").html(logInTemplate());
                });
    
  });



  

});