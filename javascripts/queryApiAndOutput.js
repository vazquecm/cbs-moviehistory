
//This module handles querying the api with a movie title and outputting results when find movies button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "colorStars"], 
  function($, firebase, Q,  bootstrapJs, getMoviesFromAPI, generalVariables, colorStars) {

return function(){

  var userMoviesInFirebase;


  		//User enters title and clicks search button
  		$(document).on("keyup", "#search_for_movies", function(e){

        if (e.keyCode === 13) {
        console.log("heard click for searching")
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

          console.log("userMoviesInFirebase>>>>>>>>>>>>>>>>>>>>>>", userMoviesInFirebase);

          console.log("data returned from api", dataFromApi);

          

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
          });

        //give dataFromApi to another hbs template
        require(["hbs!../templates/unmatchedMovies"], function(template){
            $("#main_ouput").append(template(dataFromApi));
          });

          defer.resolve();

         return defer.promise;

        }

        populate()
        .then(function(){


            //color star ratings
            var hiddenRatings = $(".stars_btn").parent().find(".hiddenSpanRating");

            console.log("hiddenRatings ", hiddenRatings);

            for(var i = 0; i < hiddenRatings.length; i++){
              console.log("current span parent ", hiddenRatings[i].parentNode);

              //get parentNode id
              var parentId = hiddenRatings[i].parentNode.getAttribute("id");

              //get rating to reference
              var theRating = hiddenRatings[i].innerHTML;
                $("#"+parentId).css({"background-color":"goldenrod"});

              for(var x = theRating; x > 0; x -= 1){
                //this should color stars but it isnt working
                $("#"+parentId).find(".stars_btn").find("stars-"+theRating).css({"color":"goldenrod"});

                //for testing I colored parent div
                console.log("the target star ",  $("#"+parentId).find(".stars_btn").find("stars-"+theRating));
              }

            }
          
        });

      

          });
        };
    });
  };
});
