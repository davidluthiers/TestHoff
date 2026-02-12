

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/hearings/',

	hearingModel = historyModel.extend({

		defaults:{
			
			"title":"",
			"description":"",
			"audioName":"",
			"answer":"",
			"cachedList":false,
			"cachedList2":false
			
			
		}
	
});



   return hearingModel;
});