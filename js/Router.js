define([
    'jquery',
    'underscore',
    'backbone',
    'languageModel',
    'donotshowModel',
    'quadView',
    'quadModel',
    'historyCollection',
    'feelingView',
    'feelingModel',
    'bashackerView',
    'bashackerModel',
    'patternView',
    'beatyourdarkView',
    'beatyourModel',
    'summaryView',
    'viciousView',
    'viciousModel',
    'transferenceView',
    'transferenceModel',
    'visionboardView',
    'journalView',
    'journalModel',
    'recyclingView',
    'recyclingModel',
    'meditationsView',
    'meditationModel',
    'historyView',
    'supportView',
    'configurationView',
	'passwordView',
	'profileView',
	'profileModel',
	'nodelistModel',
    'innerLog',
    'jDrupal',
    'fastclick',
    'localStorage'
    ], function($, _, Backbone, languageModel, donotshowModel, quadView, quadModel, historyCollection, feelingView, feelingModel, bashackerView, bashackerModel, patternView, beatyourdarkView, beatyourModel, summaryView, viciousView, viciousModel, transferenceView, transferenceModel, visionboardView, journalView, journalModel, recyclingView, recyclingModel, meditationsView, meditationModel, historyView, supportView, configurationView, passwordView, profileView, profileModel, nodelistModel, innerLog, jDrupal, fastclick){
  
   
        var AppRouter = Backbone.Router.extend({
            routes:{
                "":"principal",
                "summary":"summary",
                "auxsummary":"auxsummary",
                "quadSelection":"quadSelection",
                "quadcheck:id":"quadcheck",
                "feeling:id":"feeling",
                "bashDisc":"bashackerDisclaimer",
                "bashacker:id":"bashacker",
                "pattern:id":"pattern",
                "beatyourdark:id":"beatyourdarkSide",
                "vicious:id": "vicious",
                "transference:id":"transferenceS",
                "transSelection":"transSelection",
                "visionboard:id":"visionboard",
                "journal:id":"journal",
                "recycling:id":"recycling",
                "getaudio:id":"getAudionameDrupal",
                "getMediaudio:id":"getAudionameMediDrupal",
                "meditations:id":"meditations",
                "historyload":"historyload",
                "historydetail:id":"historydetail",
                "support":"support",
                "configuration":"configuration",
				"passwordProtect":"passwordProtect",
				"profile":"profile",
                "deletehistory":"deletehistory"
            },
            principal: function(){
		
		
				console.log("Principal");
				
				historial.fetch();
				language.fetch();
				donotshow.fetch();
				nodelist.fetch();
				profileM.fetch();
	    
                new FastClick(document.body);
                FastClick.attach(document.body);
                $.mobile.buttonMarkup.hoverDelay = 0;
                $.mobile.ajaxEnabled = false;
                $.mobile.linkBindingEnabled = false;
                $.mobile.hashListeningEnabled = false;
                $.mobile.pushStateEnabled = false;
		
                this.loaded=false;
                //super.loadUrl(Config.getStartUrl(), 10000);  //splashscreen para android
				
                var self=this;
		
                // Remove page from DOM when it's being replaced
                $(document).on('pageshow', function (event, ui) {
			
                    $(ui.prevPage).remove();

                });
				
				document.addEventListener("resume", self.onResume, false);
				
                $(document).one('pageshow', function (event, ui) {
                    loaded=true;
                    console.log("FIRST LOAD");
					try{
							navigator.splashscreen.hide();
					}
					catch(e){
						console.log(e);
					}
                });
				
				/*$(document).on('click', "#menubutton", function(event, ui) {
                    console.log("menu pressed, blocking it 1second");
					$( ".dic_menu" ).attr("class","ui-disabled " + $( ".dic_menu" ).attr("class"));
					setTimeout(function() {
						console.log("Habilitando menu");
						$( ".dic_menu" ).attr("class","panelbutton dic_menu ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a");
					}, 1000);
					
                });*/
				
				/*$("body").on('click touchstart', "#menubutton", function(e){
					e.preventDefault();
					console.log("menu pressed");
					$( "#panelhoffman" ).panel( "open" );
				});*/
			
			
                //$(document).on('backKeyDown', self.backKeyDown);
                //document.addEventListener("backKeyDown", self.backKeyDown, true);
                document.addEventListener("backbutton", self.backKeyDown, true);
			
                try{
                    //window.plugins.orientationchanger.lockOrientation('portrait');
                    screen.lockOrientation('portrait');
				
                }
                catch(err){}
			
			
                historial.create(donotshow);
				historial.create(profileM);
				try{
					console.log("historial.create(nodelist) :");
					historial.create(nodelist);
				}
				catch(e){console.log(e);}
                //historial.create(innerlog);
				innerlog.add("About to choose path, downloaded: " + language.get("downloaded") + " and Checkversion: " + language.get("Checkversion"));
                if(language.get("downloaded")=="no" && !language.get("Checkversion")){ //si no tienes lenguaje te lo intentas descargar
                    console.log("No hay lenguaje");
                    language.set("languageAC", "en-GB");
                    language.set("quadAudio", false);
                    historial.create(language);
                    this.changetheme();
                    if(typeof device === "undefined"){
                        this.login();
                    }
                    else
						self.drupaldo(self.lookForLanguage,"null");
					
					
					//this.loginandgetlanguage("en"); //el modelo en la coleccion es visible instantáneamente tras introducirlo CUANDO NO ESTÁ? DE ANTES, loginandgetlanguage ya no existe
					
				
                }
                else{
                    console.log("Ya hay lenguaje");
                    console.log(historial);
					historial.create(language);
                    console.log(historial);
					this.setWeeklyNotification();
                    this.changetheme();
                    this.checkDateUpdate(2); //pls
		
                }
				
				if(historial.get("profile").get("pass")!=""){
					//Tapar pantalla #password_protect
					$(".page").attr("style","display: none;");
					this.askForPassword();
					
				}
				else{
					self.drupaldo(self.facebookLogin);
				}
				
				
				 
                setTimeout(function() {
                    if(language.get("downloaded")=="no"){
						
                        console.log("Inicio fallido, reseteando app");

						app_router= new AppRouter;
						app_router.principal();
						
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
                    }
                }, 10000);
				

            },
			
			askForPassword: function (){
				
					//prompt para introducir password
					self = this;
					try{
                        navigator.notification.prompt(
                            historial.get("languages").get("dic_enter_password"),  // message
                            function(ans){
                                self.onpassPrompt(ans);
                            },                  // callback to invoke
                            historial.get("languages").get("dic_password_protect"),            // title
                            [historial.get("languages").get("dic_back"),historial.get("languages").get("dic_next")] // buttonLabels
                            //historial.get("languages").get("dic_beatyour_example")                 // defaultText
                            );
                    }
                    catch(e){
                        console.log(e);
                        var obj= new Object();
                        obj["buttonIndex"]=2;
                        obj["input1"]="";
                        self.onpassPrompt(obj);
                    }
              
            },
			
			onpassPrompt: function (results){
                if(results.buttonIndex==2){
                    if(btoa(results.input1) == historial.get("profile").get("pass")){
						console.log("passwords match");
						$(".page").attr("style","display: block;");
					}
					else{
						alert(historial.get("languages").get("dic_passwords_not_match"));//passwords_not_match
						this.askForPassword();
					}
                }else{	//if(results.buttonIndex==1) //botón atrás
					if(navigator.app)
						navigator.app.exitApp();
					else
						navigator.device.exitApp();
				}
            },
	
            setWeeklyNotification: function(){
				if(historial.get("languages").get("notifications")){
					console.log("setWeeklyNotification");
					auxdate = new Date();
					notifdate = new Date(auxdate.getTime()+604800000);	//604800000 = 1 semana en milisecs
					//alert("actualizado! 3");
					try{
						window.plugin.notification.local.schedule({
							id:         1,  // A unique id of the notifiction
							at:       notifdate,    // This expects a date object
							text:    historial.get("languages").get("dic_notification_text"),  // The message that is displayed
							title:      historial.get("languages").get("dic_notification_title"),  // The title of the message
							every:     "weekly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
							//badge:      "0",  // Displays number badge to notification
							//sound:      "",  // A sound to be played
							//json:       "pls",  // Data to be passed through the notification
							ongoing:    false // Prevent clearing of notification (Android only)
						});
					}
					catch(e){
						console.log("setWeeklyNotification error: " + e);
					}
				}
	
            },
			
			retrieve_fb_info: function(){
				console.log('retrieve_fb_info');
				facebookConnectPlugin.api(
					user_id + "/?fields=id,email,first_name,picture",
					['public_profile', 'email'],
					function (response) {
						console.log(JSON.stringify(response));
						console.log(response);
						//RequestsService.sendData(response);
						//$scope.user = response;
					},
					function (error) {
						alert("Failed: " + error);
					}
				);
			},
			
			facebookLogin: function(){
				selfR = this;
				var fbLoginSuccess = function (userData) {
					console.log("UserInfo: ");
					console.log(JSON.stringify(userData));
					console.log(userData.authResponse);
					var node = {
					  title: "Hello World",
					  type: "usernode",
					  field_userid: userData.authResponse.userID
					};
					if (profileM.id == 'profile')
						profileM.id = userData.authResponse.userID;
					node_save(node, {
					  success: function(result) {
						console.log("Saved node #" + result.nid);
						node_load(result.nid, {
						  success: function(node) {
							console.log("Loaded " + node.title);
							console.log(node);
							if (profileM.id != 'profile')
								selfR.retrieve_fb_info();
						  }
						});
					  }
					});
				}
									
				facebookConnectPlugin.login(["public_profile"],
					fbLoginSuccess,
					function (error) { 
						console.log("Fb error:");
						console.log(error);
					}
				);
			},
			
            login: function(){ //funcion de logueo para LOCALHOST
	
                var self=this;
                //if(device.platform=='Android'){
                $.ajaxSetup({
                    xhrFields: {
                        withCredentials: true
                    }
                });
                //}
                var DRUPAL_SERVER = "http://hoffmanapp.indret.webfactional.com/hoffapp/";
                console.log("intenta fer un login d'appuser");
                var self=this;
                logintrys -= 1;
                var params = {
                    type: 'post',
                    dataType: 'json',
                    url: DRUPAL_SERVER + "user/login.json",
                    data: {
                        'username': 'appuser',
                        'password': 'appuser'
                    },
                    success: function(data) {
                        if(logintrys>=0){
                            language.set("sesToken",data.token);
                            historial.create(language);
                            console.log("TOKEN: " + data.token);
                            self.lookForLanguage();
							
                        //self.getToken();
                        }
                        else {
                            console.log("Máximo de intentos de logueo");
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("MIERDA PURA");
                        console.log(JSON.stringify(XMLHttpRequest));
                        console.log(JSON.stringify(textStatus));
                        console.log(JSON.stringify(errorThrown));
                        if(logintrys>=0){
                            if(false){ //no tengo internet
                                alert("Internet failure");
                            }
                            else{ //ya está logueado
                                self.lookForLanguage();
                            }
                        }
				
                    }
                };

                $.ajax(params);
	
            },
			
            drupaldo: function(job, param, fromsummary){
				if(typeof device === "undefined"){ //PC VERSION
					console.log("drupaldo pcversion, executing job");
					if(param!="null")
						job(param);
					else
						job();
				}
				else{
					logintrys=6;
					var self=this;
					console.log("drupaldo");
					console.log(job);
					console.log(param);

					try{
						if(navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){
							if(typeof fromsummary!="undefined" && fromsummary){
								//No hacer nada								
							}
							else{
								try{
									window.plugins.spinnerDialog.hide();
								}
								catch(e){
									console.log(e);
								}
								if(typeof historial.get("languages").get("dic_no_internet")!="undefined"){
									try{
										navigator.notification.confirm(historial.get("languages").get("dic_no_internet"), function(indexans){
											app_router.navigate("auxsummary", {
												trigger: true,
												replace: true
											});
										}, "Hoffman",["Ok"]);
									}
									catch(e){
										console.log(e);
										app_router.navigate("auxsummary", {
												trigger: true,
												replace: true
											});
									}
								}
								else{
									try{
										navigator.notification.confirm("Hoffman App needs an internet connection, try again later", function(indexans){
											navigator.app.exitApp(); //Puesto que no tenemos lenguas, cerramos la aplicación
										}, "Hoffman",["Ok"]);
									}
									catch(e){
										console.log(e);
										navigator.app.exitApp();
									}
								}
								
							}
						}
						else{
							self.checkAndDo(job, param);
						}
					}
					catch(e){
						self.checkAndDo(job, param);
					}
				}
            },
	
            logAndDo: function(job, param){
		
                var self=this;
                if(logintrys==0){
                    alert("Connection failure, try again later");
                }
                else{
                    logintrys--;
                    Drupal.settings.site_path = "http://hoffmanapp.indret.webfactional.com";
                    Drupal.settings.endpoint = "hoffapp";

                    user_login("appuser", "appuser", {
                        success:function(result){
                            console.log("Login success, result:");
                            console.log(result);
                            auxlang=historial.get("languages");
                            historial.get("languages").destroy();
                            auxlang.set("sesToken", result.token);
                            auxlang.save();
                            historial.create(auxlang);
                            self.checkAndDo(job, param);
							
                        },
                        error:function(xhr, status, message){
                            console.log("Error trying to login, message: " + message);
                        }
                    });
                }
            },

            checkAndDo: function(job, param){
		
                var self=this;
			
                Drupal.settings.site_path = "http://hoffmanapp.indret.webfactional.com";
                Drupal.settings.endpoint = "hoffapp";
                innerlog.add("Executing checkAndDo:\n");
				console.log("checkAndDo");
                system_connect({
                    success: function(result) {
                        innerlog.add("success\n");
                        var account = Drupal.user;
                        console.log(account);
                        if(typeof account.roles[1] === "undefined")
                            hoffuser=account.roles[2];
                        else
                            hoffuser=account.roles[1];
					
                        console.log("Checking connection: " + hoffuser);
				
                        if(hoffuser=="anonymous user" || historial.get("languages").get("sesToken")=="none"){
                            self.logAndDo(job, param);
                        }
                        else{
                            if(hoffuser=="authenticated user"){
                                if(param!="null")
									job(param);
								else
									job();
							}
						}
	
                    },
                    error: function(xhr, status, message){
                        alert(message); //Comentar para el release
						self.logAndDo(job, param);
						Backbone.history.navigate("#auxsummary", {
                        trigger: true
						});
                    }
                });
            },
	

            lookForLanguage: function(){

                try{
                    navigator.globalization.getLocaleName(
                        function (locale) {
                            console.log('locale: ' + locale.value);
                            app_router.languageTag=locale.value;
                            app_router.languageVar="";

							app_router.LookLanguages();
                        },
                        function () {
                            alert('Error getting locale language\n');
                        }
                        );
                }
                catch(e){
                    console.log("Desktop version, downloading 'en-GB'");
					app_router.languageVar="";
                    app_router.languageTag="en-GB"; //"en-GB";	"pt_BR";
                    app_router.LookLanguages();
			
                }
	
            },
	
            selectLanguage: function(){
				
				
                this.languageView= new configurationView();
                this.languageView.render('1',historial,app_router);
                this.changePage (this.languageView);
                try{
                    window.plugins.spinnerDialog.hide();
                }
                catch(e){
                    console.log(e);
                }
	
            },
	
            matchLanguage: function(elemento){
				
                if(this.languageTag==elemento.language || this.languageTag.replace("-", "_")==elemento.language){ //Si es el mismo exactamente
					if(this.languageTag.replace("-", "_")==elemento.language){
							console.log("Cambiamos _ por -");
					}
                    console.log("Exact language found: " + elemento.language);
                    this.languageVar=elemento.language;
                }
                else if(this.languageTag.split("_")[0]==elemento.language.split("_")[0] || this.languageTag.split("-")[0]==elemento.language.split("-")[0]){ //Si tienen el mismo prefijo
                    if(this.languageVar==""){//si aún no tiene valor
                        console.log("Coincidencia de prefijo, asignando: " + elemento.language);
                        this.languageVar=elemento.language;
                    }
                }
		
	
            },
	
            LookLanguages:function(){
	
                var self=this;
                console.log("LookLanguages, token: " + historial.get("languages").get("sesToken"));
                innerlog.add("Executing LookLanguages:\n");
                var params_languages = { //active languages
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "active-languages.jsonp",
                    processData: true,
                    success: function(data) {
                        innerlog.add("success\n");
                        data.forEach(self.matchLanguage, self);
						console.log("COMPARANDO");
                        if(self.languageVar!=""){//si encontró match
                            self.gettranslation(self.languageVar);
                            historial.get("languages").set("languageAC",self.languageVar);
                        }
                        else{	//si no, preguntamos
							language.set("downloaded","selecting");
                            self.selectLanguage();
						}
						
                    },
                    error: function(code) {
                        innerlog.add("error\n");
                        console.log("petada", code);
                    }
                };
 						
                $.ajax(params_languages);
            },

            backKeyDown: function(){
                console.log("backkey event");
                var self=this;
                try{
                    navigator.notification.confirm(
                        historial.get("languages").get("dic_exitApp"),
                        function(indexans){
                            if(indexans==2){
                                if (navigator.app) {
                                    navigator.app.exitApp();
                                }
                                else if (navigator.device) {
                                    navigator.device.exitApp();
                                }
                            }
                        },
                        historial.get("languages").get("dic_Hoffman"),[historial.get("languages").get("dic_transf_p9_text3"),historial.get("languages").get("dic_transf_p9_text2")]);
                }
                catch(e){
                    self.onbackSuccess(1);
                    console.log(e);
                }
	
            },
			
			onResume: function() {
				
				console.log("RESUME EVENT");
				
				if(historial.get("profile").get("pass")!="" && $(".page").attr("style") != "display: none;"){
					//Tapar pantalla #password_protect
					$(".page").attr("style","display: none;");
					app_router.askForPassword();
					
				}
				
			},

	
            checkquadAudio: function(){
	
                var self=this;
                var params_audios = {
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "audios.jsonp",
                    processData: true,
                    success: function(data) {
                        historial.get("languages").set("quadAudio",false)
                        data.forEach(self.takequadAudio, self);
                        console.log("audios: ", data);
                        self.getQuotes(historial.get("languages").get("languageAC"));
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
		
                $.ajax(params_audios);
	
            },
	
            takequadAudio: function(elemento){
		
                aux=historial.get("languages");
                console.log(elemento.language + " vs " + historial.get("languages").get("languageAC"));
                if(elemento.audio_type=="Quad Check In"){
                    if(elemento.language==historial.get("languages").get("languageAC")){ //la lengua tiene quadAudio
                        historial.get("languages").destroy();
                        aux.set("quadAudio", true);
                        aux.set("quadAudioNID", elemento.nid);
                        console.log("Found QuadAudio for " + elemento.language);
                        historial.create(aux);
                        aux.save();
                        aux.fetch();
                    }
                }
                historial.create(language);
            },

            checkserverlangver: function(elemento){
	
                if(elemento.language==historial.get("languages").get("languageAC")){
                    console.log("La versión es " + elemento.version);
                    console.log("Y el lenguaje es: " + historial.get("languages").get("languageAC"));
                    aux=historial.get("languages");
                    historial.get("languages").destroy();
                    aux.set("serverlangver",elemento.version);
                    aux.save();
                    historial.create(aux);
			
                    if(historial.get("languages").get("serverlangver")>historial.get("languages").get("langver")){ //hay una versión más reciente
                        console.log("Marcando lenguaje para actualizar");
                        language.set("downloaded", "no");
                        historial.create(language);
                    }
                    else{
                        console.log("Ya tengo lenguaje");
                        Checkversion = true;
                        aux=historial.get("languages");
                        historial.get("languages").destroy();
                        aux.set("Checkversion",true);
                        historial.create(language); // para recuperar el lenguaje ya descargado necesito utilizar el modelo suelto auxiliar que sí es accesible instantáneamente e introducirlo en la colección para tener una solución homogénea
                    }
			
                }
	
            },
	
            comprobarversion: function(){
	
                var self=this;
                innerlog.add("Executing comprobarversion:\n");
                console.log("comprobarversion, token: " + historial.get("languages").get("sesToken"));
                var params_languages = { //active languages
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "active-languages.jsonp",
                    processData: true,
                    success: function(data) {
                        innerlog.add("success");
                        console.log("languages: ", data);
                        data.forEach(self.checkserverlangver, self);
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
 						
                $.ajax(params_languages);
	
            },
	
            chooselangver: function(elemento){
	
                if(elemento.language==historial.get("languages").get("languageAC")){
                    console.log("La versión es " + elemento.version);
                    aux=historial.get("languages");
                    historial.get("languages").destroy();
                    aux.set("langver",elemento.version);
                    console.log(aux);
                    historial.create(aux);
                }
	
            },
	
            savelanguageversion: function(){
                var self=this;
                var params_languages = { //active languages
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "active-languages.jsonp",
                    processData: true,
                    success: function(data) {
                        console.log("languages: ", data);
                        data.forEach(self.chooselangver, self);
                    },
                    error: function(code) {
                        console.log("petada, intento loguear", code);
                    }
                };
 						
                $.ajax(params_languages);
	
            },
	
            checkDateUpdate: function(option){
	
                innerlog.add("Executing checkDateUpdate:\n");
                fecha= new Date();
                console.log(historial.get("languages").get("fecha") + " vs " + fecha.getTime() );
                if((historial.get("languages").get("fecha")+ 86400000)<fecha.getTime()){ //dia distinto, 86400000 = 1 día en milisecs
                    if(historial.get("languages").get("quote2")!=""){//si tenemos quote2 hay que pasar al nuevo, cargar summary y descargar siguientes 2
                        if(!Checkversion){
							app_router.drupaldo(app_router.comprobarversion.bind(this),"null",true);
                        }
                        aux=historial.get("languages");
                        historial.get("languages").destroy();
                        aux.set("quote",aux.get("quote2"));
                        aux.set("quoteAuthor",aux.get("quoteAuthor2"));
                        aux.set("quote2","");
                        aux.set("fecha",fecha.getTime());
                        historial.create(aux);
                        aux.save();
                        aux.fetch();
	
                        //quitar spinner
                        console.log("Parando spinner");
                        Backbone.history.navigate("#auxsummary", {
                            trigger: true
                        });
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
						try{
							navigator.splashscreen.hide();
						}
						catch(e){
							console.log(e);
						}
                        app_router.drupaldo(app_router.checkLanguages.bind(this),option,true);
                    }
                    else{//paso los 2 cuotes almacenados a languages para cargar el primero
                        innerlog.add("success2\n");
                        aux=historial.get("languages");
                        historial.get("languages").destroy();
                        aux.set("quote",aux.get("quotesReserve")[0].node_title);
                        aux.set("quote2",aux.get("quotesReserve")[1].node_title);
                        aux.set("quoteAuthor",aux.get("quotesReserve")[0].author);
                        aux.set("quoteAuthor2",aux.get("quotesReserve")[1].author);
                        aux.set("fecha",fecha.getTime());
                        historial.create(aux);
                        aux.save();
                        aux.fetch();
                        loaded=false;
                        //quitar spinner
                        console.log("Parando spinner");
                        Backbone.history.navigate("#auxsummary", {
                            trigger: true
                        });
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
						try{
							navigator.splashscreen.hide();
						}
						catch(e){
							console.log(e);
						}
                        $(document).one('pageshow', function (event, ui) {
                            loaded=true;
                            console.log("AFTER QUOTEUPDATE LOAD");
							try{
								navigator.splashscreen.hide();
							}
							catch(e){
								console.log(e);
							}
                        });
                        setTimeout(function() {
                            if(!loaded){
                                console.log("Parando spinner forzosamente");
                                //app_router.summary.render(historial); //esto sobra?
                                Backbone.history.navigate("#auxsummary", {
                                    trigger: true
                                });
                                try{
                                    window.plugins.spinnerDialog.hide();
                                }
                                catch(e){
                                    console.log(e);
                                }
								try{
									navigator.splashscreen.hide();
								}
								catch(e){
									console.log(e);
								}
                            }
                        }, 10000);
                    }
                }
                else{
                    if(historial.get("languages").get("downloaded")=="no"){
                        innerlog.add("downloading new language version\n");
                        app_router.drupaldo(app_router.getExternalTranslation.bind(this),"null",true);
                    }
                    else{
                        console.log("No ha pasado un dia para cambiar quote, quito spinner");
                        innerlog.add("going to navigate");
                        Backbone.history.navigate("#auxsummary", {
                            trigger: true
                        });
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
						try{
							navigator.splashscreen.hide();
						}
						catch(e){
							console.log(e);
						}
                    }
                }
            },
			
			checkLanguages: function(option){
				
				var DRUPAL_SERVER = "http://hoffmanapp.indret.webfactional.com/hoffapp/";
                        var params_quotes = {
                            type: 'GET',
                            dataType: 'jsonp',
                            beforeSend: function (request) {
                                request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                            },
                            url: DRUPAL_SERVER + "quotes_" + historial.get("languages").get("languageAC") + ".jsonp",
                            processData: true,
                            success: function(data) {
                                innerlog.add("success1\n");
                                aux=historial.get("languages");
                                historial.get("languages").destroy();
                                console.log("DATA: ");
                                console.log(data);
                                if(option==1){
                                    Checkversion=true;
                                    aux.set("Checkversion",true);
                                }
                                aux.set("quotesReserve",[data[0],data[1]]);
                                historial.create(aux);
                                aux.save();
                                aux.fetch();
				
                            },
                            error: function(code) {
				
                                console.log("petada", code);
				
                            }
                        };
				var downloaded_quotes = $.ajax(params_quotes);
				
			},
	
            getExternalTranslation: function(){
	
                this.configuration= new configurationView();
                this.configuration.render('0',historial, app_router);
                this.configuration.gettranslationExternal(historial.get("languages").get("languageAC"));
				try{
					navigator.splashscreen.hide();
				}
				catch(e){
					console.log(e);
				}
	
            },
	
            saveQuoteDate: function(){
		
                var self=this;
                this.fecha=new Date();
                aux = historial.get("languages");
                historial.get("languages").destroy();
                aux.set("fecha",this.fecha.getTime());
                aux.save();
                aux.fetch();
                historial.create(aux);
                console.log("quote date saved");
	
            },
		
            getQuotes: function(LANGUAGE){
                innerlog.add("Executing getQuotes\n");
                var self=this;
                var DRUPAL_SERVER = "http://hoffmanapp.indret.webfactional.com/hoffapp/";
                var params_quotes = {
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: DRUPAL_SERVER + "quotes_" + LANGUAGE + ".jsonp",
                    processData: true,
                    success: function(data) {
                        innerlog.add("success\n");
				
                        self.saveQuoteDate();
				
                        aux=historial.get("languages");
                        historial.get("languages").destroy();
                        console.log("DATA: ");
                        console.log(data);
                        aux.set("quote",data[0].node_title);
                        aux.set("quoteAuthor",data[0].author);
                        aux.set("quote2",data[1].node_title);
                        aux.set("quoteAuthor2",data[1].author);
                        aux.set("downloaded","yes");
				
                        if(Checkversion == false){ //si es una actualización
                            Checkversion = true;
                            aux.set("Checkversion",true);
                            historial.create(aux);
                            aux.save();
                            aux.fetch();
                            Backbone.history.navigate("#auxsummary", {
                                trigger: true
                            });
                        }
                        else{
                            historial.create(aux);
                            aux.save();
                            aux.fetch();
                            Backbone.history.navigate("#auxsummary", {
                                trigger: true
                            });
                        }
                        //quitar spinner
                        console.log("Parando spinner");
				
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
						try{
							navigator.splashscreen.hide();
						}
						catch(e){
							console.log(e);
						}
                    },
                    error: function(code) {
			
                        console.log("petada", code);
			
                    }
                };
                //console.log("params ", params);
                var downloaded_quotes = $.ajax(params_quotes);
	
            },
		
            gettranslation: function(LANGUAGE){
                console.log("downloading: " + "http://hoffmanapp.indret.webfactional.com/hoffapp/"+LANGUAGE+".jsonp");
                var DRUPAL_SERVER = "http://hoffmanapp.indret.webfactional.com/hoffapp/";
                innerlog.add("Executing gettranslation:\n");
				//LANGUAGE=LANGUAGE.replace("-", "_");
                var self=this;
                self.language=null;
                var params_translations = {
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: DRUPAL_SERVER + LANGUAGE + ".jsonp",
                    processData: true,
                    success: function(data) {
                        innerlog.add("success\n");
                        //console.log("data: ", data);
                        var translations = {};
                        for (index = 0; index < data.length; ++index) {
                            translations[data[index]["key"]] = data[index][LANGUAGE];
                        }
                        //console.log("translations: ", translations);
						var routerToken=historial.get("languages").get("sesToken");
                        console.log("Lenguas descargadas");
                        destroylanguage=historial.get("languages");
                        destroylanguage.destroy();
                        language=new languageModel(translations);
                        language.id="languages";
                        language.cid="c1";
						language.set("sesToken",routerToken);
						language.set("downloaded","yes");
						language.set("id","languages");
						language.set("actionsList","void");
                        historial.create(language);
                        console.log(historial.get("languages"));
                        language.save();
                        language.fetch();
						historial.get("languages").set("notifications", true);
                        self.setWeeklyNotification();
                        self.checkquadAudio();
                        self.savelanguageversion();
				
				
                    },
                    error: function(code) {
                        console.log("petada", code);
                        if(false){ //no tengo internet
                            alert("Internet failure");
                        }
                        innerlog.add("error\n");
                    }
                };
		
                $.ajax(params_translations);

            },
	
            changetheme:function (){
	
                var mysheet=document.styleSheets[5];
		
                if(typeof historial.get("languages").get("theme")==='undefined'){ //theme predefinido
		
                    this.green="url('../img/Textures/verdeboton.png') repeat";
                    this.border="1px solid #8EAC4F";
		
                }
	
                else{
                    console.log("YEEE");
                    switch(historial.get("languages").get("theme")){
				
                        case 'Blue':
			
                            this.green="url('../img/Textures/00598E.png') repeat";
                            this.border="1px solid #5784A0";
				
                            this.feeltex="url('../img/Textures/009DD1.png') repeat";
                            this.quadtex="url('../img/Textures/00598E.png') repeat";
                            this.bashtex="url('../img/Textures/84D0F0.png') repeat";
                            this.quotes="url('../img/Textures/84D0F0.png') repeat";
                            this.patttex="url('../img/Textures/4B99C1.png') repeat";
                            this.beattex="url('../img/Textures/00598E-75.png') repeat";
                            this.recytex="url('../img/Textures/005496.png') repeat";
                            this.meditex="url('../img/Textures/84D0F0.png') repeat";
                            this.victex="url('../img/Textures/007DA9.png') repeat";
                            this.trantex="url('../img/Textures/A9C7E6.png') repeat";
                            this.visitex="url('../img/Textures/12224B.png') repeat";
                            this.jourtex="url('../img/Textures/BD1220.png') repeat";
                            this.supporttex="url('../img/Textures/12224B.png') repeat";
                            this.greyback="url('../img/Textures/BD1220.png') repeat";
                            this.midgray="url('../img/Textures/666666.png') repeat";
                            this.panelback="url('../img/Textures/12224B.png') repeat";
                            this.fondo="url('../img/Textures/12224B-fondo.png') repeat";
				
                            break;
				
                        case 'Classic':

                            this.green="url('../img/Textures/verdeboton.png') repeat";
                            this.border="1px solid #8EAC4F";
				
                            this.feeltex="url('../img/Textures/feelingw.png') repeat";
                            this.quadtex="url('../img/Textures/quad.png') repeat";
                            this.bashtex="url('../img/Textures/bashacker.png') repeat";
                            this.quotes="url('../img/Textures/quotes.png') repeat";
                            this.patttex="url('../img/Textures/pattern.png') repeat";
                            this.beattex="url('../img/Textures/beat.png') repeat";
                            this.recytex="url('../img/Textures/005496.png') repeat";
                            this.meditex="url('../img/Textures/84D0F0.png') repeat";
                            this.victex="url('../img/Textures/vicious.png') repeat";
                            this.trantex="url('../img/Textures/transfer.png') repeat";
                            this.visitex="url('../img/Textures/vision.png') repeat";
                            this.jourtex="url('../img/Textures/journal.png') repeat";
                            this.jourtex="url('../img/Textures/verdeboton.png') repeat";
                            this.greypanel="url('../img/Textures/vicious.png') repeat";
                            this.midgray="url('../img/Textures/midgray.png') repeat";
                            this.panelback="url('../img/Textures/vicious.png') repeat";
                            this.fondo="url('../img/Textures/666666.png') repeat";
			
                            break;
				
                        case 'Happy':

                            this.green="url('../img/Textures/happygreen.png') repeat";
                            this.border="1px solid #F2E983";
				
                            this.feeltex="url('../img/Textures/E97825.png') repeat";
                            this.quadtex="url('../img/Textures/4B99C1.png') repeat";
                            this.bashtex="url('../img/Textures/E2B733.png') repeat";
                            this.quotes="url('../img/Textures/E2B733.png') repeat";
                            this.patttex="url('../img/Textures/84D0F0.png') repeat";
                            this.beattex="url('../img/Textures/AE0436.png') repeat";
                            this.recytex="url('../img/Textures/BD1220.png') repeat";
                            this.meditex="url('../img/Textures/BD1220.png') repeat";
                            this.victex="url('../img/Textures/E97825.png') repeat";
                            this.trantex="url('../img/Textures/ffba16_62.png') repeat";
                            this.visitex="url('../img/Textures/CDDB7B.png') repeat";
                            this.jourtex="url('../img/Textures/84D0F0.png') repeat";
                            this.supporttex="url('../img/Textures/12224B.png') repeat";
                            this.greyback="url('../img/Textures/008F86.png') repeat";
                            this.midgray="url('../img/Textures/008F86.png') repeat";
                            this.panelback="url('../img/Textures/vicious.png') repeat";
                            this.fondo="url('../img/Textures/008F86.png') repeat";
			
                            break;
					
						
                    }
                }
		
		
                var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules;
                for (i=0; i<myrules.length; i++){
                    if(myrules[i].selectorText==".ui-btn-up-a" ||
                        myrules[i].selectorText==".ui-btn-up-b" ||
                        myrules[i].selectorText==".ui-btn-hover-a" ||
                        myrules[i].selectorText==".ui-btn-hover-b" ) {
                        targetrule=myrules[i];
                        targetrule.style.background=this.green;
                        targetrule.style.border=this.border;
                    }
                    if(myrules[i].selectorText==".ui-btn-right, .ui-btn-left, .panelbutton"){
                        targetrule=myrules[i];
                        targetrule.style.background=this.green;
                        targetrule.style.border=this.border;
                    }
                    if(myrules[i].selectorText=='[data-role="footer"] [data-role="button"]'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.green;
                        targetrule.style.border=this.border;
                    }
                    if(myrules[i].selectorText=='.donotshowagain label'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.green;
                        targetrule.style.border=this.border;
                    }
                    if(myrules[i].selectorText=='[data-role="footer"]'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.fondo;
                    }
                    if(myrules[i].selectorText=='#theme1, #theme1 .ui-btn-inner'){
                        targetrule=myrules[i];
                        targetrule.style.background="url('../img/Textures/00598E.png') repeat";
                        targetrule.style.border="none";
                    }
                    if(myrules[i].selectorText=='#theme2, #theme2 .ui-btn-inner'){
                        targetrule=myrules[i];
                        targetrule.style.background="background: url('../img/Textures/verdeboton.png') repeat";
                        targetrule.style.border="none";
                    }
                    if(myrules[i].selectorText=='#theme3, #theme3 .ui-btn-inner'){
                        targetrule=myrules[i];
                        targetrule.style.background="url('../img/Textures/008F86.png') repeat";
                        targetrule.style.border="none";
                    }
                    if(myrules[i].selectorText=='.recycling'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.recytex;
                    }
                    if(myrules[i].selectorText=='.meditations'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.meditex;
                    }
                    if(myrules[i].selectorText=='.grisclaro'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.panelback;
                    }
                    if(myrules[i].selectorText=='.ui-body-a, .ui-overlay-a, .menuheader'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.fondo;
                    }
                    if(myrules[i].selectorText=='.helpblock'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.panelback;
                    }
                    if(myrules[i].selectorText=='.midgray'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.midgray;
                    }
                    if(myrules[i].selectorText=='#listapanel'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.panelback;
                    }
                    if(myrules[i].selectorText=='.feeling'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.feeltex;
                    }
                    if(myrules[i].selectorText=='.quad, .headerquad'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.quadtex;
                    }
                    if(myrules[i].selectorText=='.bashacker'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.bashtex;
                    }
                    if(myrules[i].selectorText=='.quotes'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.quotes;
                    }
                    if(myrules[i].selectorText=='.patternr'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.patttex;
                    }
                    if(myrules[i].selectorText=='.beatyour'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.beattex;
                    }
                    if(myrules[i].selectorText=='.vicious'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.victex;
                    }
                    if(myrules[i].selectorText=='.visionboard'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.visitex;
                    }
                    if(myrules[i].selectorText=='.transfer'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.trantex;
                    }
                    if(myrules[i].selectorText=='.history'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.jourtex;
                    }
                    if(myrules[i].selectorText=='.support' || myrules[i].selectorText=='.configuration'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.supporttex;
                    }
                    if(myrules[i].selectorText=='.miscontroles .ui-slider-label' ||
                        myrules[i].selectorText=='.miscontroles .ui-slider-label ~ .ui-slider-label'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.green;
                    }
                }
	
            },
			
			quadDrupal:function(id){
				
				this.quadview.render(id, historial,app_router);	
				this.changePage (this.quadview);
				
			},
	
	
            quadcheck:function (id) {
	
                if(donotshow.get("quadDoNotShow") === false){
                }
                else{
                    if(id=='0') id='1'; //Si no se ha marcado "no volver a mostrar" y se intenta acceder a la primera página, vamos a la segunda
                }
		

                this.quadview = new quadView({
                    model: this.quadmodel
                });
				if(id=='1' && this.quadmodel.get("version")=="Spoken"){
					try{
                        if(device.platform!='Android')
                            window.plugins.spinnerDialog.show(historial.get("languages").get("dic_loading"), "", function () {
                                console.log("callback");
                            });
                        else
                            window.plugins.spinnerDialog.show(historial.get("languages").get("dic_loading"), "0 %", function () {
                                console.log("callback");
                            });
                    }
					catch(e){
						console.log(e);
					}
					this.drupaldo(this.quadDrupal.bind(this),id);
					
				}
				else{
					this.quadview.render(id, historial,app_router);	
					this.changePage (this.quadview);
				}
		

            //FastClick.attach(document.body);

		
            },
	
            quadSelection:function(){
                var self=this;
                this.language=historial.get("languages");
                if(this.quadmodel && this.quadmodel.get("finished")==false){
                    try{
                        navigator.notification.confirm(historial.get("languages").get("confirm_previous_data"), function(indexans){
                            self.unfinishquadConfirm(indexans);
                        }, historial.get("languages").get("unfinished_tool"),[historial.get("languages").get("restart"),historial.get("languages").get("continue")]); //Si la tool está empezada no preguntamos versión
                    }
                    catch(e){
                        self.unfinishquadConfirm(2);
                        console.log(e);
                    }
                }
                else{
                    if(!historial.get("languages").get("quadAudio")){
                        self.onquadConfirm(1);
                    }
                    else{
                        try{
                            navigator.notification.confirm(historial.get("languages").get("confirm_tool_version"), function(indexans){
                                self.onquadConfirm(indexans);
                            }, "", [historial.get("languages").get("version_written"),historial.get("languages").get("version_spoken")]);
                        }
                        catch(e){
                            self.onquadConfirm(2); //default spoken
                            console.log(e);
                        }
                    }
                }
	
            },
	
            onquadConfirm:function (indexans){
	
                this.quadmodel= new quadModel();
                console.log(historial.get("languages").get("quadAudio"));
                if(indexans==1){
                    this.quadmodel.set("version","Written");
                    this.quadmodel.set({
                        answer1:historial.get("languages").get("dic_quad_p1_placeholder1"),
                        answer2:historial.get("languages").get("dic_quad_p1_placeholder2"),
                        answer3:historial.get("languages").get("dic_quad_p2_placeholder1"),
                        answer4:historial.get("languages").get("dic_quad_p2_placeholder2"),
                        answer5:historial.get("languages").get("dic_quad_p3_placeholder1"),
                        answer6:historial.get("languages").get("dic_quad_p3_placeholder2"),
                        answer7:historial.get("languages").get("dic_quad_p3_placeholder3"),
                        answer8:historial.get("languages").get("dic_quad_p4_placeholder1"),
                        answer9:historial.get("languages").get("dic_quad_p4_placeholder2")
                    });
                    console.log("indexans: " + indexans);
                    this.quadcheck('0');
                }
                if(indexans==2){
                    this.quadmodel.set("version","Spoken");
                    console.log("indexans: " + indexans);
                    this.quadcheck('1');
                }

            },
	
            unfinishquadConfirm:function (indexans){
                var self=this;
                this.language=historial.get("languages");
                if(indexans==1){ //restart
                    if(!historial.get("languages").get("quadAudio")){
                        self.onquadConfirm(1);
                    }
                    else{
                        try{
                            navigator.notification.confirm(historial.get("languages").get("confirm_tool_version"), function(indexans){
                                self.onquadConfirm(indexans);
                            }, "", [historial.get("languages").get("version_written"),historial.get("languages").get("version_spoken")]);
                        }
                        catch(e){
                            self.onquadConfirm(1);
                            console.log(e);
                        }
                    }
                }
                else		//continuar con el mismo modelo
                    this.quadcheck('0');
	
            },
	
            feeling:function (id){
		
                this.feelingmodel= new feelingModel();
                this.feeling= new feelingView({
                    model: this.feelingmodel
                });
                this.feeling.render(id,historial, app_router);
                this.changePage (this.feeling);
		
	
            },
	
            onbashPrompt: function (results){
	
                var self=this;
                if(results.buttonIndex==2){
                    this.bashackermodel.set("target",results.input1);
			
                    try{
                        navigator.notification.confirm(historial.get("languages").get("dic_bash_difficulty"), function(indexans){
                            if(indexans==2)//Dificultad alta
                                self.bashackermodel.set("difficulty",2);
                            else
                                self.bashackermodel.set("difficulty",1);
                            self.bashacker('1');
                        }, historial.get("languages").get("dic_bash_header"),[historial.get("languages").get("dic_normal"),historial.get("languages").get("dic_high")]);
                    }
                    catch(e){
                        console.log(e);
                    }
			
                }
                if(results.buttonIndex==1)
                    Backbone.history.navigate("#summary", {
                        trigger: true
                    });
			
            },
	
	
            bashackerDisclaimer:function (){
		
                try{
                    navigator.notification.confirm(historial.get("languages").get("dic_bash_disclaimer"), function(indexans){}, historial.get("languages").get("dic_Hoffman"),["Ok"]);
                    this.bashacker('0');
                }
                catch(e){
                    this.bashacker('0');
                    console.log(e);
                }
	
            },
	
            bashacker:function (id){
	
                var self=this;
                if(donotshow.get("bashDoNotShow") === false){
                }
                else{
                    if(id=='0') id='3';
                }
                if(id==3){
                    try{
                        navigator.notification.prompt(
                            historial.get("languages").get("dic_bash_matter"),  // message
                            function(ans){
                                self.onbashPrompt(ans);
                            },                  // callback to invoke
                            historial.get("languages").get("dic_bash_header"),            // title
                            [historial.get("languages").get("dic_back"),historial.get("languages").get("dic_next")]            // buttonLabels
                            //historial.get("languages").get("dic_bash_example")                 // defaultText
                            );
                    }
                    catch(e){
                        console.log(e);
                        var obj= new Object();
                        obj["buttonIndex"]=1;
                        obj["input1"]="Sadness";
                        self.onbashPrompt(obj);
                    }
                }
                else{
                    if(id!='1')
                        this.bashackermodel= new bashackerModel();
                    this.bashackerV= new bashackerView({
                        model: this.bashackermodel
                    });
                    this.bashackerV.render(id,historial);
                    this.changePage (this.bashackerV);
                }
			
            },
	
            pattern:function (id){
	
                this.pattern= new patternView();
                this.pattern.render(id,historial);
                this.changePage (this.pattern);
			
            },
	
            onbeatPrompt: function (results){
                if(results.buttonIndex==2){
                    this.beatyourmodel.set("target",results.input1);
                    this.beatyourdarkSide('1');
                }
                if(results.buttonIndex==1)
                    Backbone.history.navigate("#summary", {
                        trigger: true
                    });
			
            },
	
            beatyourdarkSide: function(id){
		
                var self=this;
                if(donotshow.get("beatDoNotShow") === false){
                }
                else{
                    if(id=='0') id='3';
                }
                if(id==3){
                    try{
                        navigator.notification.prompt(
                            historial.get("languages").get("dic_beatyour_matter"),  // message
                            function(ans){
                                self.onbeatPrompt(ans);
                            },                  // callback to invoke
                            historial.get("languages").get("dic_beatyour_header"),            // title
                            [historial.get("languages").get("dic_back"),historial.get("languages").get("dic_next")] // buttonLabels
                            //historial.get("languages").get("dic_beatyour_example")                 // defaultText
                            );
                    }
                    catch(e){
                        console.log(e);
                        var obj= new Object();
                        obj["buttonIndex"]=2;
                        obj["input1"]="Envy";
                        self.onbeatPrompt(obj);
                    }
                }
                else{
                    if(id!='1' && id!='2')
                        this.beatyourmodel = new beatyourModel();
                    this.beatyour= new beatyourdarkView({
                        model: this.beatyourmodel
                    });
                    this.beatyour.render(id,historial, app_router);
                    this.changePage (this.beatyour);
                }
	
            },
	
            vicious:function (id){
	
                var self=this;
		
                if(id=='0')
                    if(!this.viciousmodel || this.viciousmodel.get("finished")){
                        this.viciousmodel = new viciousModel();
                        this.viciousconfirm(id);
                    }
                    else if(this.viciousmodel.get("finished")===false){
                        try{
                            navigator.notification.confirm(historial.get("languages").get("confirm_previous_data"), function(indexans){
                                if(indexans==1){
                                    self.viciousmodel = new viciousModel();
                                    self.viciousconfirm(id);
                                }
                                if(indexans==2){
                                    self.viciousconfirm(id);
                                }
                            }, historial.get("languages").get("unfinished_tool"),[historial.get("languages").get("restart"),historial.get("languages").get("continue")]);
                        }
                        catch(e){
                            self.viciousconfirm(id);
                            console.log(e);
                        }
                    }
                    else {
                        this.viciousconfirm(id);
                    }
                else {
                    this.viciousconfirm(id);
                }

		
            },
	
            viciousconfirm:function(id){
	
                if(donotshow.get("viciousDoNotShow") === false){
                }
                else{
                    if(id=='0') id='4';
                }
                this.vicious = new viciousView({
                    model: this.viciousmodel
                });
                this.vicious.render(id, historial);
                this.changePage (this.vicious);
	
            },
	
	
	
            transferenceS:function (id){
                var self=this;
	

                this.transference= new transferenceView({
                    model: this.transferencemodel
                });
                this.transference.render(id, historial); //en el render notify siempre pasa a true
                this.changePage (this.transference);
	   
		
		
                if(id=='10') this.navigate("summary", {
                    trigger: true,
                    replace: true
                });
            },
	
            transSelection:function (){
                var self=this;
                this.language=historial.get("languages");
                if(this.transferencemodel && this.transferencemodel.get("finished")==false){
                    try{
                        navigator.notification.confirm(historial.get("languages").get("confirm_previous_data"), function(indexans){
                            self.unfinishedtransConfirm(indexans);
                        }, historial.get("languages").get("unfinished_tool"),[historial.get("languages").get("restart"),historial.get("languages").get("continue")]);
                    }
                    catch(e){
                        self.unfinishedtransConfirm(2);
                        console.log("L 660" +e);
                    }
                }
                else{
                    try{
                        navigator.notification.confirm(historial.get("languages").get("confirm_tool_version"), function(indexans){
                            self.ontransConfirm(indexans);
                        }, " ", [historial.get("languages").get("version_short"),historial.get("languages").get("version_long")]);
                    }
                    catch(e){
                        self.ontransConfirm(1);
                        console.log("L 669" +e);
                    }
                }
	
            },
	
            ontransConfirm:function (indexans){
                mylanguage=historial.get("languages");
		
                this.transferencemodel= new transferenceModel();
                if(indexans==1){//Short
                    historial.get("languages").destroy();
                    this.transferencemodel.set("version","Short");
                    mylanguage.set("transVersion","transference11");
                    mylanguage.set("transVersion2","transference4");
                    mylanguage.save();
                    historial.create(mylanguage);
                    console.log("L 680" +"indexans: " + indexans);
                }
                if(indexans==2){//Long
                    historial.get("languages").destroy();
                    this.transferencemodel.set("version","Long");
                    mylanguage.set("transVersion","transference5");
                    mylanguage.set("transVersion2","transference8");
                    mylanguage.save();
                    historial.create(mylanguage);
                    console.log("L 684" +"indexans: " + indexans);
                }
                if(indexans == 1 || indexans == 2){
                    this.transferenceS('0');
                    console.log("L 688" +"indexans: " + indexans);
                }
	   
	
            },
	
            unfinishedtransConfirm:function (indexans){
                var self=this;
                this.language=historial.get("languages");
                if(indexans==1){ //restart
                    try{
                        navigator.notification.confirm(historial.get("languages").get("confirm_tool_version"), function(indexans){
                            self.ontransConfirm(indexans);
                        }, " ", [historial.get("languages").get("version_short"),historial.get("languages").get("version_long")]);
                    }
                    catch(e){
                        self.ontransConfirm(1);
                        console.log("L 702" + e);
                    }
				
                }
                else		//continuar con el mismo modelo
                    this.transferenceS('0');
	   
	
            },
	
	
            visionboard:function (id){
	
                if(id=='1' || id=='0'){
                    this.visionmodel= new visionModel();
                }
                this.visionboard= new visionboardView({
                    model: this.visionmodel
                });
                this.visionboard.render(id,historial);
                this.changePage (this.visionboard);
		
            },
	
            auxsummary:function () {
		
                this.summaryV= new summaryView();
                this.summaryV.render(historial);
                this.changePage (this.summaryV);
				try{
						navigator.splashscreen.hide();
				}
				catch(e){
					console.log(e);
				}
				setTimeout(function(){
                    try{
						navigator.splashscreen.hide();
					}
					catch(e){
						console.log(e);
					}
                },1000);
				
		
            },
	
            summary:function () {
                this.checkDateUpdate(1);
            // this.changePage (this.summary);
        
		
            },
	
            journal:function (id) {
	
                if(id=='1'){
                    this.journalmodel=new journalModel();
                }
                this.journalV= new journalView({
                    model: this.journalmodel
                });
                this.journalV.render(id,historial);
                this.changePage (this.journalV);
        
            },
			
			renderRec1:function(id){
				
				this.recyclingV.render(id,historial, app_router);				
				this.changePage (this.recyclingV);
			},
	
            recycling:function (id) {
	
				if(id=='0'){
                    this.recyclingmodel= new hearingModel();
                }
                if(donotshow.get("recyDoNotShow") === false){
                }
                else{
                    if(id=='0') id='1';
                }
                this.recyclingV= new recyclingView({
                    model: this.recyclingmodel
                });
				if(id=='1'){
					try{
                        window.plugins.spinnerDialog.show(historial.get("languages").get("dic_loading"), null, function () {
                            console.log("callback");
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
					if(this.recyclingmodel.get("cachedList"))//versión cacheada, no drupaldo
						this.renderRec1(id);
					else{
						console.log("navigator.connection.type :" +navigator.connection.type);
						if(navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){
							this.recyclingV.render(id,historial, app_router);				
							this.changePage (this.recyclingV);
						}
						else{
							this.drupaldo(this.renderRec1.bind(this),id);	
						}
						
					}
				}
				else{
					this.recyclingV.render(id,historial, app_router);
					this.changePage (this.recyclingV);
				}
        
            },
			
			getAudionameDrupal: function(id){
				
				try{
                        window.plugins.spinnerDialog.show(historial.get("languages").get("dic_loading"), null, function () {
                            console.log("callback");
                        });
				}
				catch(e){
					console.log(e);
				}
				
				
				if(typeof historial.get("nodelist").get(id)!=='undefined'){
					console.log("Tengo el nombre del nodo guardado");
					
					mylanguage=historial.get("languages");
					historial.get("languages").destroy();
					mylanguage.set("audioName",historial.get("nodelist").get(id));
					mylanguage.save();
					historial.create(mylanguage);
					
					console.log(historial.get("nodelist").get(id));
					Backbone.history.navigate("#recycling2", {
                        trigger: true
						});
				}
				else
					this.drupaldo(this.getAudioname,id);
				
			},
	
            getAudioname: function(id){
	
                var self=this;
                var AUDIO_NID = id;
			
                var params_audio_node = {
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "node/" + AUDIO_NID + ".jsonp",
                    processData: true,
                    success: function(data) {
                        console.log(data.field_audio.und[0]);
                        console.log("audio node filename:->"+ data.field_audio.und[0].uri.split("private://")[1]+ "<-");
						mylanguage=historial.get("languages");
						mynodelist=historial.get("nodelist");
						historial.get("languages").destroy();
						historial.get("nodelist").destroy();
						mylanguage.set("audioName",data.field_audio.und[0].uri.split("private://")[1]);
						mynodelist.set(id,data.field_audio.und[0].uri.split("private://")[1]);
						mylanguage.save();
						mynodelist.save();
						historial.create(mylanguage);
						historial.create(mynodelist);

                        Backbone.history.navigate("#recycling2", {
                        trigger: true
						});
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
                //console.log("params ", params_audio_node);
                $.ajax(params_audio_node);
            },
			
			getAudionameMediDrupal: function(id){
				
				try{
                        window.plugins.spinnerDialog.show(historial.get("languages").get("dic_loading"), null, function () {
                            console.log("callback");
                        });
				}
				catch(e){
					console.log(e);
				}
				
				
				if(typeof historial.get("nodelist").get(id)!=='undefined'){
					console.log("Tengo el nombre del nodo guardado");
					
					mylanguage=historial.get("languages");
					historial.get("languages").destroy();
					mylanguage.set("audioName",historial.get("nodelist").get(id));
					mylanguage.save();
					historial.create(mylanguage);
					
					console.log(historial.get("nodelist").get(id));
					Backbone.history.navigate("#meditations2", {
                        trigger: true
						});
				}
				else
					this.drupaldo(this.getAudionameMedi,id);
				
			},
	
            getAudionameMedi: function(id){
				console.log("getAudionameMedi");
                var self=this;
                var AUDIO_NID = id;
                var params_audio_node = {
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", historial.get("languages").get("sesToken"));
                    },
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "node/" + AUDIO_NID + ".jsonp",
                    processData: true,
                    success: function(data) {
                        console.log(data.field_audio.und[0]);
                        console.log("audio node filename:->"+ data.field_audio.und[0].uri.split("private://")[1]+ "<-");
						mylanguage=historial.get("languages");
						mynodelist=historial.get("nodelist");
						historial.get("languages").destroy();
						historial.get("nodelist").destroy();
						mylanguage.set("audioName",data.field_audio.und[0].uri.split("private://")[1]);
						mynodelist.set(id,data.field_audio.und[0].uri.split("private://")[1]);
						mylanguage.save();
						mynodelist.save();
						historial.create(mylanguage);
						historial.create(mynodelist);
						
                        Backbone.history.navigate("#meditations2", {
                        trigger: true
						});
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
                //console.log("params ", params_audio_node);
                $.ajax(params_audio_node);
            },
			
			renderMed1:function(id){
				
				this.meditationsV.render(id,historial, app_router);
				this.changePage (this.meditationsV);
				
			},
	
            meditations:function (id) {
	  
				if(id=='0'){
                    this.meditationmodel= new hearingModel();
                }
				
                if(donotshow.get("mediDoNotShow") === false){
                }
                else{
                    if(id=='0') id='1';
                }
                
                console.log("HOLA");
                this.meditationsV= new meditationsView({
                    model: this.meditationmodel
                });
				if(id==1){
					try{
                        window.plugins.spinnerDialog.show(historial.get("languages").get("dic_loading"), null, function () {
                            console.log("callback");
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
					if(this.meditationmodel.get("cachedList2"))//versión cacheada, no drupaldo
						this.renderMed1(id);
					else{
						if(navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){
							this.meditationsV.render(id,historial, app_router);
							this.changePage (this.meditationsV);
						}
						else{
							this.drupaldo(this.renderMed1.bind(this),id);
						}
					}
				}
				else{
					this.meditationsV.render(id,historial, app_router);
					this.changePage (this.meditationsV);
				}
        
            },
	
	
            historyload:function () {
                //historial.fetch();

                this.historypage= new historyView({
                    collection: historial
                });

	
                this.historypage.render();

                this.changePage (this.historypage);
              
		
            },
			
			supportDrupal:function(){
				
				this.support= new supportView();
                this.support.render(historial);
                this.changePage (this.support);
				
			},
	
            support:function () {
	
				try{
                    window.plugins.spinnerDialog.show(null, null, function () {
                        console.log("callback");
                    });
                }
                catch(e){
                    console.log(e);
                }
                this.drupaldo(this.supportDrupal.bind(this),"null");              
		
            },
	
            configuration:function () {
                var self=this;
		
                this.configuration= new configurationView();
                this.configuration.render('0',historial, app_router);
                this.changePage (this.configuration);

            },
			
			passwordProtect:function () {
				
		
                this.passwordV= new passwordView();
		
                this.passwordV.render(0,historial);
		
                this.changePage (this.passwordV);
        
            },
			
			profile:function () {
				
                this.profileV= new profileView();
		
                this.profileV.render(0,historial);
		
                this.changePage (this.profileV);
        
            },
	
            deletehistory:function () {
	
                var self=this;
                try{
                    window.plugins.spinnerDialog.show(null, null, function () {
                        console.log("callback");
                    });
                }
                catch(e){
                    console.log(e);
                }
                historial.destroyhistory();
                historial= new historyCollection;
                language = new languageModel({
                    id: "languages",
                    languageAC: "none",
                    theme:"Classic",
                    sesToken:"none",
                    transVersion:"transference9",
                    transVersion2:"transference4",
					notifications: true,
					feelingsList: "void",
					actionsList: "void"
                });
                donotshow= new donotshowModel({
                    id: "donotshow",
                    saved: "no" ,
                    quadDoNotShow:false,
                    bashDoNotShow:false,
                    beatDoNotShow:false,
                    recyDoNotShow:false,
                    mediDoNotShow: false,
                    viciousDoNotShow: false
                });
				
				profileM= new profileModel({
					id: "profile",
					nickname: "",
					userID: "",
					email: "",
					picture: "",
					pass: "",
					lastupdated: "",
					lastcoordinates: "",
					description: "",
					info: "",
					latitude: "",
					longitude: ""
				});
				
				var nodelist= new nodelistModel({
					id: "nodelist"
				});
				
                historial.create(language);
 
                loaded = false;
	
                self.principal();
	
                setTimeout(function(){
                    if(!loaded)
                        self.principal();
                },3000);
		
                setTimeout(function(){
                    if(!loaded)
                        self.principal();
                },6000);
		
                setTimeout(function(){
                    if(!loaded)
                        self.principal();
                },9000);

	
            },

            changePage:function (view) {
                $("body").append(view.$el);
                $.mobile.changePage($(view.el), {
                    transition: 'none'
                });
                console.log("cambio de página");
				setTimeout(function(){
                    FastClick.attach(document.body);
                },1500);
                
		
                $( ".ui-input-text" ).bind( "click", function(event, ui) {
                    console.log("evento de router");
                    if(device.platform=='Android'){
                        setTimeout(function(){
                            $("div[data-role='footer']").attr('class', 'ui-footer ui-bar-a ui-footer-fixed slideup ui-panel-content-fixed-toolbar ui-panel-content-fixed-toolbar-closed');
                        },1000);
                    }
                });

            }
        });

        var initialize = function(){
    
            app_router = new AppRouter();
	
    
            // As above, call render on our loaded module
            // 'views/users/list'
    
            Backbone.history.start();
        };
  
        var historial= new historyCollection;
        var language = new languageModel({
            id: "languages",
            languageAC: "none",
            sesToken:"none",
            transVersion:"transference9",
            transVersion2:"transference4",
			notifications: true,
			feelingsList: "void",
			actionsList: "void"
        });
        var donotshow= new donotshowModel({
            id: "donotshow",
            saved: "no" ,
            quadDoNotShow:false,
            bashDoNotShow:false,
            beatDoNotShow:false,
            recyDoNotShow:false,
            mediDoNotShow: false,
            viciousDoNotShow: false
        });
		
		var profileM= new profileModel({
            id: "profile",
			nickname: "",
			userID: "",
			email: "",
			picture: "",
			pass: "",
			lastupdated: "",
			lastcoordinates: "",
			description: "",
			info: "",
			latitude: "",
			longitude: ""
			
        });
		
		var nodelist= new nodelistModel({
			id: "nodelist"
		});
		
        var logintrys = 8;
        var loaded = false;
        var Checkversion = false;
        var app_router;
        var innerlog = new innerLog;
  
        return {
            initialize: initialize
        };
    });
