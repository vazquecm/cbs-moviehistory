define(["jquery", "firebase", "q", "bootstrapJs", "generalVariables"], 
  function($, firebase, Q, bootstrapJs, generalVariables) { 

return function(){
 $("body").on("click", ".watched_movies_btn", function(){
      console.log("now this should switch to watched");
      
      //get title to check against firebase
      var titleToCheck = $(this).parent().children("span")[0].innerHTML;

      //update unwatched class to watched
      $(this).parent().removeClass("unwatched");
      $(this).parent().addClass("watched");

      //save parent if
      var parent = $(this).parent().attr("id");

      console.log("parent", parent);
      
      //append star div
      require(["hbs!../templates/appendStars"], function(template){
        console.log("inside func");
                    $("#"+parent).append(template());
                 });

      // remove watched_movies_btn
      $(this).hide();

      //needs to be modular but this will edit data in firebase
      var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid());


      //go into current users movies to the "watched" key of the movie that was clicked on
      var watchedToUpdate = ref.child("movies").child(titleToCheck);

      watchedToUpdate.update({
        "watched":"true"
      });
   });
  }
});