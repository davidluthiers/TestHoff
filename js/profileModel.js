

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'jquerymobile'
  
], function($, _, Backbone ){
	
	urlRoot:'/profile/',

	profileModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("profile"),
	
	
});



   return profileModel;
});