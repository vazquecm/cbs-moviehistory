//This module returns a function that handles logging into app through email authentication through firebase

define(["jquery", "firebase", "q", "generalVariables"], 
function ($, firebase, Q, generalVariables) {

	return function(){	

	//create differed object for promise
		 	var deferred = Q.defer();

		//get email and password from input on page
		var enteredEmail = $("#logInEmail").val();
		var enteredPassword = $("#logInPassword").val();

		//if entered email or password is blank, let us know in the console
		if (enteredEmail === "" || enteredPassword === ""){
			console.log("email and password need to be entered");

		//if email and pass are not blank
		} else {

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

		    //set current user and current user uid for use in other modules
		    generalVariables.setCurrentUser(authData);
		    generalVariables.setCurrentUid(authData.uid);


		    //resolve promise
		    deferred.resolve();

		  }

		});
}
		//return state of promse
		return deferred.promise;

	};	

});