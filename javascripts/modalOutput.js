//this module handles modal output when a poster is clicked

define(["jquery","firebase", "q", "generalVariables"], 
  function($, firebase, Q, generalVariables){

  return function(){

      //modal popups if a movie exists in firebase
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

         });
        
        //modal popups for movies that don't exist in firebase
        $("body").on("click", ".nonExisting img", function(){
            var imdbId = $(this).parent().parent().attr("id").split("_")[1];

            $.ajax({
              url:"http://www.omdbapi.com/?i="+imdbId+"&r=json"
            }).done(function(data){
              console.log("response, ", data);

              //run function that outputs modal
              function outputUnknownModal(data){
                var deferred = Q.defer();

                require(["hbs!../templates/unknownModalDetails"], function(template){
                  $("#modalDetailsOutput").html(template(data));
                  deferred.resolve();
                });

                return deferred.promise;
              }

              outputUnknownModal(data).then(function(){
                 $("#existingMovieModal").modal();
              });


            });


        });
      
    }

})