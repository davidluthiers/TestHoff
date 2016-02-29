

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/quads/',

	quadModel = historyModel.extend({

		defaults:{

			"answer1":"",
			"answer2":"",
			"answer3":"",
			"answer4":"",
			"answer5":"",
			"answer6":"",
			"answer7":"",
			"answer8":"",
			"answer9":""
			
			
		}
	
});



   return quadModel;
});