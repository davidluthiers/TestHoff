

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/beatyourdark/',

	beatyourModel = historyModel.extend({

		defaults:{		
		}
	
});



   return beatyourModel;
});