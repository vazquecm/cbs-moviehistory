//this module handles searching user movies, outputting them, and changing the css display of the appropriate star ratings from the user

define(["jquery", "firebase", "q", "populateUserMovies", "bootstrapJs", "searchUserMovies", "colorStars"], 
  function($, firebase, Q,  populateUserMovies, bootstrapJs, searchUserMovies, colorStars) {

return function(){

  		searchUserMovies()

  		.then(function(){

      /// this is a require call that includes a "promise" from searchMovies.hbs ////  
        return populateUserMovies();
        
       })

        //after movies are populated, color in appropriate star ratings
       .then(function(){

        console.log("calling color stars");
        colorStars();

       });
   };
});