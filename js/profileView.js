

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
                "click #botonnext":"save"
            },
   
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
	
                
				compiledTemplate = _.template( profile );
              
				this.origin = id;
		
                var self=this;
                historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
			
                result= historycollection.get("languages").toJSON();
	
                compiledheaderandpanel=_.template( headerandpanel );
	
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
		
				if(historycollection.get("profile").get("nickname")!="" && historycollection.get("profile").get("userID")!="" && historycollection.get("profile").get("email")!=""){ //Están todos los datos obligatorios
					this.$("#fill_profile").attr("style","display:none");
					
					this.$("#displayname").text(historycollection.get("profile").get("nickname"));
					this.$("#useremail").text(historycollection.get("profile").get("email"));
					
					//cargar foto
					var visionphoto = document.getElementById('visionphoto');
					visionphoto.style.display = 'block'; 
					visionphoto.src = historycollection.get("profile").get("picture");
					
				}
				
            },
	
            save: function(){
				console.log("Save profile function");
				
                try{
					if (typeof $("#displayname").val() != 'undefined' && typeof $("#useremail").val() != 'undefined' && $("#displayname").val() != "" && $("#useremail").val() !=""){
						//Tiene valores válidos
						auxprofile=this.history.get("profile");
						auxprofile.set("nickname",$("#displayname").val());
						auxprofile.set("email",$("#useremail").val());
						
						this.history.get("profile").destroy();
						this.history.create(auxprofile);
						
						if(this.origin == 0){
							//Volver summary
							 Backbone.history.navigate("#summary", {
								trigger: true
							});
						}
						else {
							//Ir al mapa
							console.log("ir al mapa");
						}
						
					}
					else{
						//Falta algún valor obligatorio
						alert(this.history.get("languages").get("dic_profile_required"));
					}
                }
                catch(e){
					console.log(e);
                }
            },
			
			onPhotoDataSuccess: function(imageData, base64){
				console.log("onPhotoDataSuccess, imagedata: ");
				console.log(imageData);
                var visionphoto = document.getElementById('visionphoto');
                visionphoto.style.display = 'block'; 
				if(base64)
					imageData = "data:image/png;base64," + imageData;
				visionphoto.src = imageData;
				
				//Guardamos la foto
                auxprofile=this.history.get("profile");
				auxprofile.set("picture",imageData);
				this.history.get("profile").destroy();
				this.history.create(auxprofile);
		
            },
			
			getfromgallery:function(){
                var self=this;
                try{
                    if (!navigator.camera) {
                        alert("Camera API not supported");
                        return;
                    }
                    else
                        navigator.camera.getPicture(function(imageData){
                            self.onPhotoDataSuccess(imageData, true);
                        }, this.onFail, {
                            quality: 50,
							destinationType: 0, //Camera.DestinationType.DATA_URL,
                            correctOrientation: true,
                            sourceType: 0,
							allowEdit: true
                        });
                }
                catch(e){
                    console.log(e);
                }
            }


        });

        return profileView;
    });