

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
					
					if(this.profile.get("nickname")!="" && this.profile.get("userID")!="" && this.profile.get("email")!="" && this.profile.get("nid") != "" && typeof this.profile.get("nid") != 'undefined'){ //Están todos los datos obligatorios
				
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
							if(this.profile.get("userID")!="" && typeof this.profile.get("userID")!='undefined'){ //No tenemos el FB ID
								this.router.drupaldo(this.checkOnServer.bind(this),"null");
							}
							else{
								//Intentamos recuperar id + datos de FB
								this.loadfromfacebook();	
							}
						}
						catch(e){
							console.log("Error en loadfromfacebook: " + e);
							alert("Couldn't connect to Facebook " + e);
						}
					}
				}
				else{
					
					//Carga del mapa
					
					compiledTemplate = _.template( map );
				
					this.history.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
					
					result= this.history.get("languages").toJSON();
		
					compiledheaderandpanel=_.template( headerandpanel );
		
					this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
				
					
					$(document).one('pageshow', function (event, ui) {
						self.getCoord();
                    });
					
				}
				
				console.log("Profile llega como: " + this.profile.get("nickname") + ', ' + this.profile.get("userID") +  ', ' + this.profile.get("email"));

            },
			
			getCoord: function(){
				self=this;
				try {
	  
						navigator.geolocation.getCurrentPosition(
						  
						    // Success.
						    function (position){
								auxprofile = self.history.get("profile");
								auxprofile.set("latitude",position.coords.latitude);
								auxprofile.set("longitude",position.coords.longitude);
								self.history.get("profile").destroy();
								self.history.create(auxprofile);
								//updatenode
								
								setTimeout(function(){
									self.initializeMap(position.coords.latitude,position.coords.longitude);
								},300);
								
								},
						  
							// Error
							function(error) {
								
								// Provide debug information to developer and user.
								console.log(error);
								
								setTimeout(function(){
									self.initializeMap(39.4658376,-0.3582468);
								},300);

								// Process error code.
								switch (error.code) {

								  // PERMISSION_DENIED
								  case 1:
									console.log("PERMISSION_DENIED");
									break;

								  // POSITION_UNAVAILABLE
								  case 2:
									console.log("POSITION_UNAVAILABLE");
									break;

								  // TIMEOUT
								  case 3:
									console.log("TIMEOUT");
									break;

								}
							

						  },
						  
						  // Options
						  { enableHighAccuracy: true,
							timeout: 5000	  
							}
						  
						);

					  }
					  catch (error) { console.log('map_module_map_pageshow - ' + error); }
			},
			
			initializeMap: function(_map_module_user_latitude, _map_module_user_longitude){
				
				self= this;
				console.log("initializeMap");
				var mapDiv = document.getElementById("map_module_map");

				const myLatlng = new plugin.google.maps.LatLng(_map_module_user_latitude,_map_module_user_longitude);

				console.log("GETMAP");
				//console.log(plugin.google.maps.Map.getMap());
				console.log(mapDiv);
				
				
				try{
				   // Initialize the map plugin
				   this.map = plugin.google.maps.Map.getMap(mapDiv,
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
				   console.log("Map: ");
				   console.log(map);
				   
				   this.map.on(plugin.google.maps.event.MAP_READY, function() {self.onMapInit(self.map)});
				}
				catch(e){
					console.log("Map error: " + e);
				}
				
				try{
					$("._gmaps_cdv_").attr("style","background-image: none !important;");
				}
				catch(e){
					console.log("Error: "+e);
				}
			},
			
			checkOnServer: function(){
				
				self=this;
				console.log("checkOnServer:");
				
				var params_people = { //active hoffman users
                    type: 'GET',
                    dataType: 'jsonp',
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/hoffpeople",
                    processData: true,
                    success: function(data) {
						var flag = false;
						for (index = 0; index < data.length; ++index) {
                            var auxprofile = data[index];
							console.log("auxprofile:");
							console.log(auxprofile)
							var userID = auxprofile.userID;
							var nombre = auxprofile.nickname;
							var pictureurl = auxprofile.pictureurl.replace("amp;","");
							var email = auxprofile.email;
							var latitude = auxprofile.latitude;
							var longitude = auxprofile.longitude;
							
							if(self.history.get("profile").get("userID") == userID){
								console.log("Mi perfil está almacenado en el servidor");
								profileM=self.history.get("profile");
						
						
								profileM.set("nickname",nombre);
								profileM.set("email",email);
								profileM.set("picture", pictureurl);
								profileM.set("userID",userID);
								profileM.set("nid",auxprofile.nid);
								self.history.get("profile").destroy();
								profileM.save();
									
								self.history.create(profileM);
								flag=true;
								self.router.profile(); //Cargamos el mapa
							}
						}
						if(!flag){
							console.log("Mi perfil no está en el servidor, cargamos el form de usuario");
						}
					},
                    error: function(code) {
                        console.log("petada intentando descargar personas", code);
                    }
                };
				
				$.ajax(params_people);
				
			},
			
			onMapInit:function(map){
				
				console.log("onMapInit");
				console.log(map);
				
				var params_people = { //active hoffman users
                    type: 'GET',
                    dataType: 'jsonp',
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/hoffpeople",
                    processData: true,
                    success: function(data) {
						console.log("DATA: ");
                        console.log(data);
						usersList = [];
						
						for (index = 0; index < data.length; ++index) {
                            var auxprofile = data[index];
							console.log("auxprofile:");
							console.log(auxprofile)
							var userID = auxprofile.userID;
							var nombre = auxprofile.nickname;
							var pictureurl = auxprofile.pictureurl.replace("amp;","");
							var email = auxprofile.email;
							var latitude = auxprofile.latitude;
							var longitude = auxprofile.longitude;
							
							console.log("Usuario con nombre: "+nombre+", email: " +email);
							//console.log("picture: " + pictureurl);
							console.log("Coords: " + latitude + ", " + longitude);
							
							const locationLatlng = new plugin.google.maps.LatLng(latitude,longitude);
							if(usersList[userID] != "used" || typeof usersList[userID] == 'undefined'){
								usersList[userID] = "used";
								map.addMarker({
								  'position': locationLatlng,
								  'title': nombre,
								  'icon': {
									'url': pictureurl,
									'size': {
										width: 30,
										height: 30
									}
								   },
								  'snippet': email
								},
								function(marker) {
									
									marker.setIcon({
										'url': pictureurl,
										'size': {
											width: 30,
											height: 30
										}
									});
								 
									marker.showInfoWindow();
									marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function() {
										console.log("presed map icon");
									});

								}); 
							}
							else{
								console.log("Este nodo ya está en el mapa");
							}
                        }
                    },
                    error: function(code) {
                        console.log("petada intentando descargar personas", code);
                    }
                };

                $.ajax(params_people);
		
				
			},
			
			loadfromfacebook: function(){
				
				profileM = this.history.get("profile");
				historial = this.history;
				
				var retrieve_fb_info = function(){
					console.log('retrieve_fb_info');
					
					facebookConnectPlugin.api(
						profileM.id + "/?fields=id,email,first_name,picture",
						['public_profile', 'email'],
						function (response) {
							console.log(JSON.stringify(response));
							console.log(response);
							//RequestsService.sendData(response);
							//$scope.user = response;
					
							console.log(response.id);
							try{
							profileM.set("userID",response.id);
							console.log("DEBUGDEBUGDEBUG response.id hmtl?: " + response.id);
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
							console.log("Failed: " + error);
						}
					);
				}
			
				var fbLoginSuccess = function (userData) {
					console.log("UserInfo: ");
					console.log(JSON.stringify(userData));
					console.log(userData.authResponse);
					
					if (profileM.id == 'profile' || profileM.get("id") == 'profile' || typeof profileM.id == 'undefined'){
						console.log("profile.id es: " + profileM.id);
						console.log("profile.get('id') es: " + profileM.get("id"));
						console.log("DEBUGDEBUGDEBUG userData.authResponse.userID hmtl?: " + userData.authResponse.userID);
						profileM.id = userData.authResponse.userID;
						profileM.set("userID",userData.authResponse.userID);
						try{
							historial.get("profile").destroy();
						}
						catch(e){
							console.log("Error intentando eliminar perfil del historial " + e);
						}
						profileM.save();
						historial.create(profileM);
						console.log("El userID de Facebook es: " + historial.get("profile").get("userID"));
						retrieve_fb_info();
					}
					else{
						console.log("profile.id es: " + profileM.id);
						console.log("profile.get('id') es: " + profileM.get("id"));
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
				var node;				
				try{
					self= this;

						//mirar si yo tengo el nid
						if(profile.get("nid") != "" && typeof profile.get("nid") != 'undefined'){
							console.log("Ya tenemos el nid: " + profile.get("nid"));	//Lo tenemos en local
							
							node = {
								nid: profile.get("nid"),
								title: profile.id,
								type: "usernode",
								 
								field_userid:{
										"und":[{
											"value":profile.get("userID")
										}]
								},
								field_email:{
										"und":[{
											"value":profile.get("email")
										}]
								},
								field_nickname:{
										"und":[{
											"value":profile.get("nickname")
										}]
								},
								field_lastupdated:{
										"und":[{
											"value":mydate
										}]
								},
								field_pictureurl:{
										"und":[{
											"value":profile.get("picture")
										}]
								},
								field_latitude:{
										"und":[{
											"value":profile.get("latitude")
										}]
								},
								field_longitude:{
										"und":[{
											"value":profile.get("longitude")
										}]
								}
							};
						}
						else{ 			//No lo tenemos en local (nuevo miembro)
						
							node = {
									title: profile.get("userID"),
									type: "usernode",
									 
									field_userid:{
											"und":[{
												"value":profile.get("userID")
											}]
									},
									field_email:{
											"und":[{
												"value":profile.get("email")
											}]
									},
									field_nickname:{
											"und":[{
												"value":profile.get("nickname")
											}]
									},
									field_lastupdated:{
											"und":[{
												"value":mydate
											}]
									},
									field_pictureurl:{
											"und":[{
												"value":profile.get("picture")
											}]
									},
									field_latitude:{
											"und":[{
												"value":profile.get("latitude")
											}]
									},
									field_longitude:{
											"und":[{
												"value":profile.get("longitude")
											}]
									}

								};
							
						}
						
						node_save(node, {
							success: function(result) {
								console.log("Saved node #" + result.nid);
								self.setActive();
								//llamada a node_load puede eliminarse antes de la salida
								node_load(result.nid, {
									success: function(node) {
									console.log("Loaded " + node.title);
									console.log(node);
									}
								});
							self.router.profile();		
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