

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/recycling/',

	recyclingModel = historyModel.extend({

		defaults:{
			
			"audioName":"",
			"cachedList":false
			
		}
	
});



   return recyclingModel;
});