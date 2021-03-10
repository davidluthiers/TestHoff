

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/journals/',

	journalModel = historyModel.extend({

		defaults:{

			"description":""
			
			
		}
	
});



   return journalModel;
});