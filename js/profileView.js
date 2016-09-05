

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/profile.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, profile, headerandpanel){



        profileView = Backbone.View.extend({
  
            events:{
                "click #password_protect_button":"password_protect",
				"click #password_remove_protect_button":"password_remove_protect"
            },
   
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
	
                if(id=='0'){
                    compiledTemplate = _.template( profile );
                }
		
		
                var self=this;
                historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
			
                result= historycollection.get("languages").toJSON();
	
                compiledheaderandpanel=_.template( headerandpanel );
	
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
		
	
            },
	
            password_protect: function(){
                try{
                    var newpassword1 = $('#textinput60').val();
					var newpassword2 = $('#textinput70').val();
					if(newpassword1 != newpassword2){
						alert(this.history.get("languages").get("dic_passwords_not_match"));//passwords_not_match
					}
					else if (newpassword1.length < 4){
						alert(this.history.get("languages").get("dic_password_too_short"));//password_too_short
					}
					else{
						console.log("Contraseña: ->"+newpassword1+"<-");
						console.log("btoa: ->"+btoa(newpassword1)+"<-");

						donot=this.history.get("donotshow");
						donot.set("pass",btoa(newpassword1));
						
						this.history.get("donotshow").destroy();
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
				
				donot=this.history.get("donotshow");
				donot.set("pass","");
				
				this.history.get("donotshow").destroy();
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

        return profileView;
    });