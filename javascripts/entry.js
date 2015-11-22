//Configure require dependencies and paths
requirejs.config({
	baseUrl: "./javascripts",
	paths:{
		"jquery": "../lib/bower_components/jquery/dist/jquery.min",
		"hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
		"bootstrapJs": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
		"firebase": "../lib/bower_components/firebase/firebase",
		"lodash": "../lib/bower_components/lodash/lodash.min",
		'q': '../lib/bower_components/q/q'
	},
  shim: {
		bootstrapJs : {
		  deps : ['jquery'],
		  exports: 'Bootstrap'
		},
		firebase: {
		  exports: "Firebase"
		}
  }
});


//main logic of app is in app.js
require(["app"], 
  function() {


  });





