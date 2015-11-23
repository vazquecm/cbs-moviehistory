//this module handles functionality for changing a user's unwatched movie to watched

define(["jquery", "firebase", "q", "bootstrapJs", "generalVariables"], 
  function($, firebase, Q, bootstrapJs, generalVariables) { 

return function(){

  //when the watched movies button is clicked
 $("body").on("click", ".watched_movies_btn", function(){
      
      //get title to check against firebase, this is located in a span with a display:none property inside each movie div
      var titleToCheck = $(this).parent().children("span")[0].innerHTML;

      //update unwatched class to watched
      $(this).parent().removeClass("unwatched");
      $(this).parent().addClass("watched");

      //reference to parent id attribute
      var parent = $(this).parent().attr("id");
      
      //append star div
      require(["hbs!../templates/appendStars"], function(template){
                    $("#"+parent).append(template());
                 });

      // remove watched_movies_btn
      $(this).hide();

      //reference to current user in firebase
      var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());


      //go into current user's movies to the "watched" key of the movie that was clicked on
      var watchedToUpdate = ref.child("movies").child(titleToCheck);

      //update movie to watched
      watchedToUpdate.update({
        "watched":"true"
      });
   });
  }
});