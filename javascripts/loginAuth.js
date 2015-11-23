//This module returns a function that handles logging into app through email authentication through firebase

define(["jquery", "firebase", "q"], 
function ($, firebase, Q) {

	return function(){
	//// this (returnedUid) data is not currently used just here in case its needed///	

	//create differed object for promise
		 	var deferred = Q.defer();

		//get email and password
		var enteredEmail = $("#logInEmail").val();
		var enteredPassword = $("#logInPassword").val();

		if (enteredEmail === "" && enteredPassword === ""){
			console.log("email and password need to be entered");
		} else {

		//reference app firebase data location creates a new reference that allows us to access information in firebase.
		var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/");

		//run authWithPassword() method on ref variable (we can do this because ref is a firebase object)
		ref.authWithPassword({

		  email    : enteredEmail,
		  password : enteredPassword

		}, function(error, authData) {

		   // if there is an error logging in
		  if (error) {

		    console.log("Login Failed!", error);
		    deferred.reject();

		  //if there is no error logging in
		  } else {

		    console.log("Authenticated successfully with payload:", authData);

		    //resolve promise
		    deferred.resolve();

		  }

		});
}
		//return state of promse
		return deferred.promise;

	};	

});