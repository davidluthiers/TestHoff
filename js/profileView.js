

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
   
            render: function(id, historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
	
                
				compiledTemplate = _.template( profile );
              
				this.origin = id;
				this.router = router;
		
                var self=this;
                historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
			
                result= historycollection.get("languages").toJSON();
	
                compiledheaderandpanel=_.template( headerandpanel );
	
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
				
				console.log("Profile llega como: " + historycollection.get("profile").get("nickname") + ', ' + historycollection.get("profile").get("userID") +  ', ' + historycollection.get("profile").get("email"));
		
				if(historycollection.get("profile").get("nickname")!="" && historycollection.get("profile").get("userID")!="" && historycollection.get("profile").get("email")!=""){ //Están todos los datos obligatorios
				
					console.log("Cargando datos del profile");
					this.$("#fill_profile").attr("style","display:none");
					
					

					//this.$("#displayname").text(historycollection.get("profile").get("nickname"));
					//this.$("#useremail").text(historycollection.get("profile").get("email"));
					
					//cargar foto
					setTimeout(function(){
							document.getElementById("displayname").value = historycollection.get("profile").get("nickname");
							document.getElementById("useremail").value = historycollection.get("profile").get("email");
							console.log('Ponemos foto de perfil');
                            var visionphoto = document.getElementById('visionphoto');
							visionphoto.style.display = 'block'; 
							visionphoto.src = historycollection.get("profile").get("picture");
                        },100);
					
					
				}
				else{
					//Como no hay datos guardados, intentamos cargar los de facebookConnectPlugin
					try{
						//this.loadfromfacebook();
						console.log("Aquí podríamos cargar los datos de FB");
					}
					catch(e){
						console.log("Error en loadfromfacebook: " + e);
					}
				}
				
            },
			
			loadfromfacebook: function(){
				
				profileM = this.history.get("profile");
				historial = this.history;
				
				var retrieve_fb_info = function(){
					console.log('retrieve_fb_info');
					
					facebookConnectPlugin.api(
						profileM.id + "/?fields=id,email,first_name,picture",
						['public_profile'],
						function (response) {
							console.log(JSON.stringify(response));
							console.log(response);
							//RequestsService.sendData(response);
							//$scope.user = response;
					
							console.log(response.id);
							try{
							profileM.set("userID",response.id);
							profileM.save();}
							catch(e){console.log("Nuevo error:" + e);}
							
							historial.create(profileM);
							
							
							$("#fill_profile").attr("style","display:none");
					
							//$("#displayname").text(response.first_name);
							//$("#useremail").text(response.email);
							document.getElementById("displayname").value = response.first_name;
							document.getElementById("useremail").value = response.email;
							
							//cargar foto
							setTimeout(function(){
									console.log('Ponemos foto de perfil');
									var visionphoto = document.getElementById('visionphoto');
									visionphoto.style.display = 'block';
									visionphoto.src = response.picture.data.url;
								},500);
					
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
			
			saveonserver: function(){
				
				profile = this.history.get("profile");
				
				console.log(profile.get("nickname"));
				
				var node = {
				  title: profile.get("userID"),
				  type: "usernode",
				  field_userid: profile.get("userID"),
				  field_email: profile.get("email"),
				  field_nickname: profile.get("nickname"),
				  field_lastupdated: new Date()
				  
				};
				
				try{
					node_save(node, {
					  success: function(result) {
						console.log("Saved node #" + result.nid);
						/*
						node_load(result.nid, {
						  success: function(node) {
							console.log("Loaded " + node.title);
							console.log(node);
						  }
						});
						*/
					  }
					});
				}
			catch(e){
				console.log("Error save_node: " + e);
			}
				
				
				console.log("saveonserver");
				
			},
	
            save: function(){
				console.log("Save profile function");
				
                try{
					if (typeof $("#displayname").val() != 'undefined' && typeof $("#useremail").val() != 'undefined' && $("#displayname").val() != "" && $("#useremail").val() !=""){
						//Tiene valores válidos
						profileM=this.history.get("profile");
						
						
						profileM.set("nickname",$("#displayname").val());
						profileM.set("email",$("#useremail").val());
						var visionphoto = document.getElementById('visionphoto');
						profileM.set("picture", visionphoto.src);
						profileM.set("userID",this.history.get("profile").get("userID"));
						profileM.set("lastupdated", new Date());
						this.history.get("profile").destroy();
						profileM.save();
							
						this.history.create(profileM);
						
						
						this.router.drupaldo(this.saveonserver.bind(this),"null");
						
						
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