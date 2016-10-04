

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
                "click #botonnext":"save",
				"click #getgalleryphoto":"getfromgallery",
				"click #loadfromfacebook":"loadfromfacebook"
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
				
				console.log("Profile llega como: " + historycollection.get("profile").get("nickname") + ', ' + historycollection.get("profile").get("userID") +  ', ' + historycollection.get("profile").get("email"));
		
				if(historycollection.get("profile").get("nickname")!="" && historycollection.get("profile").get("userID")!="" && historycollection.get("profile").get("email")!=""){ //Están todos los datos obligatorios
				
					console.log("Cargando datos del profile");
					this.$("#fill_profile").attr("style","display:none");
					
					this.$("#displayname").text(historycollection.get("profile").get("nickname"));
					this.$("#useremail").text(historycollection.get("profile").get("email"));
					
					//cargar foto
					setTimeout(function(){
							console.log('Ponemos foto de perfil');
                            var visionphoto = document.getElementById('visionphoto');
							visionphoto.style.display = 'block'; 
							visionphoto.src = historycollection.get("profile").get("picture");
                        },500);
					
					
				}
				
            },
			
			loadfromfacebook: function(){
				
				profileM = this.history.get("profile");
				historial = this.history;
				
				var retrieve_fb_info = function(){
					console.log('retrieve_fb_info');
					console.log(historial);
					facebookConnectPlugin.api(
						profileM.id + "/?fields=id,email,first_name,picture",
						['public_profile'],
						function (response) {
							console.log(JSON.stringify(response));
							console.log(response);
							//RequestsService.sendData(response);
							//$scope.user = response;
							console.log(historial);
							console.log(response.id);
							profileM.set("email",response.email);
							profileM.set("nickname",response.first_name);
							profileM.set("picture", response.picture.data.url);
							profileM.set("userID",response.id);
							profileM.set("lastupdated", new Date());
							profileM.save();
							
							historial.create(profileM);
							
							/*
							var node = {
							  title: userData.authResponse.userID,
							  type: "usernode",
							  field_userid: userData.authResponse.userID,
							  
							};
							
							node_save(node, {
							  success: function(result) {
								console.log("Saved node #" + result.nid);
								node_load(result.nid, {
								  success: function(node) {
									console.log("Loaded " + node.title);
									console.log(node);
								  }
								});
							  }
							});
							*/
					
						},
						function (error) {
							alert("Failed: " + error);
						}
					);
				}
			
				var fbLoginSuccess = function (userData) {
					console.log("UserInfo: ");
					console.log(JSON.stringify(userData));
					console.log(userData.authResponse);
					
					if (profileM.id == 'profile' || typeof profileM.userID == 'undefined'){
						profileM.id = userData.authResponse.userID;
						try{
							historial.get("profile").destroy();
						}
						catch(e){
							console.log("Error intentando eliminar perfil del historial " + e);
						}
						retrieve_fb_info();
					}
					
					
				}
									
				facebookConnectPlugin.login(["public_profile"],
					fbLoginSuccess,
					function (error) { 
						console.log("Fb error:");
						console.log(error);
					}
				);
				
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
			
			addphotovision: function(){
                self = this;
                if (!navigator.camera) {
                    alert("Camera API not supported");
                    return;
                }
                else
                    navigator.camera.getPicture(function(imageData){
                        self.onPhotoDataSuccess(imageData, false);
                    }, this.onFail, {
                        quality: 50,
                        correctOrientation: true,
						allowEdit: true
                    });
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