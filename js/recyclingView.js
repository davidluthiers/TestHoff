define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'hearingModel',
    'text!../Templates/recycling0.html',
    'text!../Templates/recycling1.html',
    'text!../Templates/recycling2.html',
    'text!../Templates/recyclinghistory.html',
    'text!../Templates/summary.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, hearingModel, recycling0, recycling1, recycling2, recyclinghistory, summary, headerandpanel){



        recyclingView = Backbone.View.extend({
  
            events:{
                "click #playSoundButton":"playfun",
				"click .getaudioLI":"getaudioLI",
                "slidestart #songPosition":"recslidestart",
                "slidestop #songPosition":"recslidestop",
                "slidestop #volText":"vollidestart",
                "click .save":"save",
				"click .stopaudio":"stopaudio",
                "click .donotshowagain":"checkbox",
                "click #downloadAndPlay":"downloadAndPlay",
                "click .backtolist":"backtolist"
            },
	
            render: function(id, historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('id', 'recyclingpage');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
	
                this.history=historycollection;
                selfR=this;
				this.router=router;
				
                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( recycling0 );
			
                        break;
                    case '1':
                        compiledTemplate = _.template( recycling1 );
				  
                        break;
                    case '2':
                        compiledTemplate = _.template( recycling2);
                        break;
                }
				
                if(id>19){
                    historyindex=id-20;
                    compiledTemplate = _.template( recyclinghistory );
                    this.model= historycollection.at(historyindex);
                }
				
			
                selfR=this;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_recycling_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),selfR.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
			
		
		
                if(id=='1'){
					//Lo siguiente usaría siempre la lista guardada y nunca se actualizaría
					//typeof selfR.history.get("languages").get("cachedList") !== 'undefined'
					
                   	if(this.model.get("cachedList") || navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){//si ya he cargado la lista usando este modelo Ó no tengo internet
						if(!this.model.get("cachedList") && !selfR.history.get("languages").get("cachedList")){
							alert("No internet connection");
						}
						else{
							console.log("Con este modelo ya ha descargado la lista, no vuelvo a descargarla");
							selfR.languages=selfR.history.get("languages").get("cachedLanguages");
							
							$(document).one('pageshow', function (event, ui) {
								selfR.history.get("languages").get("cachedList").forEach(selfR.fillrecyclinglist, selfR);
								try{
									window.plugins.spinnerDialog.hide();
								}
								catch(e){
									console.log(e);
								}
							});
						}
					}
					else{
						console.log("Descargo la lista");
						this.history.get("languages").set("audioName","invalid");
						var params_languages = { //active languages
							type: 'GET',
							dataType: 'jsonp',
							beforeSend: function (request) {
								request.setRequestHeader("X-CSRF-Token", selfR.history.get("languages").get("sesToken"));
							},
							url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "active-languages.jsonp",
							processData: true,
							success: function(data) {
								selfR.languages= data;
								selfR.history.get("languages").set("cachedLanguages", data);
								selfR.getaudios();
							},
							error: function(code) {
								console.log("petada, intento loguear", code);
								selfR.login();
							}
						};
								
						$.ajax(params_languages);
					}
                }
				
				if(id>19){
					this.$(".panelbutton").hide();
                    this.$(".dic_help").hide();
					setTimeout(function() {
					   $(".ui-slider-track a").removeAttr("href");
					}, 1500); 
				}
	
                if(id=='2'){
                    this.audioplaying=false;
                    counter=0;
                    while(selfR.history.get("languages").get("audioName")=='invalid' && counter <2000){
                        //wait
                        console.log(selfR.history.get("languages").get("audioName"));
                        counter++;
                    }
                    this.$(".panelbutton").hide();
                    this.$(".dic_help").hide();
                    console.log("Tengo el audio filename");
					console.log(cordova.file.externalDataDirectory+"audios/"+selfR.history.get("languages").get("audioName"));
                    this.model.set("audioName",selfR.history.get("languages").get("audioName"));
					
					var keyflag= true;
					//search in audioName library for the audioname
					for (var key in this.history.get("nodelist")){
						if(this.history.get("nodelist").get(key)){
							console.log("Supuestamente tengo el fichero guardado");
							this.nodownload.bind(this);
							keyflag = false;
							break;
						}
					}
					
					if(keyflag)
						this.router.drupaldo(this.createMedia.bind(this),this.history.get("languages").get("audioName"))
					//window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory+"audios/"+selfR.history.get("languages").get("audioName"), this.nodownload.bind(this), this.router.drupaldo(this.createMedia.bind(this),this.history.get("languages").get("audioName")));
					//window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory+"audios/"+this.model.get("audioName"), this.nodownload.bind(this), this.cagao.bind(this));
					
                    //selfR.createMedia(this.history.get("languages").get("audioName"));
					setTimeout(function() {
					   $(".ui-slider-track a").removeAttr("href");
					}, 1500); 
			
                }
	
            },
	
            backtolist: function(){
				clearInterval(this.mediaTimer);
				try{
					this.my_media.stop();
					window.plugins.insomnia.allowSleepAgain();
				}
				catch(e){}
                Backbone.history.navigate("#recycling1", {
                    trigger: true
                });
	
            },
	
            downloadAndPlay: function(){
	               
				console.log("downloadAndPlay");
				console.log(cordova.file.externalDataDirectory+"audios/"+this.model.get("audioName"));
				window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory+"audios/"+this.model.get("audioName"), this.nodownload.bind(this), this.finallydownloadAndPlay.bind(this));
	
            },
			
			
			finallydownloadAndPlay: function(){
	                
				console.log("finallydownloadAndPlay, descargamos audio");
				this.router.drupaldo(this.createMedia.bind(this),this.model.get("audioName"));
	
            },
			
			cagao: function(){
	                
				console.log("cagao");
				
	
            },
			
			
			nodownload: function(){
	                
				console.log("nodownload, fichero de audio ya existente");
				console.log(this.model);
				selfR=this;
				
				try{
					window.plugins.spinnerDialog.hide();
				}
				catch(e){
					console.log(e);
				}
				console.log("Compruebo si existe el fichero: " + cordova.file.externalDataDirectory+"audios/"+selfR.model.get("audioName"));
				selfR.my_media = new Media(cordova.file.externalDataDirectory+"audios/"+this.model.get("audioName"), selfR.mediasuccess, selfR.nada, selfR.onStatus);
				setTimeout(function() {
					selfR.preparar();
					$("#downloadAndPlay .ui-btn-text").text(selfR.history.get("languages").get("dic_play"));
					$("#downloadAndPlay").attr("id","playSoundButton");
					try{
						window.plugins.spinnerDialog.hide();
					}
					catch(e){
						console.log(e);
					}
				}, 300);
	
            },
	
            save: function (){
				clearInterval(this.mediaTimer);
                try{
                    this.my_media.stop();
					window.plugins.insomnia.allowSleepAgain();
                }
                catch(e){}
                this.model.set("answer",$(".writtingtextarea").val());
                this.model.set("tool","recycling");
                this.history.create(this.model);
                Backbone.history.navigate("#summary", {
                    trigger: true
                });
	
            },
	
            checkbox: function (){
                donot=this.history.get("donotshow");

                if($("#checkbox").attr("data-icon")=="checkbox-on") //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    donot.set("recyDoNotShow",false);
                else
                    donot.set("recyDoNotShow",true);
	
                this.history.get("donotshow").destroy();
                this.history.create(donot);
	
            },
			
			stopaudio:function(){
				clearInterval(this.mediaTimer);
				try{
                    this.my_media.stop();
					window.plugins.insomnia.allowSleepAgain();
                }
                catch(e){}
				
			},
	
            functiontovaluetovalue: function (arraytosearch, AC) {
		 
                for (var i = 0; i < arraytosearch.length; i++) {
				 
                    if (arraytosearch[i].language == AC) {
                        return arraytosearch[i].description;
                    }
                }
                return null;
            },
	
            getaudios: function(){
	
			
                var params_audios = {
                    type: 'GET',
                    dataType: 'jsonp',
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "audios.jsonp",
                    processData: true,
                    success: function(data) {
                        data.forEach(selfR.fillrecyclinglist, selfR);
						auxLang=selfR.history.get("languages");
						selfR.history.get("languages").destroy();
						auxLang.set("cachedList",data);
						selfR.history.create(auxLang)
						auxLang.save();
						auxLang.fetch();
						selfR.model.set("cachedList",true);
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
                    //console.log("audios: ", data);
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
                //console.log("params ", params);
                $.ajax(params_audios);
	
            },
			
			getaudioLI:function(ev){
			
				console.log("getaudioLI");
				console.log(ev);
				
				if(typeof $(ev.target).find("a").attr("hrefA") != "undefined"){
					var link = $(ev.target).find("a").attr("hrefA");
					this.model.set("title",$(ev.target).find("a").text().replace(/\s+/g,' ').trim());
					this.model.set("description",$(ev.target).find(".audioDesc").text().replace(/\s+/g,' ').trim());
				}
				else if(typeof $(ev.target).attr("hrefA")!= "undefined"){
					var link = $(ev.target).attr("hrefA");
					this.model.set("title",$(ev.target).text().replace(/\s+/g,' ').trim());
					this.model.set("description",$(ev.target).find(".audioDesc").text().replace(/\s+/g,' ').trim());
					}
					else if(typeof $(ev.target).parents('li').find("a").attr("hrefA") != "undefined"){
						var link = $(ev.target).parents('li').find("a").attr("hrefA");
						this.model.set("title",$(ev.target).parents('li').find("a").text().replace(/\s+/g,' ').trim());
						this.model.set("description",$(ev.target).parents('li').find(".audioDesc").text().replace(/\s+/g,' ').trim());
						}
						else
							console.log("no encuentro hrefA");
				
				if(typeof link != "undefined")
					Backbone.history.navigate(link, {
							trigger: true
					});
				
			},
	
	
            createMedia:function(audiofilename) {
				
				selfR=this;
				
				try{
					window.plugins.spinnerDialog.hide();
				}
				catch(e){
					console.log(e);
				}
	
                try{
                    if(device.platform!='Android')
                        window.plugins.spinnerDialog.show(selfR.history.get("languages").get("dic_loading"), "", function () {
                            console.log("callback");
                        });
                    else
                        window.plugins.spinnerDialog.show(selfR.history.get("languages").get("dic_loading"), "0 %", function () {
                            console.log("callback");
                        });
                }
                catch(e){
                    console.log(e);
                }

                this.progress=0;
                try{
                    var fileTransfer = new FileTransfer();
                    fileTransfer.onprogress = function(progressEvent) {
                        if (progressEvent.lengthComputable && ((progressEvent.loaded / progressEvent.total)*100)>(selfR.progress+25)) {
                            window.plugins.spinnerDialog.hide();
                            window.plugins.spinnerDialog.show(selfR.history.get("languages").get("dic_loading"), Math.round((progressEvent.loaded / progressEvent.total)*100) + " %", function () {
                                console.log("callback");
                            });
                            selfR.progress=Math.round((progressEvent.loaded / progressEvent.total)*100);
                            console.log(progressEvent.loaded / progressEvent.total);
                        }
                    };
                    var uri = encodeURI("http://hoffmanapp.indret.webfactional.com/system/files/"+audiofilename);
                    if(device.platform!='Android'){	//iOS
                        selfR.my_media = new Media(uri, selfR.mediasuccess, selfR.nada, selfR.onStatus);
                        setTimeout(function() {
                            selfR.preparar();
							$("#downloadAndPlay .ui-btn-text").text(selfR.history.get("languages").get("dic_play"));
                            $("#downloadAndPlay").attr("id","playSoundButton");
                            try{
                                window.plugins.spinnerDialog.hide();
                            }
                            catch(e){
                                console.log(e);
                            }
                        }, 300);
                    }
                    else{//Android
                        target=cordova.file.externalDataDirectory+"audios/"+audiofilename;
				
                        fileTransfer.download(
                            uri,
                            target,
                            function(entry) {
                                console.log("download complete, URL: " + entry.toURL());
                                console.log("entry: ");
                                console.log(entry);
                                url=entry.toURL();
                                selfR.my_media = new Media(url, selfR.mediasuccess, selfR.nada, selfR.onStatus);
                                setTimeout(function() {
                                    selfR.preparar();
									$("#downloadAndPlay .ui-btn-text").text(selfR.history.get("languages").get("dic_play"));
                                    $("#downloadAndPlay").attr("id","playSoundButton");
                                    try{
                                        window.plugins.spinnerDialog.hide();
                                    }
                                    catch(e){
                                        console.log(e);
                                    }
                                }, 300);
					
                            },
                            function(error) {
                                console.log("download error source " + error.source);
                                console.log("download error target " + error.target);
                                console.log("download error code" + error.code);
                                console.log("download body code: "  + error.body);
                                try{
                                    window.plugins.spinnerDialog.hide();
                                }
                                catch(e){
                                    console.log(e);
                                }
                            }
                            );
                    }
                //}
                }
		
                catch(e){
                    console.log(e);
                }

            },
	
            fillrecyclinglist:function(elemento) {
			
                selfR=this;
                console.log(selfR.languages);
			
				if(this.model.get("cachedList")){
					lista=this.$("#recyclinglist");
					console.log("using this. (cached)");
				}
				else{
					lista=$("#recyclinglist");
				}
			
                prefijo=null;
				if(elemento.language.indexOf('-') > -1){
					prefijo=elemento.language.split("-")[0];
				}
				else{
					prefijo=elemento.language.split("_")[0];
				}
                //console.log("Console: Audio type->" + elemento.audio_type + "<-Language->" + elemento.language+"<-");
                if(elemento.audio_type=="Recycling"){
                    if(elemento.language==this.history.get("languages").get("languageAC")){ //si es la lengua usada directo al principio
						if(typeof this.history.get("nodelist").get(elemento.nid) != 'undefined'){ //Si tengo el nodo descargado
							lista.prepend("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='a' class='getaudioLI getaudio ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>       <a hrefA='#getaudio" + elemento.nid + "' audioName= '" + elemento.nid + "'   data-transition='none' class='getaudio ui-link-inherit'>    <h3 class='ui-li-heading'  audioName= '" + elemento.nid + "'  >"+elemento.node_title+"</h3>       </a>       <p class='ui-li-desc audioDesc'> "+elemento.description+" </p>  <p class='ui-li-desc languagedesc'> "+ this.functiontovaluetovalue(selfR.languages,elemento.language) +" </p>    </div><span style='background-color: green;' class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>");
							}
						else{
							lista.prepend("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='a' class='getaudioLI getaudio ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>       <a hrefA='#getaudio" + elemento.nid + "' audioName= '" + elemento.nid + "'   data-transition='none' class='getaudio ui-link-inherit'>    <h3 class='ui-li-heading'  audioName= '" + elemento.nid + "'  >"+elemento.node_title+"</h3>       </a>       <p class='ui-li-desc audioDesc'> "+elemento.description+" </p>  <p class='ui-li-desc languagedesc'> "+ this.functiontovaluetovalue(selfR.languages,elemento.language) +" </p>    </div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>");
						}
                        
                        //$("#recyclinglist").listview("refresh");
                    }
                    else{
				
                        if(prefijo==this.history.get("languages").get("languageAC").split("_")[0] || prefijo==this.history.get("languages").get("languageAC").split("-")[0]){ //si comparten prefijo se añaden al final
                            if(typeof this.history.get("nodelist").get(elemento.nid) != 'undefined'){
								lista.append("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='a' class='getaudioLI ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>       <a hrefA='#getaudio" + elemento.nid + "' audioName= '" + elemento.nid + "'   data-transition='none' class='getaudio ui-link-inherit'>    <h3 class='ui-li-heading'  audioName= '" + elemento.nid + "'  >"+elemento.node_title+"</h3>       </a>       <p class='ui-li-desc audioDesc'> "+elemento.description+" </p>   <p class='ui-li-desc languagedesc'> "+this.functiontovaluetovalue(selfR.languages,elemento.language)+" </p>   </div><span style='background-color: green;' class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>");
							}
							else{
								lista.append("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='a' class='getaudioLI ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>       <a hrefA='#getaudio" + elemento.nid + "' audioName= '" + elemento.nid + "'   data-transition='none' class='getaudio ui-link-inherit'>    <h3 class='ui-li-heading'  audioName= '" + elemento.nid + "'  >"+elemento.node_title+"</h3>       </a>       <p class='ui-li-desc audioDesc'> "+elemento.description+" </p>   <p class='ui-li-desc languagedesc'> "+this.functiontovaluetovalue(selfR.languages,elemento.language)+" </p>   </div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>");
							}
                            //$("#recyclinglist").listview("refresh");
                        }
                    /*else{ //si son de otras lenguas se añaden a la lista secundaria
						$(".secondaryrec").prepend("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='a' class='getaudioLI ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'>       <a hrefA='#getaudio" + elemento.nid + "' audioName= '" + elemento.nid + "'   data-transition='none' class='getaudio ui-link-inherit'>    <h3 class='ui-li-heading'  audioName= '" + elemento.nid + "'  >"+elemento.node_title+"</h3>       </a>       <p class='ui-li-desc audioDesc'> "+elemento.description+" </p>    <p class='ui-li-desc languagedesc'> "+this.functiontovaluetovalue(selfR.languages,elemento.language) +" </p>  </div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>");
					}*/ //He comentado este bloque porque me parece innecesario añadir audios de lenguas completamente distintas y retrasa la carga de la lista
				
                    }
                }
                //$("#recyclinglist").listview("refresh");
			
            },
	
		
            vollidestart: function(){
			
                var newVol = $("#volText").val()/10;
                this.my_media.setVolume(newVol);
	
            },
	
            mediasuccess: function(e){
                console.log("new media success");
                console.log(e);
            },
	
            nada: function(e){
	
                console.log("nada: ", e.message + "<-");
            //console.log(e.message);
	
            },
	
            onStatus: function(e){
                console.log(e);
            },
	
            preparar2: function(){
                selfR=this;
                //selfR.preparar();
                setTimeout(function() {
                    selfR.preparar();
                }, 1500);
			
	
            },
	
            recslidestart:function() {
			
                selfR.isSeeking=true;
                console.log("recslidestart");
                var newPos = parseInt($("#songPosition").val(), 10);
                var newMins = Math.floor(newPos/60,10);
                var newSecs = newPos - newMins*60;
                $("#songPosition").data("seekTime", newMins + ":" + (newSecs > 9 ? newSecs : "0"+newSecs))
            },
	
            recslidestop:function() {
	
                selfR.isSeeking=false;
                console.log("recslidestop, seekTo: " + parseInt($("#songPosition").val(), 10));
                this.my_media.seekTo(parseInt($("#songPosition").val(), 10)*1000);
                var newPos = parseInt($("#songPosition").val(), 10);
                var newMins = Math.floor(newPos/60,10);
                var newSecs = newPos - newMins*60;
                $("#songPosition").data("seekTime", newMins + ":" + (newSecs > 9 ? newSecs : "0"+newSecs))
            },
	
            preparar: function(){
	
                selfR=this;
                var dur = this.my_media.getDuration();
                console.log(dur);
                if(isNaN(dur)){
                    $("#songPosition").slider("disable");
                } else {
                }
                var vol = 10;
                if(dur<50){//coger el dur
                    console.log("dur menor que 50, asignandole 100");
                    dur=597;
                }
                $("#songPosition").attr("max", dur);
                $("#volText").val(vol);
                $("#curText").val("0:00");
                selfR.isSeeking=false;
                this.durflag=true;
                this.my_media.play();
                this.my_media.stop();
                this.mediaTimer = setInterval(function () {
	
                    if(this.durflag){
                        var dur = this.my_media.getDuration();//coger el dur
                        if(dur!=-1){
                            console.log("DURACION ACTUALIZADA");
                            $("#songPosition").attr("max", dur);
                            this.durflag=false;
                        }
                    }
			
                    selfR.my_media.getCurrentPosition(
                        // success callback
                        function (position) {
                            if (position > -1) {
                                console.log("position: " + position);
                                selfR.position=Math.round(position);
                                var cur = selfR.position;
                                var curMins = Math.floor(cur/60,10);
                                var curSecs = Math.round(cur - curMins*60);
                                if(selfR.isSeeking){
                                    console.log("is seeking and slider is: " + $("#songPosition").data("seekTime"));
                                    $("#songCurrentTime").html($("#songPosition").data("seekTime"));
                                } else {
                                    //console.log("isnt seeking and song time is: " + cur);
                                    $("#songCurrentTime").html(curMins + ":" + (curSecs > 9 ? curSecs : "0"+curSecs));//funciona
                                    $('#songPosition').val(cur);
                                }
                                $("#songPosition").slider("refresh");

                            }
                        },
                        // error callback
                        function (e) {
                            console.log("Error getting pos=" + e);
                        }
                        );
                }, 1000);
	
		
            },
	
            playfun: function(){
	
                selfR=this;

                try{
                    var dur = this.my_media.getDuration();
                }
                catch(e){
                    console.log(e);
                }
                console.log("Play clicked and Audio Duration is " + dur);
                if(dur>0)
                    $("#songPosition").attr("max", dur);
                if(!this.audioplaying){
                    try{
                        this.my_media.play();
						window.plugins.insomnia.keepAwake();
                    }
                    catch(e){}
                    this.audioplaying=true;
                    $("#playSoundButton .ui-btn-text").text(selfR.history.get("languages").get("dic_playing"));
                } else {
                    this.my_media.pause();
                    this.audioplaying=false;
                    $("#playSoundButton .ui-btn-text").text(selfR.history.get("languages").get("dic_paused"));
                }
                $("#playSoundButton").button('refresh');
                if(isNaN(this.my_media.getDuration())){
                    console.log("Playing did not set Duration, still NaN.");
                } else {
                    console.log("Play clicked and Audio Duration is " + this.my_media.getDuration());
                    if(isNaN(dur)){
                        dur = this.my_media.getDuration();
                        //dur=75;
                        $("#songPosition").attr("max", dur);
                        $("#songPosition").slider("enable");
                    }
                }

            }
	

        });

        return recyclingView;
    });
