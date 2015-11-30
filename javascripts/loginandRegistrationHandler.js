//This module handles the registration and login process for users

define(["jquery", "firebase", "lodash", "q", "populateUserMovies", "createUserInFirebase", "loginAuth", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "addMovieToUser", "searchUserMovies", "allSearchFunctionality"], 
  function($, firebase,  _, Q, populateUserMovies, createUserInFirebase, loginAuth, bootstrapJs, getMoviesFromAPI, generalVariables, addMovieToUser, searchUserMovies, allSearchFunctionality) {

  return function(){	/// inject splash.hbs template to the index.html page to handle log in
  	require(["hbs!../templates/splash"], function(logInTemplate){
                  $("#mainContainer").append(logInTemplate());
                });
    
  	/// this event listens on the body of the page for click event on the log in button 
  	$("body").on("click","#logInButton", function(){
  		
  		$("#splash_panel").hide();
  		$("#login_panel").fadeIn("slow");
  	});

    //when log in submit button is clicked, check user authentication, and if successful, populate page with main.hbs
  	$("body").on("click", "#logInSubmit", function(){
    		loginAuth()
        .then(function(){
          console.log("I am HERE!");
      //after user is logged in, populate page with main.hbs  need to call cbs database to display user specific database info /// 
        allSearchFunctionality()

        require(["hbs!../templates/main"], function(logInTemplate){
                  $("#mainContainer").html(logInTemplate()); 
                });

        $("body").css({"background-image": "none"});

        console.log("user object: ", generalVariables.getCurrentUser());
      });
  	});
  	
    //functionality for registering user is below
    //show registration panel
  	$("body").on("click","#registerButton", function(){

  		$("#splash_panel").hide();
  		$("#register_panel").fadeIn("slow");
  	});

    //when register submit button is clicked
  	$("body").on("click", "#registerSubmit", function(){

  			//run createUserInFirebase.js module
	 		createUserInFirebase()

      .then(function(){

	 			//inject the log in button from logInButton.hbs 
	 			require(["hbs!../templates/logInButton"], function(logInTemplate){
                  $("#register_panel").append(logInTemplate());
        });

        // inject statement of successful registration and now let user to log in to site        
	 			require(["hbs!../templates/successfulRegister"], function(logInTemplate){
                  $("#register_panel").prepend(logInTemplate());
                 
        });

	 		});
      
    });

    //When log in button is clicked on register panel, go back to login panel
  	$("body").on("click", "#registerPanelLogIn", function(){
  		$("#register_panel").hide();
  		$("#login_panel").fadeIn("slow");
  	});
   }
});