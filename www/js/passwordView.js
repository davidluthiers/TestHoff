

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'jquerymobile'
  
    ], function($, _, Backbone){

		passwordP = "";
		headerandpanel = "";

        passwordView = Backbone.View.extend({
  
            events:{
                "click #password_protect_button":"password_protect",
				"click #password_remove_protect_button":"password_remove_protect"
            },
   
            render: function(id, historycollection){
				console.log("PassV 1");
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
	
                if(id=='0'){
                    compiledTemplate = _.template( passwordP );
			 
			
                }
		
		
                var self=this;
                historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_password_protect")); //Aquí en lugar de cadena vacía iría el texto de panel de ayuda de la página password_protect 
			
                result= historycollection.get("languages").toJSON();
	
                compiledheaderandpanel=_.template( headerandpanel );
	
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
				if(historycollection.get("profile").get("pass")==""){
					try{
						this.$("#password_remove_protect_button").attr("style","display:none");
					}
					catch(e){console.log(e);}
				}
				else{
					try{//Activo el botón de borrar pass
						this.$("#password_remove_protect_button").attr("style","");
					}
					catch(e){console.log(e);}
				}
	
	
            },
	
            password_protect: function(){
                try{
                    var newpassword1 = $('#textinput60').val();
					var newpassword2 = $('#textinput70').val();
					if(newpassword1 != newpassword2){
						navigator.notification.confirm(this.history.get("languages").get("dic_passwords_not_match"), function(indexans){}, this.history.get("languages").get("dic_Hoffman"),[this.history.get("languages").get("dic_next")]);
						//passwords_not_match
					}
					else if (newpassword1.length < 4){
						navigator.notification.confirm(this.history.get("languages").get("dic_password_too_short"), function(indexans){}, this.history.get("languages").get("dic_Hoffman"),[this.history.get("languages").get("dic_next")]);
						//password_too_short
					}
					else{
						console.log("Contraseña: ->"+newpassword1+"<-");
						console.log("btoa: ->"+btoa(newpassword1)+"<-");

						donot=this.history.get("profile");
						donot.set("pass",btoa(newpassword1));
						
						this.history.get("profile").destroy();
						this.history.create(donot);
						
						try{//Activo el botón de borrar pass
							self =  this;
							$("#password_remove_protect_button").attr("style","");
							
							try{
								navigator.notification.confirm(self.history.get("languages").get("dic_done"), function(indexans){}, self.history.get("languages").get("dic_Hoffman"),[self.history.get("languages").get("dic_next")]);
							}
							catch(e){
								console.log(e);
							}
						}
						catch(e){console.log(e);}
						//console.log("atob: ->"+atob(btoa(newpassword1))+"<-");
						
					}
                }
                catch(e){
					console.log(e);
                    alert(e);
                }
            },
			
			password_remove_protect: function(){
				
				self = this;
				
				donot=this.history.get("profile");
				donot.set("pass","");
				
				this.history.get("profile").destroy();
				this.history.create(donot);
				
				try{
					$("#password_remove_protect_button").attr("style","display:none");

					try{
						navigator.notification.confirm(self.history.get("languages").get("dic_done"), function(indexans){}, self.history.get("languages").get("dic_Hoffman"),[self.history.get("languages").get("dic_next")]);
					}
					catch(e){
						console.log(e);
					}
				}
				catch(e){console.log(e);}
				
			}


        });

        return passwordView;
    });