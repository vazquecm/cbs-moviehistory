define(["jquery","firebase", "q", "generalVariables"], 
  function($, firebase, Q, generalVariables){

  return function(){
      $("body").on("click", ".existing img", function(){
          console.log("this should display a modal with appropraite output");

          var titleClicked = $(this).parent().parent().find(".hiddenSpanId").html();

          var currentMovieData;

          //get data about current movie in firebase
          var ref = new Firebase("https://cbs-moviehistory.firebaseio.com/Users/"+generalVariables.getCurrentUid()+"/movies/"+titleClicked);

          ref.on("value", function(snapshot) {
            console.log(snapshot.val());

            currentMovieData = snapshot.val();
          });

          //run function that outputs modal
          function outputModal(data){
            var deferred = Q.defer();

            require(["hbs!../templates/modalDetails"], function(template){
              $("#modalDetailsOutput").html(template(data));
              deferred.resolve();
            });

            return deferred.promise;
          }

          //call output modal function
          outputModal(currentMovieData)

          //then call the modal functionality
          .then(function(){
          $("#existingMovieModal").modal();
            
          });

         })
    }

})