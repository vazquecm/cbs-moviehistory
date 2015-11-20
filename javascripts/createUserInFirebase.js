//This module returns a function that handles CREATING USER in database with email authentication through firebase

define(["jquery", "firebase", "q"], 
function ($, firebase, Q) {

	return function(){

		//create differed object for promise
		 	 var deferred = Q.defer();

		//reference app data location in firebase
		var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/");

		//get email and password from input fields
		var enteredEmail = $("#email").val();
		var enteredPassword = $("#password").val();

		console.log("enteredEmail", enteredEmail);
		console.log("enteredPassword", enteredPassword);

	/*
		create user for entry into firebase by running .createUser() method on Firebase object 
		(this is the "ref" variable above). (.createUser() is a method given to us by firebase)
	*/

		ref.createUser({

		  email    : enteredEmail,
		  password : enteredPassword


		}, function(error, userData) {

		  // If error is returned from request to create user
		  if (error) {

		    console.log("Error creating user:", error);

		  //if no error is returned from request to create user
		  } else {


		    console.log("Successfully created user account with uid:", userData.uid);

		    //variable that holds user uid of user that is being created
		    var currentUserUid = userData.uid;

		    //create reference to userUid object that is inside "Users" object in firebase (we are basically setting/creating this here)
			    /*
			    human language: go get all firebase data,
			    				go into the "Users" object,
			    				go into/ create a child object inside "Users" with the key I give you 
			    				(in this case we are giving it the currentUserUid as the key name)

			    */
		    var userRef = ref.child("Users").child(currentUserUid);

		    //create new user key on users object, give this user key all data keys we will need (this logic is setting the firebase key and the user uid to the same reference) ///
		    userRef.set({
		    		uid: currentUserUid,
    				watched: {
    					examplemovieTitle:{
    						rating: 3
    					}
    				},
    				unwatched:{
    					exampleTitleOfUnwatched: "example"
    				}
		    	})

			  	//resolve the promise with this deferred object
			 	   deferred.resolve(currentUserUid);

		    }


		  });

		    //return state of promise
		    return deferred.promise;
	}	

});