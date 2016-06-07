

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
			"description":""
		}
	
});



   return nodelistModel;
});