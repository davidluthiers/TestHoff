

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/nodelist/',

	nodelistModel = historyModel.extend({

		defaults:{
			
		}
	
});



   return nodelistModel;
});