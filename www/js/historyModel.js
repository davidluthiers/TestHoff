

define([
  'jquery',
  'underscore',
  'backbone',
  'jquerymobile'
  
], function($, _, Backbone ){

	urlRoot:'/historycollection/',

	historyModel = Backbone.Model.extend({

		defaults:{

			"tool":"",
			"date":""
			
			
		},
		
	initialize:function (){
	
	self=this;
	
	try{
		self2=this;
		
		self.fecha= new Date().toLocaleString().slice(0, -3);
		
		console.log("Fecha calculada: " + self.fecha);
		
		self2.set("date",self.fecha);
		
	}catch(e){
		console.log("Error fecha: " + e);
	}
	
	
	/*
	try{
		self2=this;
		navigator.globalization.dateToString(
					self.fecha,
					function (date) {
						self2.set("date",date.value);
					},
					function () { alert('Error getting dateString\n'); },
					{ formatLength: 'short', selector: 'date and time' }
				);}
				catch(err) {
				}
	*/	
		
	
	}
	
});



   return historyModel;
});