
//This module handles querying the api with a movie title and outputting results when find movies button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "colorStars"], 
  function($, firebase, Q,  bootstrapJs, getMoviesFromAPI, generalVariables, colorStars) {

return function(){

      var deferred = Q.defer();


  		//User enters title and clicks search button
  		$(document).on("keyup", "#search_for_movies", function(e){

        if (e.keyCode === 13) {
        console.log("heard click for searching")
	  		//Api returns movie data
  			getMoviesFromAPI()

        //when data is returned
        .then(function(data){

          //make matchedMoviesObject
          var matchedMoviesObject = {};

          //make unmatchedMoviesObject
          var unmatchedMoviesObject = {};

          //make returnedMoviesObject --> This is everything returned from the api
          var returnedMoviesObject = data;

          //get movies of user in firebase
          var refToUserMovies = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid()+"/movies");

          var userMoviesInFirebase = {};

          refToUserMovies.on("value", function(snapshot) {
            userMoviesInFirebase = snapshot.val();
          });

          //loop throught returnedMoviesObject
          for(var key in userMoviesInFirebase){
            for(var omdbKey in returnedMoviesObject){
              if(userMoviesInFirebase[key].movieName === returnedMoviesObject[omdbKey].Title){
                console.log("we have a match ", returnedMoviesObject[omdbKey].Title);
                matchedMoviesObject[returnedMoviesObject[omdbKey].Title] = userMoviesInFirebase[key];
                delete returnedMoviesObject[omdbKey];
              }
            }
          }

          //loop through matched movies and compare to returned
          for(var key in matchedMoviesObject){
            console.log("key in matched >>>> ", matchedMoviesObject[key]);

            for(var omdbKey in returnedMoviesObject){
                if(returnedMoviesObject[omdbKey].Title !== matchedMoviesObject[key].movieName){
                  
                  unmatchedMoviesObject[returnedMoviesObject[omdbKey].Title] =  returnedMoviesObject[omdbKey];

                }
            }
          }

          //when done give matched movies variable to one hbs
          //give the other to another hbs template based on outputting "add" or "watched"/stars


          //set the current movie for use in other modules via generalVariables
          generalVariables.setReturnedMovieList(data);


            //output matched via hbs file
            require(["hbs!../templates/searchMovies"], function(logInTemplate){
                    $("#main_ouput").html(logInTemplate(matchedMoviesObject)); 
                  });

            //output unmatched via hbs file
            require(["hbs!../templates/findMovies"], function(logInTemplate){
                    $("#main_ouput").append(logInTemplate(unmatchedMoviesObject)); 
                  });


            deferred.resolve(matchedMoviesObject);

          });
        };
    });
            return deferred.promise;
  };
});
