

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/bashacker/',

	bashackerModel = historyModel.extend({

		defaults:{
			
		}
	
});



   return bashackerModel;
});