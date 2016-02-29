

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/transfers/',

	transferenceModel = historyModel.extend({

		defaults:{

			"transferencewith":"",
			"situations":"",
			"perceptions":[],
			"reactions":[],
			"perceptionslike":[],
			"reactionslike":[],
			"qualities":[],
			"finished":"none",
			"otherAreas":"",
			"darkSideWin":""
			
			
		}
	
});



   return transferenceModel;
});