//this module that goes through the user movies, outputting only those that have 5 stars

define(["jquery", "firebase", "q", "bootstrapJs", "generalVariables"], 
  function($, firebase, Q, bootstrapJs, generalVariables) {

	return function(){

		//get all elements (spans) with the hiddenSpanRating class and put them into an array
		var spanArray = $(".hiddenSpanRating");
		var rangeValue = parseInt($("#range").val());
		console.log("range value ", rangeValue);

		//loop over span array 
		for(var i = 0; i < spanArray.length; i++){
			console.log("Current span, ",spanArray[i]);

			console.log("the inner htmls: ", parseInt(spanArray[i].innerHTML));

			//get the class of the current span element in the array
			var theClass = spanArray[i].getAttribute("class");

			//get the id of the parent div of current span
			var parentNode = spanArray[i].parentNode.getAttribute("id");

			//if the current html of current span is equal to 5 (we must convert the string to a number)
			if(parseInt(spanArray[i].innerHTML) === rangeValue){

				console.log("this should show ");

				//show parent node
				$("#"+parentNode).show();
				

			//else if the rating is not === 5
			} else{

				//hide parent node
				$("#"+parentNode).hide();
				
			}

			
		}

	};
		
	
});