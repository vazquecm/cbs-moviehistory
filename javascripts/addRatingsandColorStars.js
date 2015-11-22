//this module handles adding ratings to a movie in firebase, and outputting correct number of stars when search my movies button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "generalVariables"], 
  function($, firebase, Q, bootstrapJs, generalVariables) {

  return function(){

      $("body").on("click", ".movies_btn span", function(){

            //get the star-x class of each element where x is a number 1-5
            var currentStarRating = $(this).attr("class").split(" ")[2];

            //split the string that returns the class and get only the number
            var numOfStar = currentStarRating.split("-")[1];

            //convert number to integer instead of string
            var finalNumber = parseInt(numOfStar);

            //get title of movie to add rating to
            var movieTitle = $(this).parent().parent().children("span")[0].innerHTML;

            //reference firebase location of current user
            var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());

            //reference to current movie rated within movie object within current user
            var movieReference = ref.child("movies").child(movieTitle);

            //change rating key in firebase to whatever star number was clicked on 
            movieReference.update({
              "rating": finalNumber
            });

            //Change css styles
            console.log("numOfStar ", numOfStar );

            console.log("this star", $(this));

            //clear colors in order to update colors with for loop
            $(this).parent().find($(".glyphicon")).css({"color": "#333"});

            for( var i = finalNumber; i > 0; i -= 1){
              console.log("i is now", i);
              $(this).parent().find($(".star-"+i)).css({"color": "goldenrod"});      
            }
        });
    }
  });