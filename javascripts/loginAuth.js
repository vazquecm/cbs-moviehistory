//This module returns a function that handles logging into app through email authentication through firebase

define(["jquery", "firebase", "q"], 
function ($, firebase, Q) {

	return function(returnedUid){
	//// this (returnedUid) data is not currently used just here in case its needed///	

		//get email and password
		var enteredEmail = $("#email").val();
		var enteredPassword = $("#password").val();

		//create differed object for promise
		 	var deferred = Q.defer();

		//reference app firebase data location
		var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/");

		//run authWithPassword() method on ref variable (we can do this because ref is a firebase object)
		ref.authWithPassword({

		  email    : enteredEmail,
		  password : enteredPassword

		}, function(error, authData) {

		   // if there is an error logging in
		  if (error) {

		    console.log("Login Failed!", error);

		  //if there is no error logging in
		  } else {

		    console.log("Authenticated successfully with payload:", authData);

		    //resolve promise
		    deferred.resolve();

		  }

		});

		//return state of promse
		return deferred.promise;

	}	

});