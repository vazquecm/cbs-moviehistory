//this module handles adding ratings to a movie in firebase, and outputting correct number of stars when "search my movies" button is clicked

define(["jquery", "firebase", "q", "bootstrapJs", "generalVariables"], 
  function($, firebase, Q, bootstrapJs, generalVariables) {

  return function(){

      //when a span element inside the movies_btn is clicked (these are the stars)
      $("body").on("click", ".movies_btn span", function(){

            //get the star-x class of each element where x is a number 1-5
              //we are essentially getting every class on the a span inside .movies_btn div, splitting those classes into an array, and referencing "star-1", or "star-x" etc
            var currentStarRating = $(this).attr("class").split(" ")[2];

            //split the string that has the "star-x" class and get only the number (where x is the number)
            var numOfStar = currentStarRating.split("-")[1];

            //convert number to integer instead of string
            var finalNumber = parseInt(numOfStar);

            //get title of movie to add rating to
              //this is loacted inside of a hidden span in parent element
            var movieTitle = $(this).parent().parent().children("span")[0].innerHTML;

            //reference firebase location of current user
            var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());

            //reference to current movie rating within movies object within current user
            var movieReference = ref.child("movies").child(movieTitle);

            //change rating key in firebase to whatever star number was clicked on 
            movieReference.update({
              "rating": finalNumber
            });

            //Change css styles to be applied (in order for this not to be buggy and for css of stars to be updated correctly without clicking on "search movies" again, see allSearchFunctionality.js)

            //clear colors in order to update colors with for loop
            $(this).parent().find($(".glyphicon")).css({"color": "#333"});

            for( var i = finalNumber; i > 0; i -= 1){
              //change color of star that was clicked on and every star whose number is less than the one clicked on
              $(this).parent().find($(".star-"+i)).css({"color": "goldenrod"});      
            }
        });
    }
  });