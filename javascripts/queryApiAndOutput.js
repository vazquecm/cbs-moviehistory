
//This module handles querying the api with a movie title and outputting results when find movies button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "getMoviesFromAPI", "generalVariables", "colorStars"], 
  function($, firebase, Q,  bootstrapJs, getMoviesFromAPI, generalVariables, colorStars) {

return function(){


  		//User enters title and clicks search button
  		$(document).on("keyup", "#search_for_movies", function(e){

        if (e.keyCode === 13) {
        console.log("heard click for searching")
	  		//Api returns movie data
  			getMoviesFromAPI()

        //when data is returned
        .then(function(data){

          //get movies of user in firebase
          var refToUserMovies = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid()+"/movies");


          refToUserMovies.on("value", function(snapshot) {
            userMoviesInFirebase = snapshot.val();
          });


          //set the current movie for use in other modules via generalVariables
          generalVariables.setReturnedMovieList(data);

          //function that returns a promise after movies are output
          function outputTheData(){

            var deferred = Q.defer();
            
                require(["hbs!../templates/findMovies"], function(logInTemplate){
                    $("#main_ouput").html(logInTemplate(data)); 

                    deferred.resolve();
                  });

                return deferred.promise;
          }

          //after output
          outputTheData()
          .then(function(){

            //get titles in span elements
            var spanIds = $(".img-wrap").parent().find(".hiddenSpanId");

            //loop through spans
            for(var i = 0; i < spanIds.length; i++){

              //get current title that we will check
              var currentTitle = spanIds[i].innerHTML;

              //compare title in span to movies in firebase
              for(var key in userMoviesInFirebase){

                //if one matches
                if(userMoviesInFirebase[key].movieName === currentTitle){

                  //get the id of the parent
                  var parentId = spanIds[i].parentNode.getAttribute("id");

                  //remove "nonExisting" class and replace with "existing"
                  $("#"+parentId).find(".img-wrap").removeClass("nonExisting").addClass("existing");

                  //remove the "add movie button" child button
                  $("#"+parentId).find("#add_movie_button").remove();

                  //add rating into hidden span rating
                  $("#"+parentId).find(".hiddenSpanRating").html(userMoviesInFirebase[key].rating);

                  console.log("current key", userMoviesInFirebase[key]);

                  if(userMoviesInFirebase[key].watched){
                  //append star divs if movie has been watched  (handlebars was not executing correctly here, there was a delay, so we used regular output)
                  $("#"+parentId).append('<div class="movies_btn stars_btn"><span class="glyphicon glyphicon-star star-1" aria-hidden="true"></span><span class="glyphicon glyphicon-star star-2" aria-hidden="true"></span><span class="glyphicon glyphicon-star star-3" aria-hidden="true"></span><span class="glyphicon glyphicon-star star-4" aria-hidden="true"></span><span class="glyphicon glyphicon-star star-5" aria-hidden="true"></span></div>');

                  } else {
                    $("#"+parentId).append('<div id="add_movie_button" class="watched"><button type="button" class="btn">Watched</button></div>');
                  }


                }

              }


            }
      
            //color star ratings
            var hiddenRatings = $(".stars_btn").parent().find(".hiddenSpanRating");

            for(var i = 0; i < hiddenRatings.length; i++){
              console.log("current span parent ", hiddenRatings[i].parentNode);

              var theRating = hiddenRatings[i].innerHTML;


              //reference id of parent
              var currentId = hiddenRatings[i].parentNode.getAttribute("id");

              //color appropriate star ratings
              for( var x = theRating; x > 0; x -= 1 ){
              $("#"+currentId).find(".stars_btn").children(".star-"+x).css({"color": "goldenrod"});
              }


            }



          });

          });
        };
    });
  };
});
