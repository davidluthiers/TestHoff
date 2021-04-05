

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/profile.html',
	'text!../Templates/profile2.html',
	'text!../Templates/profileDoNotShow.html',
	'text!../Templates/map.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, profileT, profileT2, profileDoNotShow, map, headerandpanel){



        profileView = Backbone.View.extend({
  
            events:{
                "click #botonnext":"save",
				"click #getgalleryphoto":"getfromgallery",
				"click #loadfromfacebook":"loadbyrequest",
				"click #toggle_profile":"toggle_profile",
				"click #send_email":"send_email",
				"click #back_to_map":"back_to_map",
				"click .donotshowagain":"checkboxevt",
				"click #exitmap":"exitmap"
            },
   
            render: function(id, historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
	
                
				console.log("Render profile con id: " + id);
              
				this.origin = id;
				this.router = router;
				this.profile = historycollection.get("profile");
				this.byrequest=false;
				
                var self=this;
				
				if(id == '0'){ //Carga donotshow
					compiledTemplate = _.template( profileDoNotShow );

					historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
				
					result= historycollection.get("languages").toJSON();
		
					compiledheaderandpanel=_.template( headerandpanel );
		
					this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
					setTimeout(function(){
						$('#checkboxes1').change(function() {
							console.log("Change");
							self.checkboxevt();
						});
					},400);	
				}
				else{
					if(typeof id != 'undefined' && id == '2'){ //Carga de otro usuario
						compiledTemplate = _.template( profileT2 );
							
						//Carga del profile
						historycollection.get("languages").set("helppanel",self.history.get("languages").get("dic_profile"));
					
						result= historycollection.get("languages").toJSON();
			
						compiledheaderandpanel=_.template( headerandpanel );
			
						this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
						
						setTimeout(function(){
							try{
								var mapDiv = document.getElementById("map_module_map");
								this.map = plugin.google.maps.Map.getMap(mapDiv);
								this.map.remove();
							}
							catch(e){
								console.log("Error: " + e);
							}
							console.log(self.history.get("profile").get("near_users"));
							self.profile = self.history.get("profile").get("near_users")[self.history.get("profile").get("next_user")];
							console.log("self.profile:");
							console.log(self.profile);
							document.getElementById('displayname').innerHTML = ''; //self.profile.nickname + " " + self.history.get("languages").get("dic_says") + ":";
							console.log('Ponemos foto de perfil');
							document.getElementById('useremail').innerHTML = self.profile.email;
							var textArea = document.createElement('textarea');
							statusvar = self.profile.status.value;
							if (typeof statusvar != 'undefined' && statusvar!= "undefined"){
								textArea.innerHTML = self.profile.status.value;
								document.getElementById('status').innerHTML = textArea.value;
							}
							document.getElementById('profileHeader').innerHTML = self.profile.nickname.value;
							
							var visionphoto = document.getElementById('visionphoto');
							visionphoto.style.display = 'block'; 
							//visionphoto.src = self.profile.pictureurl.replace("amp;","");
							visionphoto.src = self.profile.picturevalue;
							console.log(self.profile.picturevalue);
							/*if(self.profile.pictureurl.substring(0,4) == "http"){ //La imagen es un link, proviene de facebook/drupal
								visionphoto.style.height = '50px';
								visionphoto.style.width = '50px';
							}*/

						},400);					
						
					}
					else{
						if(this.profile.get("nid")=="" || this.profile.get("active") != "yes" || (typeof id != 'undefined' && id == '1')){ //Edición de propio perfil
												
							this.origin = '0';
							
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
										this.profile = historycollection.get("profile");
										document.getElementById("displayname").value = this.profile.get("nickname");
										document.getElementById("useremail").value = this.profile.get("email");
										document.getElementById("status").value = this.profile.get("status");
										console.log('Ponemos foto de perfil');
										var visionphoto = document.getElementById('visionphoto');
										visionphoto.style.display = 'block'; 
										visionphoto.src = this.profile.get("picture");
										visionphoto.style.width = '30%';
										if(this.profile.get("picture").substring(0,4) == "http"){ //La imagen es un link, proviene de facebook
											visionphoto.style.height = '50px';
											visionphoto.style.width = '50px';
										}
										if(this.profile.get("active")=="yes"){
											$(".activate").hide();
											$(".deactivate").show();
										}
										if(this.profile.get("active")=="no"){
											$(".activate").show();
											$(".deactivate").hide();
										}
										if(this.profile.get("active")!="no" && this.profile.get("active")!="yes"){
											$(".activate").hide();
											$(".deactivate").hide();
										}
										
										try{
											var mapDiv = document.getElementById("map_module_map");
											this.map = plugin.google.maps.Map.getMap(mapDiv);
											this.map.remove();
										}
										catch(e){
											console.log("Error: " + e);
										}
										window.plugins.spinnerDialog.hide();
										
									},400);

							}
							else{
								//Como no hay datos guardados, intentamos cargar los de facebookConnectPlugin
								try{
									if(this.profile.get("active")=="yes"){
										this.$(".activate").hide();
										this.$(".deactivate").show();
									}
									if(this.profile.get("active")=="no"){
										this.$(".activate").show();
										this.$(".deactivate").hide();
									}
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
							
							this.origin= '1';
						
							this.$("#botonnext").text(self.history.get("languages").get("dic_profile"));
							
							window.plugins.spinnerDialog.show(null, null, function () {  console.log("callback");} );
							
							this.$(".panelbutton").hide();
							this.$(".dic_help").hide();						
							
							$(document).one('pageshow', function (event, ui) {
								if(navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){
									alert(self.history.get("languages").get("dic_no_internet"));
									setTimeout(function(){
										Backbone.history.navigate("#summary", {
											trigger: true
										});

									},400);
								}
								else{
									self.getCoord();
									/*setTimeout(function(){
										if(device.platform!='Android'){ //iOS
											try{
												console.log("iOS, cambiamos map_header");
												$("#map_header").attr("style","margin-top: 9%;");
											}
											catch(e){
												console.log("Error cambiando header ios: " + e);
											}
										}
									},400);*/
									
								}
							});
							
						}
					}
				}
				console.log("Profile llega como: " + this.profile.get("nickname") + ', ' + this.profile.get("userID") +  ', ' + this.profile.get("email"));

            },

			getCoord: function(){
				self=this;
				/*
				try{
					var mapDiv = document.getElementById("map_module_map");
					this.map = plugin.google.maps.Map.getMap(mapDiv);
					this.map.remove();
				}
				catch(e){
					console.log("Error: " + e);
				}
				*/
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
							self.saveonserver(true);
							self.saveonserverAndInitialize(true, position.coords.latitude,position.coords.longitude);

							
							},
					  
						// Error
						function(error) {
							
							// Provide debug information to developer and user.
							console.log(error);
							
							/*setTimeout(function(){
								self.initializeMap(39.4658376,-0.3582468);
							},300);*/
							
							alert(historial.get("languages").get("dic_gps_required"));
							Backbone.history.navigate("#summary", {
								trigger: true
							});

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
					  { enableHighAccuracy: false,
						timeout: 10000,
						maximumAge: 300000						
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
						'zoom': 4
					  }
					}
				   );
				 
				   console.log("Map: ");
				   console.log(map);

				   this.map.on(plugin.google.maps.event.MAP_READY, function() {self.onMapInit(self.map)});
				}
				catch(e){
					console.log("Map error: " + e);
					window.plugins.spinnerDialog.hide();
				}
				
				try{
					$("._gmaps_cdv_").attr("style","background-image: none !important; height: 90%;");
					$("#map_module_map").attr("style","background-image: none !important; height: 90%;");
				}
				catch(e){
					console.log("Error: "+e);
				}
			},
			
			checkOnServer: function(){
				
				self=this;

				historial= this.history;
				console.log("checkOnServer:");
				
				var auxprofile = this.history.get("profile");
				auxprofile.set("info","facebook");
				auxprofile.save();
				this.history.get("profile").destroy();
				this.history.create(auxprofile);
				
				$(".activate").hide();
				$(".deactivate").hide();
				
				window.plugins.spinnerDialog.show(null, null, function () {  console.log("callback");} );
				
				var params_people = { //active hoffman users
                    type: 'GET',
                    dataType: 'json',
                    url: "http://appv2.hoffman-international.com/hoffapp/views/hoffpeople2?display_id=services_1&filters[field_userid_value]=" + historial.get("profile").get("userID"),
                    processData: true,
                    success: function(data) {
						var flag = false;
						for (index = 0; index < data.length; ++index) {
                            var auxprofile = data[index];
							console.log("auxprofile:");
							console.log(auxprofile)
							var userID = auxprofile.userid;
							var nombre = auxprofile.nickname;
							//console.log("auxprofile.pictureurl: " + auxprofile.pictureurl);
							if(typeof auxprofile.pictureurl != 'undefined' && auxprofile.pictureurl != "")
								var pictureurl = auxprofile.pictureurl.replace("amp;","");
							var email = auxprofile.email;
							var latitude = auxprofile.latitude;
							var longitude = auxprofile.longitude;
							
							if(historial.get("profile").get("userID") == userID){
								console.log("Mi perfil está almacenado en el servidor");
								profileM=historial.get("profile");
								profileM.set("nickname",nombre);
								profileM.set("email",email);
								profileM.set("picture_thumb", auxprofile.picturevalue_thumb);
								profileM.set("userID",userID);
								profileM.set("nid",auxprofile.nid);
								profileM.set("status",auxprofile.status);
								console.log("RECUPERAMOS PICTUREVALUE: " + auxprofile.picturevalue); //picturevalue_thumb
								
								var fbcontainer = document.getElementById('visionphoto');
								//fbcontainer.height=2000;
								//fbcontainer.width=2000;
								fbcontainer.src = auxprofile.picturevalue;
								fbcontainer.onload = function() {
									var canvas = document.getElementById('myCanvas');
									console.log("SIZES: " + fbcontainer.width + ", " +fbcontainer.height);
									console.log("TEST: " + this.width + ", " + this.height);
									canvas.width = this.width;
									canvas.height = this.height;
									console.log("SIZES: " + canvas.width + ", " +canvas.height);
									var ctx = canvas.getContext("2d");
									ctx.clearRect(0, 0, canvas.width, canvas.height);
									ctx.drawImage(fbcontainer, 0, 0);
									var dataURL = canvas.toDataURL();
									console.log("downloaded picture: ");
									console.log(dataURL);
									profileM.set("picture", dataURL);
									
									historial.get("profile").destroy();
									console.log("EL PERFIL RESULTANTE ES: ");
									console.log(profileM);
									profileM.save();
										
									historial.create(profileM);
									self.router.profile(); //Cargamos el mapa
								};
								flag=true;
								
							}
						}
						if(!flag){
							window.plugins.spinnerDialog.hide();
							self.getFBid();
							console.log("Mi perfil no está en el servidor, cargamos el form de usuario");
						}
					},
                    error: function(code) {
                        console.log("petada intentando descargar personas", code);
						window.plugins.spinnerDialog.hide();
                    }
                };
				
				$.ajax(params_people);
				
			},
			
			getFBid: function(){
				console.log("getFBid");
				var fbLoginSuccessgetFBid = function (userData) {
					console.log("UserInfo: ");
					console.log(JSON.stringify(userData));
					console.log(userData.authResponse);
					
					if (profileM.id == 'profile' || profileM.get("id") == 'profile' || typeof profileM.id == 'undefined'){
						console.log("profile.id es: " + profileM.id);
						console.log("profile.get('id') es: " + profileM.get("id"));
						console.log("userData.authResponse.userID hmtl?: " + userData.authResponse.userID);
						profileM.id = userData.authResponse.userID;
						profileM.set("userID",userData.authResponse.userID);
						try{
							historial.get("profile").destroy();
						}
						catch(e){
							console.log("Error intentando eliminar perfil del historial " + e);
						}
						//profileM.save();
						//historial.create(profileM);
					}
				}
				
				$("#back_to_map").hide();
				
				facebookConnectPlugin.login(["public_profile"],
					fbLoginSuccessgetFBid,
					function (error) { 
						console.log("fbLoginSuccessgetFBid error:");
						console.log(error);
					}
				);
			},
			
			splitMarkers: function(data){
				console.log("splitMarkers");
				for (index = 0; index < data.length; ++index) {
					for (index2 = index+1; index2 < data.length; ++index2) {
						if(index!=index2 &&(data[index].latitude-data[index2].latitude<0.01 &&  data[index].longitude-data[index2].longitude<0.01)){//Están a menos de medio kilómetro
							randomLatitude = 0;
							randomLongitude = 0;
							if (Math.random() < 0.5)
								randomLatitude = 0.01;
							else
								randomLatitude = -0.01;
							
							if (Math.random() < 0.5)
								randomLongitude = 0.01;
							else
								randomLongitude = -0.01;
							
							//console.log("Sumamos: " + randomLatitude + ", " + randomLongitude);
							data[index2].latitude = Number(data[index2].latitude) + randomLatitude;
							data[index2].latitude = data[index2].latitude.toString();
							data[index2].longitude = Number(data[index2].longitude) + randomLongitude;
							data[index2].longitude = data[index2].longitude.toString();
						}
					}
				}
				return data;
			},
			
			fillMap: function(data,map){
				historial = this.history;
				myprofile = this.history.get("profile");
				self=this;
				
				usersList = [];
				historial.get("profile").destroy();
				historial.create(myprofile);
				for (index = 0; index < data.length; ++index) {
					console.log("INDEX: " + index);
					var auxprofile = data[index];
					if (auxprofile.status=='undefined'){
						auxprofile.status = " ";
						data[index].status = " ";
					}
					
					if(historial.get("profile").get("userID") == auxprofile.userid){ //Encontramos el nodo propio del usuario
						if(typeof auxprofile.pictureurl != 'undefined' && auxprofile.pictureurl != ""){
								try{
									pictureurl = auxprofile.pictureurl.replace("amp;","");
								}
								catch(e){
									pictureurl="http://i.imgur.com/Tz9JNSg.png";
								}
						}
					}
					var userID = auxprofile.userid;
					var nombre = auxprofile.nickname;
					var pictureurl;
					try{
						pictureurl = auxprofile.pictureurl.replace("amp;","");
					}
					catch(e){
						pictureurl="http://i.imgur.com/Tz9JNSg.png";
					}

					var email = auxprofile.email;
					var latitude = auxprofile.latitude;
					var longitude = auxprofile.longitude;
					var isactive = auxprofile.active;
					console.log("Usuario con nombre: "+nombre+", email: " +email);

					console.log("Coords: " + latitude + ", " + longitude);
					console.log("isactive: " + isactive + ", usersList[userID]: " + usersList[userID] + ", typeof usersList[userID]: " + typeof usersList[userID]);
					
					const locationLatlng = new plugin.google.maps.LatLng(latitude,longitude);
					if(isactive == "yes" && (usersList[userID] != "used" || typeof usersList[userID] == 'undefined' )){
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
						  'snippet': historial.get("languages").get("click_here"),
						  'myid':index
						},
						function(marker) {

							marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(evt) {
								
								historial=self.history;
								myprofile=historial.get("profile");
								markerid = marker.get('myid');
								myprofile.set("next_user", markerid);
								historial.get("profile").destroy();
								historial.create(myprofile);
								self.router.profile('2');
							});
							
							marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function(evt) {
								console.log("marker click");
								console.log(evt);
								auxprofile= data[marker.get('myid')];																	
							 });
							
						}); 
					}
					else{
						console.log("Este nodo ya está en el mapa");
					}
					
				}
				
				console.log("loop ended");
				
				setTimeout(function(){
							window.plugins.spinnerDialog.hide();
							window.plugins.spinnerDialog.hide();
							window.plugins.spinnerDialog.hide();
				},1000);
			},
						
			onMapInit:function(map){
				
				console.log("onMapInit");
				
				try{
					var auxprofile = this.history.get("profile");
					auxprofile.set("info","facebook");
					auxprofile.save();
					this.history.get("profile").destroy();
					this.history.create(auxprofile);
					historial = this.history;
					myprofile = this.history.get("profile");
					
					if(false){//myprofile.get("near_users") != ""){ //myprofile.get("near_users") Comprobar si tenemos los datos en local
						this.fillMap(myprofile.get("near_users"),map);
					}
					else{
						self=this;
							
						var params_people = { //active hoffman users
							type: 'GET',
							dataType: 'json',
							url: "http://appv2.hoffman-international.com/hoffapp/hoffpeople2",
							processData: true,
							success: function(data) {
								console.log("DATA: ");
								console.log(data);
								usersList = [];
								data  = self.splitMarkers(data);
								console.log("After data:");
								console.log(data);
								console.log('LENGTH: ' +data.length);
								myprofile.set("near_users", data);
								historial.get("profile").destroy();
								historial.create(myprofile);
								for (index = 0; index < data.length; ++index) {
									console.log("INDEX: " + index);
									var auxprofile = data[index];
									if (auxprofile.status=='undefined'){
										auxprofile.status = " ";
										data[index].status = " ";
									}
									
									/*if(historial.get("profile").get("userID") == auxprofile.userID){ //Encontramos el nodo propio del usuario
										var pictureurl;
										var userID = auxprofile.userID;
										var nombre = auxprofile.nickname.value;
										//console.log("auxprofile.pictureurl: " + auxprofile.pictureurl);
										if(typeof auxprofile.pictureurl != 'undefined' && auxprofile.pictureurl != ""){
												try{
													pictureurl = auxprofile.pictureurl.replace("amp;","");
												}
												catch(e){
													pictureurl="http://i.imgur.com/Tz9JNSg.png";
												}
										}
										var email = auxprofile.email;
										console.log("Mi perfil está almacenado en el servidor, lo actualizo en el dispositivo");
										profileM=historial.get("profile");
								
										profileM.set("nickname",nombre);
										profileM.set("email",email);
										profileM.set("picture", pictureurl);
										profileM.set("userID",userID);
										profileM.set("nid",auxprofile.nid);
										profileM.set("status",auxprofile.status);
										profileM.set("picture_thumb",auxprofile.picturevalue_thumb);
										
										var fbcontainer = document.getElementById('visionphoto');
										fbcontainer.src = auxprofile.picturevalue;
										fbcontainer.onload = function() {
											var canvas = document.getElementById('myCanvas');
											canvas.width = fbcontainer.width;
											canvas.height = fbcontainer.height;
											var ctx = canvas.getContext("2d");
											ctx.clearRect(0, 0, canvas.width, canvas.height);
											ctx.drawImage(fbcontainer, 0, 0);
											var dataURL = canvas.toDataURL();
											console.log("downloaded picture: ");
											console.log(dataURL);
											profileM.set("picture", dataURL);
											
											historial.get("profile").destroy();
											profileM.save();
											self.router.drupaldo(self.saveonserver.bind(self),true);
												
											historial.create(profileM);
										};
									}*/
									
								
									
									/*
									console.log("near_users:");
									console.log(historial.get("profile").get("near_users"));
									console.log(historial.get("profile"));
									console.log("auxprofile:");
									console.log(auxprofile);
									*/
									var userID = auxprofile.userID;
									var nombre = auxprofile.nickname;
									var picturenewurl;
									
									//var pictureurl;
									/*
									try{
										if(typeof auxprofile.picturevalue_thumb != 'undefined' && auxprofile.picturevalue_thumb != ""){
											picturenewurl = auxprofile.picturevalue_thumb;
										}
										else{
											picturenewurl="http://i.imgur.com/Tz9JNSg.png";
										}
									}
									catch(e){
										picturenewurl="http://i.imgur.com/Tz9JNSg.png";
									}
									*/
									
									//pictureurl="www/img/user_icon30x30.png";

									var email = auxprofile.email;
									var latitude = auxprofile.latitude;
									var longitude = auxprofile.longitude;
									var isactive = auxprofile.active;
									console.log("Usuario con nombre: "+nombre+", email: " +email);
									//console.log("picture: " + pictureurl);
									/*
									if(historial.get("profile").get("userID") == auxprofile.userID){
										console.log("Asignando coordenadas propias:");
										latitude = historial.get("profile").get("latitude");
										longitude = historial.get("profile").get("longitude");
									}*/
									console.log("Coords: " + latitude + ", " + longitude);
									console.log("Picture URL: "+ picturenewurl);
									console.log("isactive: " + isactive + ", userID: " + userID +", usersList[userID]: " + usersList[userID] + ", typeof usersList[userID]: " + typeof usersList[userID]);
									
									const locationLatlng = new plugin.google.maps.LatLng(latitude,longitude);
									if(isactive == "yes" && (usersList[userID] != "used" || typeof usersList[userID] == 'undefined' )){
										usersList[userID] = "used";
										map.addMarker({
										  'position': locationLatlng,
										  'title': nombre,
										  /*'icon': {
											'url': picturenewurl,
											 'size': {
												width: 30,
												height: 30
												}
										   },*/
										  'snippet': historial.get("languages").get("click_here"),
										  'myid':index
										},
										function(marker) {

											/*
											marker.setIcon({
												//'url': pictureurl,
												'size': {
													width: 30,
													height: 30
												}
											});
											*/
											//marker.showInfoWindow();

											marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(evt) {
												
												historial=self.history;
												myprofile=historial.get("profile");
												console.log(evt);
												console.log(marker.get('myid'));
												//console.log("pressed map icon");
												//console.log(markerid);
												markerid = marker.get('myid');
												myprofile.set("next_user", markerid);
												historial.get("profile").destroy();
												historial.create(myprofile);
												self.router.profile('2');
											});
											
											marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function(evt) {
												console.log("marker click");
												console.log(evt);
												//auxprofile= data[evt.id.replace("marker_m","")];										
												console.log(marker.get('myid'));
												auxprofile= data[marker.get('myid')];
												//auxprofile= data[evt.id.replace("marker_m","")];
												/*
												if(auxprofile.userID != historial.get("profile").get("userID"))
													map.animateCamera({
														target: {lat: auxprofile.latitude, lng: auxprofile.longitude},
														zoom: 15,
														duration: 3000
													}, function() {});
													*/
											
											 });
											
										}); 
									}
									else{
										console.log("Este nodo ya está en el mapa");
									}
									
								}
								
								console.log("loop ended");
								
								setTimeout(function(){
											window.plugins.spinnerDialog.hide();
											window.plugins.spinnerDialog.hide();
											window.plugins.spinnerDialog.hide();
								},1000);
								
								
								/*
								map.animateCamera({
									target: {lat: latitude, lng: longitude},
									zoom: 4,
									duration: 3000
								}, function() {});
								*/
								
								
							},
							error: function(code) {
								console.log("petada intentando descargar personas", code);
								window.plugins.spinnerDialog.hide();
							}
						};

						$.ajax(params_people);

					}
				}
				catch(e){
					console.log("Error mapinit " + e);
				}
			},
			
			checkboxevt: function (){
                donot=this.history.get("donotshow");
				console.log("CHECKBOX ATTR: ");
				console.log($("#checkbox").attr("data-icon"));
                if($("#checkbox").attr("data-icon")=="checkbox-on"){ //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    donot.set("mapDoNotShow",false);
				}
                else{
                    donot.set("mapDoNotShow",true);
				}
                this.history.get("donotshow").destroy();
                this.history.create(donot);
				console.log("saved donotshow");
	
            },
			
			loadbyrequest: function(){
				this.byrequest=true;
				this.loadfromfacebook();
			},
			
			loadfromfacebook: function(){
				
				var auxprofile = this.history.get("profile");
				auxprofile.set("info","facebook");
				this.history.get("profile").destroy();
				auxprofile.save();
				this.history.create(auxprofile);
				
				profileM = this.history.get("profile");
				historial = this.history;
				byrequest = this.byrequest;
				self=this;
				
			
				var fbLoginSuccess = function (userData) {
					console.log("UserInfo: ");
					console.log(JSON.stringify(userData));
					console.log(userData.authResponse);
					
					if (profileM.id == 'profile' || profileM.get("id") == 'profile' || typeof profileM.id == 'undefined'){
						console.log("profile.id es: " + profileM.id);
						console.log("profile.get('id') es: " + profileM.get("id"));
						console.log("DEBUGDEBUGDEBUG userData.authResponse.userID hmtl?: " + userData.authResponse.userID);
						profileM.set("nid",historial.get("profile").get("nid")); //guardamos el ID del nodo en nuestro server
						profileM.id = userData.authResponse.userID;
						profileM.set("userID",userData.authResponse.userID);
						profileM.set("active", "yes");
						try{
							historial.get("profile").destroy();
						}
						catch(e){
							console.log("Error intentando eliminar perfil del historial " + e);
						}
						profileM.save();
						historial.create(profileM);
						console.log("El userID de Facebook es: " + historial.get("profile").get("userID"));
						
						console.log("Byrequest: " + byrequest);
						if(byrequest){ //Si hemos pulsado el botón de FB cargamos datos
												
							//retrieve_fb_info
							facebookConnectPlugin.api(
								historial.get("profile").get("userID") + "/?fields=id,email,first_name,picture",
								['public_profile'],
								function (response) {
									console.log(JSON.stringify(response));
									console.log(response);

									console.log(historial.get("profile").get("userID"));
									
									profileM.set("userID",historial.get("profile").get("userID"));
									console.log("DEBUGDEBUGDEBUG response.id hmtl?: " + response.id);
									profileM.save();

									historial.create(profileM);
																	
									$("#fill_profile").attr("style","display:none");

									document.getElementById("displayname").value = response.first_name;
									if(typeof response.email != 'undefined' && response.email != 'undefined')
										document.getElementById("useremail").value = response.email;
									
									//cargar foto
									setTimeout(function(){
											console.log('Ponemos foto de perfil');
											var visionphoto = document.getElementById('visionphoto');
											var fbcontainer = document.getElementById('fbcontainer');
											
											visionphoto.style.display = 'block';
											fbcontainer.src = response.picture.data.url;
											//$.mobile.silentScroll(100);
											fbcontainer.onload = function() {
												
												//var canvas = document.createElement("canvas");
												var canvas = document.getElementById('myCanvas');
												canvas.width = fbcontainer.width;
												canvas.height = fbcontainer.height;
												var ctx = canvas.getContext("2d");
												ctx.clearRect(0, 0, canvas.width, canvas.height);
												ctx.drawImage(fbcontainer, 0, 0);
												var dataURL = canvas.toDataURL();
												console.log("FB picture: ");
												console.log(dataURL);
												visionphoto.src = dataURL;
												//$.mobile.silentScroll(100);
												
											} ;
											
										},500);
							
								},
								function (error) {
									console.log("Failed: " + error);
									console.log(error);
								}
							);
						}
						else{		//Si acabamos de entrar por primera vez nos buscamos en el servidor y esperamos
							self.checkOnServer();
						}
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
			
			saveonserverAndInitialize: function(afterCoords, latitude, longitude){
				
				this.setActive();
				profile = this.history.get("profile");
				console.log(profile.get("nickname"));
				try{
					console.log("1 SUBO AL SERVIDOR LA FOTO: " + profile.get("picture").substring(0,80));
				}
				catch(e){console.log(e);}
				mydate = new Date();	
				var node;				
				try{
					self= this;

						//mirar si yo tengo el nid
						if(profile.get("nid") != "" && typeof profile.get("nid") != 'undefined'){
							console.log("Ya tenemos el nid: " + profile.get("nid"));	//Lo tenemos en local
							
							
							try{
								self.initializeMap(latitude,longitude);

							}
							catch(e){
								console.log("Node save ha fallado, recargamos profile");
								console.log(e);
								self.router.profile();
							}
						
					
					
						}
					}
				catch(e){
					console.log("Error save_node: " + e);
				}
				
				
				console.log("saveonserverAndInitialize");
				
			},
			
			saveonserver: function(afterCoords){
				
				profile = this.history.get("profile");
				console.log(profile.get("nickname"));
				mydate = new Date();
				console.log("token: " + self.history.get("languages").get("sesToken"));
				var node;
				var picture;
				try{
					console.log("2 SUBO AL SERVIDOR LA FOTO: " + profile.get("picture").substring(0,80));
				}
				catch(e){console.log(e);}
				try{
					self= this;
					console.log("GUARDANDO STATUS:" + profile.get("status"));
					//console.log(profile.get("picture"));
					//mirar si yo tengo el nid
					var data = {
						  //"file":{
							"target_uri":"public://my_image" + profile.get("userID") + ".png",
							"filename":"my_image" + profile.get("userID") + ".png",
							"filemime":"image/png",
							"file":profile.get("picture").replace("data:image/png;base64,","")
							//"filepath":"public://my_image.jpg"
						  //}
						};
					
					
					
					options = {
						type:"post",
						data:data,
						url: 'http://appv2.hoffman-international.com/' + 'hoffapp/file.json',
						dataType: 'json',
						beforeSend: function (request) {
							request.setRequestHeader("X-CSRF-Token", self.history.get("languages").get("sesToken"));
						  },
						success:function(result){//Foto subida
							console.log("Picture saved: " + JSON.stringify(result));
							console.log("YE");
							profile.set("fid",result.fid);
							self.history.get("profile").destroy();
							self.history.create(profile);
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
								field_picturevalue: {
									"und": [{
										"fid": result.fid,
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
								},
								field_active:{
										"und":[{
											"value":profile.get("active")
										}]
								},
								field_status:{
										"und":[{
											"value":profile.get("status")
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
									field_picturevalue: {
										"und": [{
											"fid": result.fid,
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
									},
									field_active:{
											"und":[{
												"value":profile.get("active")
											}]
									},
									field_status:{
											"und":[{
												"value":profile.get("status")
											}]
									}

								};
							
						}
							
							
							
							
						
							node_save(node, {
							success: function(result) {
								console.log("Saved node #" + result.nid);
								self.setNID(result.nid);
								//llamada a node_load puede eliminarse antes de la salida
								/*node_load(result.nid, {
									success: function(node) {
									console.log("Loaded " + node.title);
									console.log(node);
									}
								});*/
								if (!afterCoords){
									console.log("aftercoords false");
									self.router.profile();
								}
							}
							});
					  }
					};
					
					$.ajax(options);
				
						}
					catch(e){
						console.log("Error save_node: " + e);
					}
					
					
					console.log("saveonserver");
				
			},
			
			toggle_profile: function(){
				
				profile= this.history.get("profile");
				window.plugins.spinnerDialog.show(null, null, function () {  console.log("callback");} );
				if(profile.get("active")=="yes"){
					var mapDiv = document.getElementById("map_module_map");
					this.map = plugin.google.maps.Map.getMap(mapDiv);
					this.map.remove();
					this.history.get("profile").destroy();
					profile.set("active", "no");
					profile.save();
					this.history.create(profile);
					this.router.drupaldo(this.saveonserver.bind(this),false);
				}
				else{
					this.history.get("profile").destroy();
					profile.set("active", "yes");
					profile.save();
					this.history.create(profile);
					this.router.drupaldo(this.saveonserver.bind(this),false);
				}
				
			},
			
			setActive: function(nid){
				profile= this.history.get("profile");
				this.history.get("profile").destroy();
				profile.set("active", "yes");
				profile.set("saved", "yes");
				if (typeof nid != 'undefined' && nid != ""){
					profile.set("nid", nid);
				}
				profile.save();
				this.history.create(profile);
			},
			
			setNID: function(nid){
				profile= this.history.get("profile");
				this.history.get("profile").destroy();
				if (typeof nid != 'undefined' && nid != ""){
					profile.set("nid", nid);
				}
				profile.save();
				this.history.create(profile);
			},
			
			validateEmail: function(email){
				console.log("Validating: " + email);
				var re = "";
				try{
					re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					console.log("Email is valid: " + re.test(email));
				}
				catch(e){
					console.log("ERROR: " + e);
				}
				return re.test(email);
			},
	
            save: function(){
				console.log("Save profile function");
				self=this;
				if (typeof $("#useremail").val() != 'undefined' && !self.validateEmail($("#useremail").val())) { 
					 navigator.notification.confirm(this.history.get("languages").get("dic_invalid_email"), function(indexans){}, this.history.get("languages").get("dic_Hoffman"),["Ok"]);
				}
				else{ //Valid email
					if(this.origin == '1'){//edit profile
						self.router.profile('1');
					}				
					else{
						window.plugins.spinnerDialog.show(null, null, function () {  console.log("callback");} );
						try{
							if (typeof $("#displayname").val() != 'undefined' && typeof $("#useremail").val() != 'undefined' && $("#displayname").val() != "" && $("#useremail").val() !=""){
								//Tiene valores válidos
								profileM=this.history.get("profile");
								
								
								profileM.set("nickname",$("#displayname").val());
								profileM.set("email",$("#useremail").val());
								console.log("GUARDAMOS STATUS: ");
								console.log($("#status").val());
								if ($("#status").val() != 'undefined' && typeof $("#status").val() != 'undefined')
									profileM.set("status",$("#status").val());
								else
									profileM.set("status",'');
								profileM.set("near_users","");
								var visionphoto = document.getElementById('visionphoto');
								profileM.set("picture", visionphoto.src);
								profileM.set("userID",this.history.get("profile").get("userID"));
								profileM.set("lastupdated", new Date());
								this.history.get("profile").destroy();
								profileM.save();
									
								this.history.create(profileM);
								
								
								this.router.drupaldo(this.saveonserver.bind(this),false);
								
								
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
								navigator.notification.confirm(this.history.get("languages").get("dic_profile_required"), function(indexans){}, this.history.get("languages").get("dic_Hoffman"),["Ok"]);
								//alert(this.history.get("languages").get("dic_profile_required"));
							}
						}
						catch(e){
							console.log(e);
						}
					}
				}
            },
			
			send_email: function(){
				
				console.log("this.profile: ");
				console.log(this.profile);
				
				//window.
				console.log("window.location = " + "mailto:" + this.profile.email);
				window.location = "mailto:" + this.profile.email;
				
				
			},

			back_to_map: function(){
				this.router.profile();
			},
						
			exitmap: function(){
				self=this;
				try{
					var mapDiv = document.getElementById("map_module_map");
					this.map = plugin.google.maps.Map.getMap(mapDiv);
					window.plugins.spinnerDialog.show(null, null, function () {  console.log("callback");} );
					this.map.remove();
					
					setTimeout(function(){
						Backbone.history.navigate("#summary", {
							trigger: true
						});

					},400);
					
				}
				catch(e){
					console.log("Error: " + e);
				}
				
			},
			
			onPhotoDataSuccess: function(imageData, base64){
				
                var visionphoto = document.getElementById('visionphoto');
                visionphoto.style.display = 'block'; 
				if(base64)
					imageData = "data:image/png;base64," + imageData;
				visionphoto.src = imageData;
				$.mobile.silentScroll(100);
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
                else{
					var auxprofile = this.history.get("profile");
					auxdate = new Date();
					auxTime = auxdate.getTime();
					console.log("auxTime: " + auxTime);
					auxprofile.set("info",auxTime);
					auxprofile.save();
					this.history.get("profile").destroy();
					this.history.create(auxprofile);
                    navigator.camera.getPicture(function(imageData){
                        self.onPhotoDataSuccess(imageData, false);
                    }, this.onFail, {
                        quality: 50,
                        correctOrientation: true,
						allowEdit: true
                    });
				}
            },
			
			getfromgallery:function(){
                var self=this;
                try{
                    if (!navigator.camera) {
                        alert("Camera API not supported");
                        return;
                    }
                    else{
						var auxprofile = this.history.get("profile");
						auxdate = new Date();
						auxTime = auxdate.getTime();
						console.log("auxTime: " + auxTime);
						auxprofile.set("info",auxTime);
						auxprofile.save();
						this.history.get("profile").destroy();
						this.history.create(auxprofile);
						
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
                }
                catch(e){
                    console.log(e);
                }
            }


        });

        return profileView;
    });
