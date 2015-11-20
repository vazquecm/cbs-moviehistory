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
	 	createUserInFirebase()
	 	.then(function(returnedUid){
	 		alert("congrats");

	 		$("#loginButton").click(function(){
	 			loginAuth(returnedUid)
	 			.then(function(){
	 				alert("logged in");
	 			});
	 		});
	 	});
 	});

  }
);