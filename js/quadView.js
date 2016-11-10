

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/quad0.html',
    'text!../Templates/quad1.html',
    'text!../Templates/quad2.html',
    'text!../Templates/quad3.html',
    'text!../Templates/quad4.html',
    'text!../Templates/quad5.html',
    'text!../Templates/quadhistory.html',
    'text!../Templates/quadAudioHistory.html',
    'text!../Templates/summary.html',
    'quadModel',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, quad0, quad1, quad2, quad3, quad4, quad5, quadhistory, quadAudioHistory, summary, quadModel, headerandpanel){



        quadView = Backbone.View.extend({
  
            events:{
	
                "keyup"  : "emptyfieldcheck",
                "click .resetmodel":"resetmodel",
                "click #quadInput7":"extraespacio",
                "click .mandatory":"footerfix",
                "click .donotshowagain":"checkbox",
                "click .save":"save",
				"click .stopaudio":"stopaudio",
                "click .saveQuad":"saveQuad",
                "click #playSoundButton":"playfun",
                "click .backtolist":"backtolist",
                "click #downloadAndPlay":"downloadAndPlay",
                "slidestart #songPosition":"recslidestart",
                "slidestop #songPosition":"recslidestop",
                "slidestop #volText":"vollidestart",
                "click .backhistory":"backhistory"
	
            },
	
            render: function(id, historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
                this.history=historycollection;
				this.router=router;
                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( quad0 );
		
                        break;
                    case '1':
                        if(this.model.get("version")=="Spoken"){
                            compiledTemplate = _.template( quad5);
                        }
                        else{
                            compiledTemplate = _.template( quad1);
                        }
                        break;
                    case '2':
                        compiledTemplate = _.template( quad2);
                        if($('#quadInput1').val()!=undefined){
                            this.model.set({  //estos if ya no son necesarios tras la desactivación de los botones next si no hay texto
                                answer1:$('#quadInput1').val(),
                                answer2:$('#quadInput2').val()
                            });
                        }
                        this.model.set("finished", false); //en este punto el modelo queda marcado como sin terminar
                        this.savemodel();
			
	
                        break;
                    case '3':
                        compiledTemplate = _.template( quad3 );
                        if($('#quadInput3').val()!=undefined){
                            this.model.set({
                                answer3:$('#quadInput3').val(),
                                answer4:$('#quadInput4').val()
                            });
                        }
                        this.savemodel();
                        break;
                    case '4':
                        compiledTemplate = _.template( quad4 );
                        if($('#quadInput5').val()!=undefined){
                            this.model.set({
                                answer5:$('#quadInput5').val(),
                                answer6:$('#quadInput6').val(),
                                answer7:$('#quadInput7').val()
                            });
                        }
                        this.savemodel();
                        break;
                    case '5':
                        compiledTemplate = _.template( quadhistory );
                        this.changefinishbutton=true;
                        if($('#quadInput8').val()!=undefined){
                            this.model.set({
                                answer8:$('#quadInput8').val(),
                                answer9:$('#quadInput9').val()
                            });
                        }
                        this.savemodel();
			
                        break;
			
                }
			
			
			
                if(id>9){
                    historyindex=id-20;
                    this.model= historycollection.at(historyindex);
                    if(this.model.get("version")=="Spoken"){
                        compiledTemplate = _.template( quadAudioHistory );
                    }
                    else
                        compiledTemplate = _.template( quadhistory );
                }
                var self=this;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_quad_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
                if(this.changefinishbutton==true){
		
                    this.$('.botonstart').text(historycollection.get("languages").get("dic_finish"));
                    this.$('.botonstart').attr("class","botonstart saveQuad");
	
                }
	
                this.historicAudiodownloaded = historycollection.get("languages").get("quadAudioDownloaded");
				console.log("El quad audio en local es: " + this.historicAudiodownloaded);
	
			
                var next="enabled";

                this.$( ".mandatory" ).each(function() {
			
                    if($(this).val()==""){
                        next="disabled";
					
                    }

                });
		
		
                if(id=='1' && this.model.get("version")=="Spoken"){
		
                    this.audioplaying=false;
                    this.$(".panelbutton").hide();
                    this.$(".dic_help").hide();
                    console.log("this.history.get('languages').get('quadAudioNID'): " +this.history.get("languages").get("quadAudioNID"));
                    
                    
					var self=this;
					var AUDIO_NID = this.history.get("languages").get("quadAudioNID");
					var params_audio_node = {
						type: 'GET',
						dataType: 'jsonp',
						url: "http://hoffmanapp.indret.webfactional.com/hoffapp/" + "node/" + AUDIO_NID + ".jsonp",
						processData: true,
						success: function(data) {
							console.log("Tengo el Quad audioName");
							console.log("audio node filename:->"+ data.field_audio.und[0].filename+ "<-");
							self.model.set("audioName",data.field_audio.und[0].uri.split("private://")[1]);
							self.getAudio(data.field_audio.und[0].uri.split("private://")[1]);
							
							
						},
						error: function(code) {
							console.log("petada", code);
						}
					};
					//console.log("params ", params_audio_node);
					
					if(this.historicAudiodownloaded == "no"){ //Hay que descargar el audio
						$.ajax(params_audio_node);
					}
					else{ //Tenemos el audio en local
						console.log("nodownload, fichero de audio ya existente");
						console.log(this.model);
						selfR=this;
						
						try{
							window.plugins.spinnerDialog.hide();
						}
						catch(e){
							console.log(e);
						}
						console.log("Compruebo si existe el fichero: " + cordova.file.externalDataDirectory+"audios/"+historycollection.get("languages").get("quadAudioDownloaded"));
						target="";
						
						if(device.platform!='Android'){	//iOS
							console.log("Mi plataforma es: " + device.platform);
							target=cordova.file.documentsDirectory+"audios/";
						 }
						 else{
							 target=cordova.file.externalDataDirectory+"audios/";
						 }
						selfR.my_media = new Media(target+historycollection.get("languages").get("quadAudioDownloaded"), selfR.mediasuccess, selfR.nada, selfR.onStatus);
						setTimeout(function() {
							selfR.preparar();
							$("#downloadAndPlay .ui-btn-text").text(historycollection.get("languages").get("dic_play"));
							$("#downloadAndPlay").attr("id","playSoundButton");
							try{
								window.plugins.spinnerDialog.hide();
							}
							catch(e){
								console.log(e);
							}
						}, 300);
						
					}
					
					setTimeout(function() {
					   $(".ui-slider-track a").removeAttr("href");
					}, 1500); 
		
                }
		
		
                if(next=="disabled"){
                    this.$('#botonnext').attr("style","opacity: 0.5");
                    this.$('#botonnext').attr("class","botonnext ui-disabled");
                }
                else {
                    this.$('#botonnext').attr("style","opacity: 1");
                    this.$('#botonnext').attr("class","botonnext");
                }
				
                if(id==5){
	
                    this.$('#quadInput1').text(this.model.get("answer1"));
                    this.$('#quadInput2').text(this.model.get("answer2"));
                    this.$('#quadInput3').text(this.model.get("answer3"));
                    this.$('#quadInput4').text(this.model.get("answer4"));
                    this.$('#quadInput5').text(this.model.get("answer5"));
                    this.$('#quadInput6').text(this.model.get("answer6"));
                    this.$('#quadInput7').text(this.model.get("answer7"));
                    this.$('#quadInput8').text(this.model.get("answer8"));
                    this.$('#quadInput9').text(this.model.get("answer9"));
	
                }
	
                if(id>9){
                    if(this.model.get("version")=="Spoken"){	
						this.$(".panelbutton").hide();
						this.$(".dic_help").hide();
						setTimeout(function() {
						   $(".ui-slider-track a").removeAttr("href");
						}, 1500); 
                    }
                    else{
                        this.$('#quadInput1').text(historycollection.at(historyindex).get("answer1"));
                        this.$('#quadInput2').text(historycollection.at(historyindex).get("answer2"));
                        this.$('#quadInput3').text(historycollection.at(historyindex).get("answer3"));
                        this.$('#quadInput4').text(historycollection.at(historyindex).get("answer4"));
                        this.$('#quadInput5').text(historycollection.at(historyindex).get("answer5"));
                        this.$('#quadInput6').text(historycollection.at(historyindex).get("answer6"));
                        this.$('#quadInput7').text(historycollection.at(historyindex).get("answer7"));
                        this.$('#quadInput8').text(historycollection.at(historyindex).get("answer8"));
                        this.$('#quadInput9').text(historycollection.at(historyindex).get("answer9"));
                    }
                }

	
            },
	
            saveQuad: function(){
	
                this.model.set("finished", true);
                this.savemodel();
                Backbone.history.navigate("#summary", {
                    trigger: true
                });
		
            },
			
	
            downloadAndPlay: function(){
                var self=this;
                if(this.historicAudiodownloaded=="no"){ //download
                    try{
                        window.plugins.spinnerDialog.show(self.history.get("languages").get("dic_loading"), "", function () {
                            console.log("callback");
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
					this.router.drupaldo(this.getAudio.bind(this),this.model.get("audioName"));
                    //this.getAudio(this.model.get("audioName"));
                }
				else{
					console.log("nodownload, fichero de audio ya existente");
					console.log(this.model);
					selfR=this;
					
					try{
						window.plugins.spinnerDialog.hide();
					}
					catch(e){
						console.log(e);
					}
					console.log("Compruebo si existe el fichero: " + cordova.file.externalDataDirectory+"audios/"+historycollection.get("languages").get("quadAudioDownloaded"));
					target="";
					
					if(device.platform!='Android'){	//iOS
						console.log("Mi plataforma es: " + device.platform);
						target=cordova.file.documentsDirectory+"audios/";
					 }
					 else{
						 target=cordova.file.externalDataDirectory+"audios/";
					 }
					selfR.my_media = new Media(target+historycollection.get("languages").get("quadAudioDownloaded"), selfR.mediasuccess, selfR.nada, selfR.onStatus);
					setTimeout(function() {
						selfR.preparar();
						$("#downloadAndPlay .ui-btn-text").text(historycollection.get("languages").get("dic_play"));
						$("#downloadAndPlay").attr("id","playSoundButton");
						try{
							window.plugins.spinnerDialog.hide();
						}
						catch(e){
							console.log(e);
						}
					}, 300);
				}
            },
	
            backtolist: function(){
	
                try{
                    this.my_media.stop();
                }
                catch(e){}
                Backbone.history.navigate("#summary", {
                    trigger: true
                });
	
            },
	
            backhistory: function(){
	
                Backbone.history.navigate("#historyload", {
                    trigger: true
                });
	
            },
	
            getAudio:function(audiofilename) {
				
				

                var self=this;
                this.progress=0;
                try{
                    var fileTransfer = new FileTransfer();
                    fileTransfer.onprogress = function(progressEvent) {
                        if (progressEvent.lengthComputable && ((progressEvent.loaded / progressEvent.total)*100)>(self.progress+25)) {
                            window.plugins.spinnerDialog.hide();
                            window.plugins.spinnerDialog.show(self.history.get("languages").get("dic_loading"), Math.round((progressEvent.loaded / progressEvent.total)*100) + " %", function () {
                                console.log("callback");
                            });
                            self.progress=Math.round((progressEvent.loaded / progressEvent.total)*100);
                            console.log(progressEvent.loaded / progressEvent.total);
                        }
                    };
                    var uri = encodeURI("http://hoffmanapp.indret.webfactional.com/system/files/"+audiofilename);
                    
					target = "";
					
					if(device.platform!='Android'){	//iOS
						console.log("Mi plataforma es: " + device.platform);
						target=cordova.file.documentsDirectory+"audios/"+audiofilename;
					 }
					 else{
						 target=cordova.file.externalDataDirectory+"audios/"+audiofilename;
					 }
			
					fileTransfer.download(
						uri,
						target,
						function(entry) {
							console.log("download complete, URL: " + entry.toURL());
							console.log("entry: ");
							console.log(entry);
							url=entry.toURL();
							
							//guardamos el nombre del quadAudio
							auxlanguages = self.history.get("languages");
							self.history.get("languages").destroy();
							auxlanguages.set("quadAudioDownloaded",audiofilename);
							auxlanguages.save();
							self.history.create(auxlanguages);
							
							self.my_media = new Media(url, self.mediasuccess, self.nada, self.onStatus);
							setTimeout(function() {
								
								self.preparar();
								$("#downloadAndPlay .ui-btn-text").text(self.history.get("languages").get("dic_play"));
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
                    
                //}
                }
		
                catch(e){
                    console.log(e);
                }

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
	
                console.log("nada: ", e);
            //console.log(e.message);
	
            },
	
            onStatus: function(e){
                console.log(e);
            },
	
            preparar2: function(){
                var self=this;
                //self.preparar();
                setTimeout(function() {
                    self.preparar();
                }, 1500);
			
	
            },
	
            recslidestart:function() {
				var self=this;
                self.isSeeking=true;
                console.log("recslidestart");
                var newPos = parseInt($("#songPosition").val(), 10);
                var newMins = Math.floor(newPos/60,10);
                var newSecs = newPos - newMins*60;
                $("#songPosition").data("seekTime", newMins + ":" + (newSecs > 9 ? newSecs : "0"+newSecs))
            },
	
            recslidestop:function() {
				var self=this;
                self.isSeeking=false;
                console.log("recslidestop, seekTo: " + parseInt($("#songPosition").val(), 10));
                this.my_media.seekTo(parseInt($("#songPosition").val(), 10)*1000);
                var newPos = parseInt($("#songPosition").val(), 10);
                var newMins = Math.floor(newPos/60,10);
                var newSecs = newPos - newMins*60;
                $("#songPosition").data("seekTime", newMins + ":" + (newSecs > 9 ? newSecs : "0"+newSecs))
            },
	
            preparar: function(){
	
                var self=this;
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
                self.isSeeking=false;
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
			
                    self.my_media.getCurrentPosition(
                        // success callback
                        function (position) {
                            if (position > -1) {
                                console.log("position: " + position);
                                self.position=Math.round(position);
                                var cur = self.position;
                                var curMins = Math.floor(cur/60,10);
                                var curSecs = Math.round(cur - curMins*60);
                                if(self.isSeeking){
                                    console.log("is seeking and slider is: " + $("#songPosition").data("seekTime"));
                                    $("#songCurrentTime").html($("#songPosition").data("seekTime"));
                                } else {
                                    console.log("isnt seeking and song time is: " + cur);
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
	
                var self=this;

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
                    }
                    catch(e){}
                    this.audioplaying=true;
                    $("#playSoundButton .ui-btn-text").text(self.history.get("languages").get("dic_playing"));
                } else {
                    this.my_media.pause();
                    this.audioplaying=false;
                    $("#playSoundButton .ui-btn-text").text(self.history.get("languages").get("dic_paused"));
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

            },
			
			stopaudio:function(){
				clearInterval(this.mediaTimer);
				try{
                        this.my_media.stop();
				}
				catch(e){
					console.log(e);
				}
				
			},
	
            save: function (){
	
                this.model.set("tool","quad");
		
                if(this.model.get("version")=="Spoken"){
					clearInterval(this.mediaTimer);
                    try{
                        this.my_media.stop();
                    }
                    catch(e){
                        console.log(e);
                    }
                    this.model.set("answer",$(".writtingtextarea").val());
                }
                else{
                    this.model.set("answer1",$("#quadInputS").val());
                }
		
                this.history.create(this.model);
                Backbone.history.navigate("#summary", {
                    trigger: true
                });
            },
	
            checkbox: function (){
                donot=this.history.get("donotshow");

                if($("#checkbox").attr("data-icon")=="checkbox-on") //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    donot.set("quadDoNotShow",false);
                else
                    donot.set("quadDoNotShow",true);
	
                this.history.get("donotshow").destroy();
                this.history.create(donot);
	
            },
	
            extraespacio: function (){
	
                if(device.platform=='Android'){
                    $('#keyspace').attr('style','visibility: hidden;');
                }
            },

	
            footerfix: function (){
	
                if(device.platform=='Android'){
                    setTimeout(function(){
                        $("div[data-role='footer']").attr('class', 'ui-footer ui-bar-a ui-footer-fixed slideup ui-panel-content-fixed-toolbar ui-panel-content-fixed-toolbar-closed');
                    },1500);
                }
            },
	
            emptyfieldcheck: function (){
	
                var next="enabled";
		
                setTimeout(function(){
                    $( ".mandatory" ).each(function() {
                        if($(this).val()==""){
                            next="disabled";
                        }

                    });
			
                    if(next=="disabled"){
                        $('#botonnext').attr("style","opacity: 0.5");
                        $('#botonnext').attr("class","botonnext ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-right ui-btn-up-a ui-disabled");
                    }
                    else {
                        $('#botonnext').attr("style","opacity: 1");
                        $('#botonnext').attr("class","botonnext ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-right ui-btn-up-a");
                    }
                },50);
		
		
            },
	
            savemodel: function (){
	
                this.model.set("tool", "quad");
                this.history.create(this.model);
		
            },
	
            model:quadModel

        });

        return quadView;
    });
