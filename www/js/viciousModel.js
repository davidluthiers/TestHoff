

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/vicious/',

	viciousModel = historyModel.extend({

		defaults:{

			"feeders":[],
			"corebelieve":"",
			"coreissue":"",
			"uri":"",
			"uriShare":"",
			"exits":[]
			
		}
	
});



   return viciousModel;
});