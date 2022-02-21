

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'bashackerModel',
    'text!Templates/bashacker0.html',
    'text!Templates/bashacker1.html',
    'text!Templates/bashackerhistory.html',
    'historyModel',
    'paper',
    'text!Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, bashackerModel, bashacker0, bashacker1, bashackerhistory, historyModel, paper, headerandpanel){



        bashackerView = Backbone.View.extend({
   
            events:{
                "click #startshacking":"startshacking",
                "click .donotshowagain":"checkboxevt",
                "click .cancelac":"cancelaccelerometer"
            },
   
            render: function(id,historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
				
				self=this;

                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( bashacker0 );
						
						setTimeout(function(){
						$('#checkboxes1').change(function() {
								console.log("Change");
								self.checkboxevt();
							});
						},400);	
		
                        break;
                    case '1':
                        compiledTemplate = _.template( bashacker1 );
                        this.flagmonitor = true;
                        break;
                    case '2':
			 
                        break;
                }
			
                if(id>9){
                    historyindex=id-20;
                    compiledTemplate = _.template( bashackerhistory );
                    this.model= historycollection.at(historyindex);
                }
		
                this.history=historycollection;
                var self=this;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_bash_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
	
                var self=this;
                if(id=='1'){
                    this.$("#journaltext").text(this.model.get("target"));
                    this.$(".panelbutton").hide();
                    this.$(".dic_help").hide();
   
                    $(document).one('pageshow', function (event, ui) {
						try{
							window.plugins.insomnia.keepAwake();
						}
						catch(e){}
                        self.startshacking();
						try{
							navigator.notification.confirm(self.history.get("languages").get("dic_bash_startshacking"), function(indexans){}, self.history.get("languages").get("dic_Hoffman"),[self.history.get("languages").get("dic_next")]);
						}
						catch(e){
							console.log(e);
						}
			
                    });
		
                    try{
                        var url = "http://appv2.hoffman-international.com/sites/default/files/TaDa.mp3";
                        console.log("url: " + url);
                        self.my_media = new Media("http://appv2.hoffman-international.com/sites/default/files/TaDa.mp3", self.mediasuccess, self.nada, self.onStatus);
                    }
                    catch(e){
                        console.log("Intento de cargar media en PC fallido");
                    }
		
		
		
                }

	
            },
	
            checkboxevt: function (){
                donot=this.history.get("donotshow");

                if($("#checkbox").attr("data-icon")=="checkbox-on") //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    donot.set("bashDoNotShow",false);
                else
                    donot.set("bashDoNotShow",true);
	
                this.history.get("donotshow").destroy();
                this.history.create(donot);
	
            },
	
            mediasuccess: function(){
                console.log("new media success");
            },
	
            nada: function(e){
                console.log(e);
            },
	
            onStatus: function(e){
                console.log(e);
            },
	
            startshacking: function(){
                var self= this;
	
                $(function() {
                    $(".meter > span").each(function() {
                        $(this)
                        .data("origWidth", "0%")
                        .animate({
                            width: $(this).data("origWidth")
                        }, 1);
                    });
                });
	
                if(this.flagmonitor){


                    $(".meter").show();
		

	
		
                    var options = {
                        frequency: 500
                    };  // MS, Update every 0.5 second
                    var self=this;
                    try{
                        this.watchID = navigator.accelerometer.watchAcceleration(function(acceleration){
                            self.accelerationsuccess(acceleration);
                        }, function(){
                            alert('Could not use the accelerometer');
                        }, options);
                    }
                    catch(err){
                        self.model.set("tool", "bashaker");
                        self.history.create(this.model);
                        self.bashBarInterval=setInterval(function(){
                            self.renderbar(9);
                        },500); //instrucción debug
                        console.log(err);
                    }
                    //navigator.accelerometer.getCurrentAcceleration(function(acceleration){self.accelerationsuccess(acceleration);}, function(){alert('Could not use the accelerometer');});
		
                    this.flagmonitor=false;
                    this.currentVal=0;
		
                }
            },
	
            accelerationsuccess: function(acceleration){
	
                var total= (Math.abs(Math.round(acceleration.x* 100) / 100) + Math.abs(Math.round(acceleration.y* 100) / 100) + Math.abs(Math.round(acceleration.z* 100) / 100))/3;
	
	
		 
                this.renderbar(total);
	

	

            },
	
            cancelaccelerometer: function(option){
                var self=this;
                try {
					window.plugins.insomnia.allowSleepAgain();
                    navigator.accelerometer.clearWatch(self.watchID);
                }
                catch(err){
                    console.log(err);
                }
                console.log("accelerometer stopped");
                if(option==1){}
                else
                    Backbone.history.navigate("#summary", {
                        trigger: true
                    });
                this.flagmonitor=true;
	
            },
	
		
	
            renderbar: function(acceleration){
                var self=this;
                if(this.model.get("difficulty")==1)//Dificultad normal
                    var factor=3;
                else
                    var factor=1.5;	//el factor es de puntuación, cuanto más alto más rápido se completa la tool
                if(acceleration>12) this.nextVal=this.currentVal+3.5*factor;
                else if(acceleration>10.5) this.nextVal=this.currentVal+3*factor;
                else if(acceleration>8.8) this.nextVal=this.currentVal+2.5*factor;
                else if(acceleration>7.3) this.nextVal=this.currentVal+1.5*factor;
                else if(acceleration>6.3) this.nextVal=this.currentVal;
                else if(acceleration>4.3) this.nextVal=this.currentVal-1*factor;
                else this.nextVal=this.currentVal-0.50*factor;
                this.currentVal=this.nextVal;
                if(this.currentVal<0) this.currentVal=0;
	
                if(this.currentVal>=100){ //bashaker done
                    this.currentVal=100;
                    this.cancelaccelerometer(1);
                    clearInterval(self.bashBarInterval);
                    try{
                        navigator.notification.vibrate(2500);
                    }
                    catch(e){}

                    try{
                        this.my_media.play();
						window.plugins.insomnia.allowSleepAgain();
                    }
                    catch(e){}

                    $('#journaltext').text(this.history.get("languages").get("dic_bash_p0_congrats"));
                    setTimeout(function(){
                        $(".meter span").attr("style","-webkit-border-top-right-radius: 20px; -webkit-border-bottom-right-radius: 20px; width:100%");
                    },400);
                    setTimeout(function(){
                        $(".meter span").attr("style","-webkit-border-top-right-radius: 20px; -webkit-border-bottom-right-radius: 20px; width:100%");
                    },800);
                    setTimeout(function(){
                        $("#botonnext").show();
                        $("#exitbash").hide();
                    },400);
                    this.model.set("tool", "bashaker");
                    this.history.create(this.model);
		
                    for(blinks=0;blinks<12;blinks++) {
                        $('.bashakergratz').fadeOut(500);
                        $('.bashakergratz').fadeIn(500);
                    }
                }
                else{
                    this.nextValrounded=Math.round(this.currentVal); //progreso de 0 a 100
                    if(this.nextValrounded>76) $(".meter").attr("class","meter");
                    else if (this.nextValrounded>43) $(".meter").attr("class","meter orange");
                    else $(".meter").attr("class","meter red");
                    this.valpercent=this.nextValrounded+"%";
                }
	
	
                $(function() {
                    $(".meter > span").each(function() {
                        $(this)
                        .data("origWidth", self.valpercent)
                        .animate({
                            width: $(this).data("origWidth")
                        }, 500);
                    });
                });
	
            }


        });

        return bashackerView;
    });