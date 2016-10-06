

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/profile.html',
	'text!../Templates/map.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, profileT, map, headerandpanel){



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
	
                
				
              
				this.origin = id;
				this.router = router;
				this.profile = historycollection.get("profile");
		
                var self=this;
				
				if(this.profile.get("active") != "yes"){
					
					/*
						aquí hay que poner código para que compruebe si en el servidor ya hay datos guardados con mi ID de FB
					*/
					
					compiledTemplate = _.template( profileT );
					
					//Carga del profile
					historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
				
					result= historycollection.get("languages").toJSON();
		
					compiledheaderandpanel=_.template( headerandpanel );
		
					this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
					
					if(this.profile.get("nickname")!="" && this.profile.get("userID")!="" && this.profile.get("email")!=""){ //Están todos los datos obligatorios
				
						console.log("Cargando datos del profile");
						this.$("#fill_profile").attr("style","display:none");

						//cargar foto
						setTimeout(function(){
								document.getElementById("displayname").value = this.profile.get("nickname");
								document.getElementById("useremail").value = this.profile.get("email");
								console.log('Ponemos foto de perfil');
								var visionphoto = document.getElementById('visionphoto');
								visionphoto.style.display = 'block'; 
								visionphoto.src = this.profile.get("picture");
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
							alert("Couldn't connect to Facebook " + e);
						}
					}
				}
				else{
					//Carga del mapa
					this.loadMap();
					
				}
				
				console.log("Profile llega como: " + this.profile.get("nickname") + ', ' + this.profile.get("userID") +  ', ' + this.profile.get("email"));
		
				
				
            },
			
			loadMap: function(){
				
				console.log("loadMap");
				
				compiledTemplate = _.template( map );
				
				historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
				
				result= historycollection.get("languages").toJSON();
	
				compiledheaderandpanel=_.template( headerandpanel );
	
				this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
				
				$(document).one('pageshow', this.initializeMap);

			},
			
			initializeMap: function(){
				
				console.log("initializeMap");
				var mapDiv = document.getElementById("map_module_map");

				const myLatlng = new plugin.google.maps.LatLng(_map_module_user_latitude,_map_module_user_longitude);

				console.log("GETMAP");
				//console.log(plugin.google.maps.Map.getMap());
				console.log(mapDiv);
				
				
				
			   // Initialize the map plugin
			   map = plugin.google.maps.Map.getMap(mapDiv,
			   {
				  'backgroundColor': 'white',
				  'mapType': plugin.google.maps.MapTypeId.ROADMAP,
				  'controls': {
					'compass': true,
					'myLocationButton': true,
					'indoorPicker': true,
					'zoom': true
				  },
				  'gestures': {
					'scroll': true,
					'tilt': true,
					'rotate': true,
					'zoom': true
				  },
				  'camera': {
					'latLng': myLatlng,
					'tilt': 30,
					'zoom': 4,
					'bearing': 50
				  }
				}
			   );
				
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
									$.mobile.silentScroll(0);
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
				
				mydate = new Date();
				
				var node = {
					title: profile.get("userID"),
					type: "usernode",
					 
					field_userid:{
							"und":[{
								"value":profile.get("userID"),
								"safe_value":profile.get("userID")
							}]
					},
					field_email:{
							"und":[{
								"value":profile.get("email"),
								"safe_value":profile.get("email")
							}]
					},
					field_nickname:{
							"und":[{
								"value":profile.get("nickname"),
								"safe_value":profile.get("nickname")
							}]
					},
					field_lastupdated:{
							"und":[{
								"value":mydate,
								"safe_value":mydate
							}]
					},
					field_pictureurl:{
							"und":[{
								"value":profile.get("picture"),
								"safe_value":profile.get("picture")
							}]
					}
						
					/*
					field_userid.und[0].value: profile.get("userID"),
					field_email.und[0].value: profile.get("email"),
					field_nickname.und[0].value: profile.get("nickname"),
					field_lastupdated.und[0].value: new Date(),
					field_pictureurl.und[0].value: profile.get("picture")
					 */
				};
				
								
				try{
					self= this;
					node_save(node, {
					  success: function(result) {
						console.log("Saved node #" + result.nid);
						self.setActive();
						node_load(result.nid, {
						  success: function(node) {
							console.log("Loaded " + node.title);
							console.log(node);
						  }
						});
						
					  }
					});
				}
			catch(e){
				console.log("Error save_node: " + e);
			}
				
				
				console.log("saveonserver");
				
			},
			
			setActive: function(){
				profile= this.history.get("profile");
				this.history.get("profile").destroy();
				profile.set("active", "yes");
				profile.set("saved", "yes");
				profile.save();
				this.history.create(profile);
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
						
						
						if(this.origin == '0'){
							//Volver summary
							 Backbone.history.navigate("#profile", {
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
				$.mobile.silentScroll(0);
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