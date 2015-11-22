//Configure require dependencies and paths
requirejs.config({
	baseUrl: "./javascripts",
	paths:{
		"jquery": "../lib/bower_components/jquery/dist/jquery.min",
		"hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
		"bootstrapJs": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
		"firebase": "../lib/bower_components/firebase/firebase",
		"lodash": "../lib/bower_components/lodash/lodash.min",
		'q': '../lib/bower_components/q/q'
	},
  shim: {
		bootstrapJs : {
		  deps : ['jquery'],
		  exports: 'Bootstrap'
		},
		firebase: {
		  exports: "Firebase"
		}
  }
});

//, createUserInFirebase, Q

require(["jquery", "firebase", "lodash", "q", "populateUserMovies", "createUserInFirebase", "loginAuth", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "addMovieToUser", "searchUserMovies"], 
  function($, firebase,  _, Q, populateUserMovies, createUserInFirebase, loginAuth, bootstrapJs, getMoviesFromAPI, generalVariables, addMovieToUser, searchUserMovies) {


  	/// inject splash.hbs template to the index.html page ///
  	require(["hbs!../templates/splash"], function(logInTemplate){
                  $("#mainContainer").append(logInTemplate());
                 
                });
  	/// this event listens on the body of the page for click event on the log in button ///
  	$("body").on("click","#logInButton", function(){
  		console.log("working");
  		$("#splash_panel").hide();
  		/// using fadeIn ("slow") makes a smoother transition from one panel to another //
  		$("#login_panel").fadeIn("slow");
  	});

  	$("body").on("click", "#logInSubmit", function(){
  		loginAuth()
  		.then(function(){

  			require(["hbs!../templates/main"], function(logInTemplate){
                  $("#mainContainer").html(logInTemplate());
                 
                });

  			console.log("user object: ", generalVariables.getCurrentUser());
  			console.log("user uid: ", generalVariables.getCurrentUid());

  		});
  	});
  	

  	$("body").on("click","#registerButton", function(){
  		console.log("working");
  		$("#splash_panel").hide();
  		/// using fadeIn ("slow") makes a smoother transition from one panel to another //
  		$("#register_panel").fadeIn("slow");
  	});

  	$("body").on("click", "#registerSubmit", function(){
  		console.log("are we working");
  			//run createUserInFirebase.js module
	 		createUserInFirebase().then(function(){

	 			//// injecting the log in button from logInButton.hbs ///
	 			require(["hbs!../templates/logInButton"], function(logInTemplate){
                  $("#register_panel").append(logInTemplate());

        /// injecting statement of successful registration and now letting user to log in to site ///        
                });
	 			require(["hbs!../templates/successfulRegister"], function(logInTemplate){
                  $("#register_panel").prepend(logInTemplate());
                 
                });
	 		});


  	});

  	$("body").on("click", "#registerPanelLogIn", function(){
  		console.log("here we should run log in module");
  		$("#register_panel").hide();
  		$("#login_panel").fadeIn("slow");
  	});
 	
 	//call createUserInFirebase.js module when create button is clicked
 	$("#createButton").click(function(){

 		//run createUserInFirebase.js module
	 	createUserInFirebase()

	 	//after promise is returned from createUserInFirebase.js 
	 	.then(function(returnedUid){
	 		//returnedUID above ^^ returns uid of current created user

	 		alert("congrats");

	 		//attach event handler to login button for testing (this needs to be refactored to happen as an option instead of having to create new user)
	 		$("#loginButton").click(function(){

	 			//call loginAuth.js module and pass in the uid of current user
	 			loginAuth(returnedUid)

	 			//when promise is returned from loginAuth.js
	 			.then(function(){
	 				alert("logged in");
	 			});
	 		});
	 	});
 	});

 	//To be modularized, but for now this handles querying API for movies and output
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

  	//To be modularized, but currently handles adding a movie to firebase list
 	$("body").on("click", "#add_movie_button", function(){
  		
  		//add movie to users movies list
 		addMovieToUser();

  	});


  	//event handler for searchMovies click
  	$("body").on("click", "#search_movies_btn", function(){
  		console.log("search them movies");
  		searchUserMovies()
  		.then(function(){
  			console.log("its time to see current user movies ", generalVariables.getCurrentUserMovies());
        
        return populateUserMovies()
        
       })

        //after movies are populated, color in appropriate star ratings
       .then(function(){

          //get all star button parent divs into an array
          var ratings = $(".hiddenSpanRating");

          // console.log("ratings", ratings);

          for(var i = 0; i < ratings.length; i ++){

            //get inner html of span that holds rating
            var currentRating = ratings[i].innerHTML;

            //get integer value of current rating
            var parsedRating = parseInt(currentRating);

            //if a movie rating is greater than zero
            if(parsedRating > 0){
              // console.log("currentdivwith rating", ratings[i]);

              //get id of parent div for reference
              var parentOfRating = ratings[i].parentNode.getAttribute("id");

              // console.log($("#"+parentOfRating).find($(".stars_btn")).children());

              for(var x = currentRating; x > 0; x -= 1){

              //color appropriate stars
              $("#"+parentOfRating).find($(".stars_btn")).find($(".star-"+x)).css({"color":"goldenrod"})
              }

            }
          }


          });
          
        });

    //functionality that needs to be modularized, but handles filtering for watched movies
    $("body").on("click", "#watched_filter", function(){
        console.log("filterwatched now");
        $("#main_ouput .row").children(".unwatched").hide();
        $("#main_ouput .row").children(".watched").show();
    });

    //functionality that needs to be modularized, but handles filtering for unwatched movies
    $("body").on("click", "#unwatched_filter", function(){
        console.log("filterwatched now");
        $("#main_ouput .row").children(".watched").hide();
        $("#main_ouput .row").children(".unwatched").show();
    });  

    //functionality that needs to be modularized, but handles functionality for changing unwatched movies to watched
    $("body").on("click", ".watched_movies_btn", function(){
      console.log("now this should switch to watched");
      
      //get title to check against firebase
      var titleToCheck = $(this).parent().children("span")[0].innerHTML;

      //update unwatched class to watched
      $(this).parent().removeClass("unwatched");
      $(this).parent().addClass("watched");

      //save parent if
      var parent = $(this).parent().attr("id");

      console.log("parent", parent);
      
      //append star div
      require(["hbs!../templates/appendStars"], function(template){
        console.log("inside func");
                    $("#"+parent).append(template());
                 });

      // remove watched_movies_btn
      $(this).hide();

      //needs to be modular but this will edit data in firebase
      var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());


      //go into current users movies to the "watched" key of the movie that was clicked on
      var watchedToUpdate = ref.child("movies").child(titleToCheck);

      watchedToUpdate.update({
        "watched":"true"
      });



    });

    //functionality that needs to be modularized, but handles functionality for adding ratings to firebase and coloring stars after click
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


  }
);




