
//This module handles querying the api with a movie title and outputting results when find movies button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "colorStars"], 
  function($, firebase, Q,  bootstrapJs, getMoviesFromAPI, generalVariables, colorStars) {

return function(){

  var userMoviesInFirebase;


  		//User enters title and clicks search button
  		$(document).on("keyup", "#search_for_movies", function(e){

        if (e.keyCode === 13) {
        console.log("heard click for searching");
	  		//Api returns movie data
  			getMoviesFromAPI()

        //when data is returned
        .then(function(data){

          var dataFromApi = data;

          var matchedMovies={};

          //get movies of user in firebase
          var refToUserMovies = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid()+"/movies");


          refToUserMovies.on("value", function(snapshot) {
            userMoviesInFirebase = snapshot.val();
          });

          
        //compare titles and see if title from api matches title from firebase
        for(var key in userMoviesInFirebase){

          //for every key in uer movies
            
            //loop through keys returned from api to get matches
            for(var apikeys in dataFromApi){

              //if a movie title from firebase equals title returned from api
              if(userMoviesInFirebase[key].movieName === dataFromApi[apikeys].Title){
                console.log("we have a match ", userMoviesInFirebase[key]);

                //store current movie iside matched movies
                matchedMovies[userMoviesInFirebase[key].movieName] = userMoviesInFirebase[key];

                //delete current movie from data returned
                delete dataFromApi[apikeys];
              }

            }

        }

        function populate(){

          var defer = Q.defer();

        //give matched object to hbs template
         require(["hbs!../templates/matchedMovies"], function(template){
            $("#main_ouput").html(template(matchedMovies));
            defer.resolve();
          });

        //give dataFromApi to another hbs template
        require(["hbs!../templates/unmatchedMovies"], function(template){
            $("#main_ouput").append(template(dataFromApi));
          });

          

         return defer.promise;

        }

        //after data is populated, then run colorStars.js
        populate()
        .then(function(){
          colorStars();
          
        });

      

          });
        }
    });
  };
});
