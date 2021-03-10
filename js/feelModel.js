

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'jquerymobile'
  
], function($, _, Backbone ){
	
	urlRoot:'/feel/',

	feelModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("feel"),
	
	
});



   return feelModel;
});