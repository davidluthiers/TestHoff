

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/filelist/',

	filelistModel = historyModel.extend({

		localStorage: new Backbone.LocalStorage("filelist"),
		
		defaults:{
			"description":""
		}
	
});



   return filelistModel;
});