//This module handles the registration and login process for users

define(["jquery", "firebase", "lodash", "q", "populateUserMovies", "createUserInFirebase", "loginAuth", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "addMovieToUser", "searchUserMovies"], 
  function($, firebase,  _, Q, populateUserMovies, createUserInFirebase, loginAuth, bootstrapJs, getMoviesFromAPI, generalVariables, addMovieToUser, searchUserMovies) {

  return function(){	/// inject splash.hbs template to the index.html page to handle log in
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
   }
});