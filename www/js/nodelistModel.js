

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/nodelist/',

	nodelistModel = historyModel.extend({

		localStorage: new Backbone.LocalStorage("nodelist"),
		
		defaults:{
			"description":"",
			"files": []
		}
	
});



   return nodelistModel;
});