//Configure require dependencies and paths
requirejs.config({
  baseUrl: "./javascripts",
   shim : {
        bootstrapJs : {
            deps : [ 'jquery'],
            exports: 'Bootstrap'
        },

        "firebase": {
            exports: "Firebase"
        }
      },
       paths:{
		    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
		    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
		    "bootstrapJs": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
		    "firebase": "../lib/bower_components/firebase/firebase",
		    "lodash": "../lib/bower_components/lodash/lodash.min",
		    'q': '../lib/bower_components/q/q'
  		}
});

require(["jquery", "loginAuth", "createUserInFirebase", "q" ], 
  function($, loginAuth, createUserInFirebase, Q) {
 	
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
);