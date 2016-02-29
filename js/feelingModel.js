

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/feelingw/',

	feelingModel = historyModel.extend({

		defaults:{

			"feeling":"",
			"uri":""
			
			
		}
	
});



   return feelingModel;
});