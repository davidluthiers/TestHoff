

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'bashackerModel',
    'historyModel',
    'paper',
    'jquerymobile'
  
    ], function($, _, Backbone, bashackerModel, historyModel, paper){
		
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
				
				bashacker0 = " <div data-role='content'> 	<div class='hojacuaderno'>    <div class='headerhojacuaderno bashacker' data-role='header'>        <h3>          <%= dic_bash_header %>        </h3>       </div> 	  <div data-role='content'>    <div data-controltype='textblock'>       <p class='primerPcuaderno'>        <span >         <%= dic_bash_p0_text1 %>         </span>       </p>      </div>     <div id='checkboxes1' data-role='fieldcontain' data-controltype='checkboxes' class='donotshowagain'>      <fieldset data-role='controlgroup' data-type='vertical'>       <input id='checkbox1' data-theme='b' name='' type='checkbox' />       <label id='checkbox' for='checkbox1'>        <%= dic_donotshow %>       </label>      </fieldset>     </div>      </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' rel='external' data-transition='none' href='#bashacker3'>     <%= dic_start %>    </a>     </div>";
				bashacker1 = " <div data-role='content'> 	<div class='hojacuaderno'>    <div class='headerhojacuaderno bashacker' data-role='header'>        <h3>          <%= dic_bash_header %>        </h3>       </div> 	  <div data-role='content'> 	  <div id='journalcenter' style='margin-left:auto; margin-right:auto; width:100%;'> 		<p id='journaltext' class='bashakergratz' ></p> 	  </div>   	  <div class='meter' style='display: none;'> 			<span style='width: 0% -webkit-keyframes move {0% { background-position: 0 0; }100% { background-position: 50px 50px;  }};'> 			<div class='interanim'> </div> 			</span> 			<!--<img class='bate' src='bate1.png' alt='' /> --> 		</div> 		    <a id='startshacking' style='visibility: hidden; height:6em;' data-role='button' data-transition='none'>     <%= dic_start %>    </a>    </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>    <a id='exitbash' class='botonprev cancelac' data-role='button' data-transition='none' data-icon='arrow-l'>     <%= dic_exit %>    </a>    <a id='botonnext' class='botonnext' data-role='button' data-transition='none' href='#summary' style='display:none;' data-icon='arrow-r' data-iconpos='right'>     <%= dic_done %>    </a>     </div>";
				bashackerhistory = " <div data-role='content'> 	<div class='hojacuaderno'>    <div class='headerhojacuaderno bashacker' data-role='header'>        <h3>          <%= dic_bash_header %>        </h3>       </div> 	  <div data-role='content'> 	 <p class='bashakerhistory'><%= target %></p>      </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>    <a class='botonprev' data-role='button' data-transition='none' href='#summary' data-icon='arrow-l'>     <%= dic_back %>    </a>     </div>";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='share_link' href='#share_link' class='transfer toolbutton'>                 <%= dic_share_link %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";
				
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