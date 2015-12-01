define(["jquery", "firebase", "q"], 
	function($, firebase, Q){


return function(){

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
              $("#"+parentOfRating).find($(".stars_btn")).find($(".star-"+x)).css({"color":"#DAC620"});
              }

            }
          }
};
	});