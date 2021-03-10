

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'jquerymobile'
  
], function($, _, Backbone ){
	
	urlRoot:'/language/',

	actionModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("action"),
	
	
});



   return actionModel;
});