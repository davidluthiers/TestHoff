

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/journals/',

	autocompleteModel = historyModel.extend({

		defaults:{

			"QCFeelingToday":[],
			"QCFeelingBody":[],
			"customFWheelfeel":[],
			"patternrelease":[],
			"bashacker":[],
			"beatyourdark":[],
			"viciousCIssue":[],
			"viciousCBelief":[],
			"viciousFeeder":[],
			"transferNombre":[],
			"transferExperience":[],
			"transferReaction":[]
			
			
		}
	
});



   return autocompleteModel;
});