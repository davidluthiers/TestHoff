 // Sets the require.js configuration for your application.
      require.config( {

        // 3rd party script alias names
        paths: {

            // Core Libraries
            "jquery": "jquery-1.9.1.min",
            "jquerymobile": "jquery.mobile-1.3.1.min",
            "underscore": "underscoreplugin",
            "backbone": "backbone",
			"localStorage": "backbone.localStorage",
			"text": "textplugin",
			"fastclick": "fastclick",
			"paper": "paper"

        },
		
		config: {
			 text: {
				//Valid values are 'node', 'xhr', or 'rhino'
				env: 'xhr',
				onXhr: function (xhr, url) {
                //Called after the XHR has been created and after the
                //xhr.open() call, but before the xhr.send() call.
                //Useful time to set headers.
                //xhr: the xhr object
                //url: the url that is being used with the xhr object.
				//url = window.WkWebView.convertFilePath(url);
				console.log(xhr);
				console.log(url);
				
				try{	
					console.log(1);
					console.log(cordova.file.applicationDirectory);
					console.log(cordova.file.applicationStorageDirectory);
				}
				catch(e){console.log(e);};
				

				}
			 }
		},

        // Sets the configuration for your third party scripts that are not AMD compatible
        shim: {

            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            },
			"underscore":{
				exports: '_'
				}

        } // end Shim Configuration

      } );

require([ "jquery", "underscore", "backbone", "Router"], function( $, _, Backbone, Router ) {

	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
		}
	)
			document.addEventListener("deviceready",onDeviceReady,false);
			try{
				window.plugins.spinnerDialog.show(null, null, function () {console.log("callback");});
				}
			catch(e){
				console.log(e);
				}
			function onDeviceReady() {
		
			}
	require( [ "jquerymobile" , "underscore"], function() {
		// Instantiates a new Backbone.js Mobile Router
		
		try{	
			console.log(1);
			console.log(cordova.file.applicationDirectory);
			console.log(cordova.file.applicationStorageDirectory);
		}
		catch(e){console.log(e);};
		
		try{
			console.log(2);
			console.log(webView.url);
		}
		catch(e){console.log(e);};
		
		Router.initialize();
		//App.initialize();
		//backbonestart.start();
		
	});
} );








