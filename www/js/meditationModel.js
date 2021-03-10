

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/recycling/',

	meditationModel = historyModel.extend({

		defaults:{
			
			"audioName":"",
			"cachedList2":false
			
		}
	
});



   return meditationModel;
});