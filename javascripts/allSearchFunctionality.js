//this module handles searching user movies, outputting them, and changing the css display of the appropriate star ratings from the user

define(["jquery", "firebase", "q", "populateUserMovies", "bootstrapJs", "searchUserMovies"], 
  function($, firebase, Q,  populateUserMovies, bootstrapJs, searchUserMovies) {

return function(){

	  	$("body").on("click", "#search_movies_btn", function(){
  		searchUserMovies()
  		.then(function(){
        
        return populateUserMovies()
        
       })

        //after movies are populated, color in appropriate star ratings
       .then(function(){

          //get all star button parent divs into an array
          var ratings = $(".hiddenSpanRating");

          // console.log("ratings", ratings);

          for(var i = 0; i < ratings.length; i ++){

            //get inner html of span that holds rating
            var currentRating = ratings[i].innerHTML;

            //get integer value of current rating
            var parsedRating = parseInt(currentRating);

            //if a movie rating is greater than zero
            if(parsedRating > 0){
              // console.log("currentdivwith rating", ratings[i]);

              //get id of parent div for reference
              var parentOfRating = ratings[i].parentNode.getAttribute("id");

              // console.log($("#"+parentOfRating).find($(".stars_btn")).children());

              for(var x = currentRating; x > 0; x -= 1){

              //color appropriate stars
              $("#"+parentOfRating).find($(".stars_btn")).find($(".star-"+x)).css({"color":"goldenrod"})
              }

            }
          }


          });
          
    });
   }
});