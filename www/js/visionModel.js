

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/visions/',

	visionModel = historyModel.extend({

		defaults:{

			"description":"",
			"title":"",
			"uri":"",
			"fromgallery":false
			
			
		}
	
});



   return visionModel;
});