

define([
    'jquery',
    'underscore',
    'backbone',
    'languageModel',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'jquerymobile'
  
    ], function($, _, Backbone, languageModel){

		configuration = "";
		languageSel = "";
		headerandpanel = "";

        configurationView = Backbone.View.extend({
  
            events:{
	
	
                "click .ui-selectmenu a":"clickmenu",
                "click .settheme":"settheme",
                "click #resetApp":"resetApp",
                "click .notifications":"notifications"
	
            },
   
            render: function(id, historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                if(id=='1'){ //selectlanguage de la primera vez que se arranca la app (si no ha detectado lenguaje)
                    this.firstlanguage=true;
					this.router=router;
                    compiledTemplate = _.template( languageSel );
                    setTimeout(function(){
                        $("#select1-listbox").popup("open");
                        $("#select1-button").click(function (e) {
                            e.preventDefault();
                            $("#select1-listbox").popup("open");
                        });
                    },400);
                    this.$el.empty().append(compiledTemplate);
                    this.history=historycollection;
                    router.drupaldo(this.getactivelanguages.bind(this), "null");
                }
                else{
                    this.firstlanguage=false;
                    compiledTemplate = _.template( configuration );
		
                    this.languages = historycollection.get("languages");
                    this.logintrys=1;
					this.router=router;
					this.external="false";
                    var self=this;
                    historycollection.get("languages").set("helppanel","");
                    this.history=historycollection;
                    result= historycollection.get("languages").toJSON();
                    compiledheaderandpanel=_.template( headerandpanel );
                    this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
                    this.$(".dic_help").hide();
	
                    if(this.history.get("languages").get("notifications")!=false)//checkbox marcado
                        this.addNotifCheckbox(true);
                    else
                        this.addNotifCheckbox(false);
		
                    setTimeout(function(){
                        $("#select1-button").click(function (e) { //esta función habilita el select para que se abra capturando el evento de click
                            e.preventDefault();
                            $("#select1-listbox").popup("open");
                        });
                    } ,400);
	
                    console.log("Sestoken: " + this.history.get("languages").get("sesToken")); //este token es undefined :s
                    router.drupaldo(this.getactivelanguages.bind(this), "null",true);
					
					if(navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){//Si no hay conexión a internet ocultamos la caja de lenguas
						this.$("#languageTag").hide();
						this.$("#testForm").hide();
					}
	
                }
            },

	
            resetApp: function(){
                var self=this;
                try{
                    navigator.notification.confirm(self.history.get("languages").get("dic_config_reset_app"), function(indexans){
                        if(indexans==2)Backbone.history.navigate("#deletehistory", {
                            trigger: true
                        });
                    }, "", [self.history.get("languages").get("dic_transf_p9_text3"),self.history.get("languages").get("dic_transf_p9_text2")]);
                }
                catch(e){
                    Backbone.history.navigate("#deletehistory", {
                        trigger: true
                    });
                }
	
            },
	
            addNotifCheckbox: function(checked){
	   
                if(checked)
                    this.$("#checkboxdiv").append("<div id='checkboxes1' data-role='fieldcontain' data-controltype='checkboxes' class='notifications' style='border:none;'><fieldset data-role='controlgroup' data-type='vertical'><input id='checkbox1' name='' data-theme='b' type='checkbox' checked='checked'/><label id='checkbox' for='checkbox1'>" + this.history.get("languages").get("dic_notifications") + "</label></fieldset></div>");
                else
                    this.$("#checkboxdiv").append("<div id='checkboxes1' data-role='fieldcontain' data-controltype='checkboxes' class='notifications' style='border:none;'><fieldset data-role='controlgroup' data-type='vertical'><input id='checkbox1' name='' data-theme='b' type='checkbox' /><label id='checkbox' for='checkbox1'>" + this.history.get("languages").get("dic_notifications") + "</label></fieldset></div>");
	
	
            },
	
            notifications: function (){
                var self=this;
                notifLang= this.history.get("languages");
                if($("#checkbox").attr("data-icon")=="checkbox-on"){ //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    notifLang.set("notifications",false);
                    try{
                        window.plugin.notification.local.cancelAll();
                    }
                    catch(e){}
                }
                else{
                    notifLang.set("notifications",true);
			
                    auxdate = new Date();
                    notifdate = new Date(auxdate.getTime()+604800000);	//604800000 = 1 semana en milisecs
                    try{
                        window.plugin.notification.local.schedule({
							id:         1,  // A unique id of the notifiction
							firstAt:       notifdate,    // This expects a date object
							text:    	self.history.get("languages").get("dic_notification_text"),  // The message that is displayed
							title:      self.history.get("languages").get("dic_notification_title"),  // The title of the message
							every:     "weekly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
							//badge:      "0",  // Displays number badge to notification
							//sound:      "",  // A sound to be played
							//json:       "pls",  // Data to be passed through the notification
							ongoing:    false // Prevent clearing of notification (Android only)
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
                }
		
                this.history.get("languages").destroy();
                this.history.create(notifLang);
	
            },
	
            settheme: function(e){
	
                var theme=$(e.target).text().replace(/\W/g, '');
                console.log(theme);
                aux=this.history.get("languages");
		
                switch(theme){
			
                    case 'Blue':
			
                        this.green="url('../img/Textures/00598E.png') repeat";
                        this.border="1px solid #5784A0";
                        aux.set("theme","Blue");
				
                        this.feeltex="url('../img/Textures/009DD1.png') repeat";
                        this.quadtex="url('../img/Textures/00598E.png') repeat";
                        this.bashtex="url('../img/Textures/84D0F0.png') repeat";
                        this.quotes="url('../img/Textures/84D0F0.png') repeat";
                        this.patttex="url('../img/Textures/4B99C1.png') repeat";
                        this.beattex="url('../img/Textures/4B99C1.png') repeat";
                        this.recytex="url('../img/Textures/BD1220.png') repeat";
                        this.meditex="url('../img/Textures/BD1220.png') repeat";
                        this.victex="url('../img/Textures/007DA9.png') repeat";
                        this.trantex="url('../img/Textures/A9C7E6.png') repeat";
                        this.visitex="url('../img/Textures/12224B.png') repeat";
                        this.jourtex="url('../img/Textures/00598E-75.png') repeat";
                        this.supporttex="url('../img/Textures/12224B.png') repeat";
                        this.greyback="url('../img/Textures/BD1220.png') repeat";
                        this.midgray="url('../img/Textures/666666.png') repeat";
                        this.panelback="url('../img/Textures/12224B.png') repeat";
                        this.fondo="url('../img/Textures/12224B-fondo.png') repeat";
				
                        break;
				
                    case 'Classic':

                        this.green="url('../img/Textures/verdeboton.png') repeat";
                        this.border="1px solid #8EAC4F";
                        aux.set("theme","Classic");
				
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
                        this.supporttex="url('../img/Textures/verdeboton.png') repeat";
                        this.greypanel="url('../img/Textures/vicious.png') repeat";
                        this.midgray="url('../img/Textures/midgray.png') repeat";
                        this.panelback="url('../img/Textures/vicious.png') repeat";
                        this.fondo="url('../img/Textures/666666.png') repeat";
			
                        break;
				
                    case 'Happy':

                        this.green="url('../img/Textures/happygreen.png') repeat";
                        this.border="1px solid #F2E983";
                        aux.set("theme","Happy");
				
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
		
                this.history.create(aux);
                console.log("Variables creades");
                var mysheet=document.styleSheets[5];
		
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
                        console.log("recycling");
                    }
                    if(myrules[i].selectorText=='.meditations'){
                        targetrule=myrules[i];
                        targetrule.style.background=this.meditex;
                        console.log("meditations");
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
	
            takequadAudio: function(elemento){
	
                var self=this;
                var aux=self.history.get("languages");
                if(elemento.audio_type=="Quad Check In"){
                    if(elemento.language==this.history.get("languages").get("languageAC")){ //la lengua tiene quadAudio
                        self.history.get("languages").destroy();
                        aux.set("quadAudio", true);
                        aux.set("quadAudioNID", elemento.nid);
                        console.log("EL NID ES: " + elemento.nid);
                        self.history.create(aux);
                        aux.save();
                        aux.fetch();
                    }
                }
		
            },
	
            checkquadAudio: function(){
	
                var self=this;
                var params_audios = {
                    type: 'GET',
                    dataType: 'jsonp',
                    url: "http://appv2.hoffman-international.com/hoffapp/" + "audios.jsonp",
                    processData: true,
                    success: function(data) {
                        self.history.get("languages").set("quadAudio",false)
                        data.forEach(self.takequadAudio, self);
                        self.languageslist.forEach(self.savelanguageversion, self);
                        self.getQuotes(self.history.get("languages").get("languageAC"));
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
		
                $.ajax(params_audios);
	
            },
	
            getfirstlang: function(element){
	
                console.log("Guardo " + element.language.split("_")[0]);
	
                if(!this.firstlanguage && element.language==this.history.get("languages").get("languageAC")){
                    setTimeout(function() {
                        console.log($("#select1-button .ui-btn-text span").text(element.description));
                    }, 100);
                    $("#select1").prepend("<option value="+ element.language +">" + element.description + "</option>"); //si es el actual lo pongo el primero
                }
		
                else{
                    $("#select1").append("<option value="+ element.language +">" + element.description + "</option>");
                }
		
                $('#select1').selectmenu('refresh');
	
            },
	
            clickmenu: function(f){
				var self=this;
                console.log($("#select1 option:selected").val());
                if(this.firstlanguage || this.history.get("languages").get("languageAC")!=$("#select1 option:selected").val()){ //if language change or first
					console.log("Ejecuto drupaldo");
                    try{
                        window.plugins.spinnerDialog.show(self.history.get("languages").get("dic_loading"), null, function () {
                            console.log("callback");
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
					this.router.drupaldo(this.gettranslationExternal.bind(this), $("#select1 option:selected").val());
                }

            },
		
            getactivelanguages: function(){
	
                var self=this;
                var params_languages = { //active languages
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: function (request) {
                        request.setRequestHeader("X-CSRF-Token", self.history.get("languages").get("sesToken"));
                    },
                    url: "http://appv2.hoffman-international.com/hoffapp/" + "active-languages.jsonp",
                    processData: true,
                    success: function(data) {
                        console.log("languages: ", data);
                        self.languageslist=data;
                        data.forEach(self.getfirstlang, self);
					
                    },
                    error: function(code) {
                        console.log("petada, intento loguear", code);
                        if(self.logintrys==1){
                            self.login();
                            self.logintrys-=1;
                        }
                        else
                            alert("Internet failure");
                    }
                };
 						
                $.ajax(params_languages);


            },
	
            savelanguageversion: function(elemento){
	
                if(elemento.language==this.history.get("languages").get("languageAC")){
                    console.log("La versión es " + elemento.version);
                    this.history.get("languages").set("langver",elemento.version);
                    aux=this.history.get("languages");
                    this.history.get("languages").destroy();
                    aux.set("langver",elemento.version);
                    console.log(aux);
                    this.history.create(aux);
                    aux.save();
                    aux.fetch();
                }
	
            },
	
            gettranslationExternal:function(LANGUAGE){
	
                this.external="yes";
				this.router.drupaldo(this.gettranslation.bind(this),LANGUAGE);
	
            },
	
	
            saveQuoteDate: function(){
		
                var self=this;
		
                this.fecha=new Date();
                console.log("Historial antes: ");
                console.log(self.history);
                aux=self.history.get("languages");
                self.history.get("languages").destroy();
                aux.set("downloaded","yes");
                aux.set("fecha",this.fecha.getTime());
                self.history.create(aux);
                console.log("Historial despues: ");
                console.log(self.history);
                try{
                    window.plugins.spinnerDialog.hide();
                }
                catch(e){
                    console.log(e);
                }
                console.log(this.external);
                if(this.external=="yes")
                    Backbone.history.navigate("#auxsummary", {
                        trigger: true
                    });
                else
                    Backbone.history.navigate("#summary", {
                        trigger: true
                    });
	
            },
	
            getQuotes: function(LANGUAGE){
	
                var self=this;
                var DRUPAL_SERVER = "http://appv2.hoffman-international.com/hoffapp/";
                var params_quotes = {
                    type: 'GET',
                    dataType: 'jsonp',
                    url: DRUPAL_SERVER + "quotes_" + LANGUAGE + ".jsonp",
                    processData: true,
                    success: function(data) {
                        aux=self.history.get("languages");
                        self.history.get("languages").destroy();
                        aux.set("quote",data[0].node_title);
                        aux.set("quoteAuthor",data[0].author);
                        aux.set("quote2",data[1].node_title);
                        aux.set("quoteAuthor2",data[1].author);
                        aux.set("downloaded","yes");
                        self.history.create(aux);
                        aux.save();
                        aux.fetch();
                        self.saveQuoteDate();
				
                    },
                    error: function(code) {
                        console.log("petada", code);
                        Backbone.history.navigate("#summary", {
                            trigger: true
                        });
                    }
                };
                //console.log("params ", params);
                var downloaded_quotes = $.ajax(params_quotes);
	
            },
	
            gettranslation: function(LANGUAGE){
		
                var DRUPAL_SERVER = "http://appv2.hoffman-international.com/hoffapp/";
                var aux2self=this;
		
				console.log("GETTRANSLATION");
				console.log("GETTRANSLATION");
				console.log("GETTRANSLATION");
				console.log("GETTRANSLATION");
				console.log("GETTRANSLATION");
				console.log("GETTRANSLATION");
                var params_translations = {
                    type: 'GET',
                    dataType: 'jsonp',
                    url: DRUPAL_SERVER + LANGUAGE + ".jsonp",
                    processData: true,
                    success: function(data) {
                        //console.log("data: ", data);
                        var translations = {};
                        for (index = 0; index < data.length; ++index) {
                            translations[data[index]["key"]] = data[index][LANGUAGE];
                        }
                        //console.log("translations: ", translations);
                        console.log("Lenguas descargadas");
						var routerToken=aux2self.history.get("languages").get("sesToken");
                        destroylanguage=aux2self.history.get("languages");
                        destroylanguage.destroy();
                        aux2self.language=new languageModel(translations);
                        aux2self.language.id="languages"; //esta instrucción no sirve si ya viene escrito desde el server
                        aux2self.language.cid="c1";
                        aux2self.language.set("downloaded","yes");
						aux2self.language.set("quadAudioDownloaded","no");
						aux2self.language.set("id","languages");
						aux2self.language.set("notifications", true);
						aux2self.language.set("sesToken", routerToken); //tokendebug
                        aux2self.history.create(aux2self.language);
                        aux2self.language.save();
                        aux2self.language.fetch();
                        aux2self.checkquadAudio();
				
                    },
                    error: function(code) {
                        console.log("petada", code);
                        if(false){ //no tengo internet
                            alert("Internet failure");
                        }
                    }
                };
		
                $.ajax(params_translations);

            },
	
	
            login: function(){
		
                var DRUPAL_SERVER = "http://appv2.hoffman-international.com/hoffapp/";
                console.log("intenta fer un login d'appuser");
                var self=this;
                var params = {
                    type: 'post',
                    dataType: 'json',
                    url: DRUPAL_SERVER + "user/login.json",
                    data: {
                        'username': 'appuser',
                        'password': 'appuser'
                    },
                    success: function(data) {
                        console.log("Configuration login succeed, token: " + data.token);
                        self.getactivelanguages();
                        self.auxtoken=data.token;
                    //this.languages.set("sesToken",data.token);
                    //this.languages.set("cookie",data.session_name+"="+data.sessid);
                    //this.languages.save();
                    //this.history.create(language);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert('page_login_submit - failed to login');
                        console.log(JSON.stringify(XMLHttpRequest));
                        console.log(JSON.stringify(textStatus));
                        console.log(JSON.stringify(errorThrown));
                        if(false){ //no tengo internet
                            alert("Internet failure");
                        }
                        else{ //ya está logueado
					
                    }
				
                    }
                };

                $.ajax(params);
	

            }
	


        });

        return configurationView;
    });