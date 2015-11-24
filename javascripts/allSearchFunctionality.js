//this module handles searching user movies, outputting them, and changing the css display of the appropriate star ratings from the user

define(["jquery", "firebase", "q", "populateUserMovies", "bootstrapJs", "searchUserMovies"], 
  function($, firebase, Q,  populateUserMovies, bootstrapJs, searchUserMovies) {

return function(){

      // when search moves button is clicked, run searchUserMovies.js module
      // THIS IS THE NEW "ALL" BUTTON!!!
	  	// $("body").on("click", "#search_movies_btn", function(){

      console.log("I made it to all search functionality!!!!");

  		searchUserMovies()

  		.then(function(){

      /// this is a require call that includes a "promise" from searchMovies.hbs ////  
        return populateUserMovies()
        
       })

        //after movies are populated, color in appropriate star ratings
       .then(function(){

          //get all star button parent divs into an array
          var ratings = $(".hiddenSpanRating");

          //for every parent div (every div in ratings)
          for(var i = 0; i < ratings.length; i ++){

            //get inner html of span that holds rating
            var currentRating = ratings[i].innerHTML;

            //get integer value of current rating
            var parsedRating = parseInt(currentRating);

            //if a movie rating is greater than zero
            if(parsedRating > 0){

              //get id of parent div for reference
              var parentOfRating = ratings[i].parentNode.getAttribute("id");


              for(var x = currentRating; x > 0; x -= 1){

              //color appropriate stars by selecting each glyph with .star-x (e.g. star-1  star-2)
              $("#"+parentOfRating).find($(".stars_btn")).find($(".star-"+x)).css({"color":"goldenrod"})
              }

            }
          }
console.log("Did I get here in allSearchfunctionality?");

          });
          
    // });
   }
});