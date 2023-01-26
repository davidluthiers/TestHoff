

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'quadModel',
    'jquerymobile'
  
    ], function($, _, Backbone, quadModel){

        quadView = Backbone.View.extend({
  
            events:{
	
                "keyup"  : "emptyfieldcheck",
                "click .resetmodel":"resetmodel",
                "click #quadInput7":"extraespacio",
                "click .mandatory":"footerfix",
                "click .donotshowagain":"checkboxevt",
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
				
				quad0 = "<div data-role='content'>    <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno headerquad' data-role='header'>        <h3>        <%= dic_quad_header %>        </h3>       </div> 	  <div id='agujeroscuaderno'>      <img class='agujero1' src='img/agujero-01.png'></img>     <img class='agujero2' src='img/agujero-01.png'></img>  </div>     <div data-role='content'>      <div data-controltype='textblock'>       <p class='primerPcuaderno'>        <span >        <%= dic_quad_p0_text1 %>         </span>       </p>      </div>      <div id='checkboxes1' data-role='fieldcontain' data-controltype='checkboxes' class='donotshowagain'>       <fieldset data-role='controlgroup' data-type='vertical'>        <input id='checkbox1' name='' data-theme='b' type='checkbox' />        <label id='checkbox' for='checkbox1'>         <%= dic_donotshow %>        </label>       </fieldset>      </div>     </div>    </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#quadcheck1'>     <%= dic_quad_p0_startbutton  %>    </a>     </div>";
				quad1 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno headerquad' data-role='header'>        <h2>         <%= dic_quad_header %>        </h2>       </div>    <div data-role='content'>    <label class='fasequad'> <%= dic_quad_p1_title %> </label>    <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno'>     <label for='quadInput1'>      <%= dic_quad_p1_text1 %>     </label>     <textarea name='' id='quadInput1' class='mandatory' placeholder=''><%= answer1 %></textarea>    </div>    <div data-role='fieldcontain' data-controltype='textarea'>     <label for='quadInput2'>      <%= dic_quad_p1_text2 %>     </label>     <textarea name='' id='quadInput2' class='mandatory' placeholder='<%= dic_quad_p1_placeholder2 %>'><%= answer2 %></textarea>    </div>    </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>    <a id='botonnext' class='botonnext ui-disabled' data-role='button' data-transition='none' href='#quadcheck2' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>   ";
				quad2 = " <div data-role='content'>   <div class='hojacuaderno'>       <div class='headerhojacuaderno headerquad' data-role='header'>        <h3>         <%= dic_quad_header %>        </h3>       </div>    <div data-role='content'>    <label class='fasequad'> <%= dic_quad_p2_title %>  </label>    <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno'>     <label for='quadInput3'>      <%= dic_quad_p2_text1 %>     </label>     <textarea name='' id='quadInput3' class='mandatory' placeholder=''><%= answer3 %></textarea>    </div>    <div data-role='fieldcontain' data-controltype='textarea'>     <label for='quadInput4'>      <%= dic_quad_p2_text2 %>     </label>     <textarea name='' id='quadInput4' class='mandatory' placeholder='<%= dic_quad_p2_placeholder2 %>'><%= answer4 %></textarea>    </div>    </div>   </div>   </div>  <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#quadcheck1' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a id='botonnext' class='botonnext' data-role='button' data-transition='none' href='#quadcheck3' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>   ";
				quad3 = "<div data-role='content'> <div class='hojacuaderno'>       <div class='headerhojacuaderno headerquad' data-role='header'>        <h3>         <%= dic_quad_header %>        </h3>       </div>    <div data-role='content'>    <label class='fasequad'> <%= dic_quad_p3_title %> </label>     <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno'>      <label for='quadInput5'>       <%= dic_quad_p3_text1 %>      </label>      <textarea name='' id='quadInput5' class='mandatory' placeholder=''><%= answer5 %></textarea>     </div>     <div data-role='fieldcontain' class='noborder primerLcuaderno' data-controltype='textarea'>      <label for='quadInput6'>       <%= dic_quad_p3_text2 %>      </label>      <textarea name='' id='quadInput6' class='mandatory' placeholder='<%= dic_quad_p3_placeholder2 %>'><%= answer6 %></textarea>     </div>     <div data-role='fieldcontain' data-controltype='textarea'>      <label for='quadInput7'>       <%= dic_quad_p3_text3 %>      </label>      <textarea name='' id='quadInput7' class='mandatory' placeholder='<%= dic_quad_p3_placeholder3 %>'><%= answer7 %></textarea>     </div>    </div>    <a id='keyspace' style='display:none;' data-role='button' data-transition='none'>Start</a>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#quadcheck2' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a id='botonnext' class='botonnext' data-role='button' data-transition='none' href='#quadcheck4' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>   ";
				quad4 = "<div data-role='content'>    <div class='hojacuaderno'>    <div class='headerhojacuaderno headerquad' data-role='header'>        <h3>          <%= dic_quad_header %>        </h3>       </div> 	  <div data-role='content'> 	  <label class='fasequad'> <%= dic_quad_p4_title %> </label>     <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno'>      <label for='quadInput8'>       <%= dic_quad_p4_text1 %>      </label>      <textarea name='' id='quadInput8' class='mandatory' placeholder=''><%= answer8 %></textarea>     </div>     <div data-role='fieldcontain' data-controltype='textarea'>      <label for='quadInput9'>        <%= dic_quad_p4_text2 %>      </label>      <textarea name='' id='quadInput9' class='mandatory' placeholder='<%= dic_quad_p4_placeholder2 %>'><%= answer9 %></textarea>     </div>     </div>    </div>    </div>    <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev debugtrigger' data-role='button' data-transition='none' href='#quadcheck3' data-icon='arrow-l'>     <%= dic_prev %>    </a> 		<a id='botonnext' class='botonnext quadcommit' data-role='button' data-transition='none' rel='external' href='#quadcheck5' data-icon='check' data-iconpos='right'>     <%= dic_next %>    </a>     </div>   ";
				quad5 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno headerquad' data-role='header'>        <h2>         <%= dic_quad_header %>        </h2>       </div>    <div data-role='content'>    <label class='fasequad'> <%= dic_quad_p5_title %> </label>    <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno writtingarea'>     <label for='quadInputS'>      <%= dic_quad_pS_text1 %>     </label>     <textarea class='writtingtextarea' rows='9' name='' id='quadInputS' class='mandatory' placeholder='<%= dic_quad_pS_placeholder1 %>'><%= answer1 %></textarea>    </div>    <div data-role='content' class='sinmargin'> 	        <a id='playSoundButton' class='colorverde' data-role='button' data-mini='true'> 	 	 <span class='ui-btn-text'><%= dic_play %></span>     	 </a>      <div data-role='content' class='sinmargin'> 	       <h3 class='timeTag'> <%= dic_time %> </h3>       <div data-role='fieldcontain' id='songPositionControl'> 			<label for='songPosition' id='songCurrentTime' class='ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-mini ui-slider-input'>0:00</label> 			<input type='range' value='0' min='0' data-highlight='true' data-mini='true' id='songPosition' style='display: none;' /> 		</div> 		 <h3 class='timeTag'> <%= dic_volume %> </h3>       <div data-role='fieldcontain' id='volumePositionControl'>        <input value='10' min='0' max='10' data-highlight='true' data-mini='true' name='volText' id='volText' type='range' />       </div> 	       </div>    </div>   </div>   </div> </div> <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='stopaudio botonprev backtolist' data-role='button' data-transition='none' data-icon='arrow-l'>     <%= dic_back %>  </a>   <a class='botonnext save' data-role='button' data-transition='none' data-icon='arrow-r' data-iconpos='right'>     <%= dic_vision_p1_text3 %>    </a>     </div>";
				quadhistory = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno headerquad' data-role='header'>        <h2>         <%= dic_quad_header %>        </h2>       </div>    <div data-role='content'>    <label class='fasequad' style='text-align:left;'> <%= dic_quad_p1_title %> </label>    <div class='primerLcuaderno'>     <label id='quadInput1' style='font-size: 120%;'>          </label>     </div>    <div>     <label id='quadInput2' style='font-size: 120%;'> </label>    </div>        <label class='fasequad' style='text-align:left;'> <%= dic_quad_p2_title %> </label>    <div class='primerLcuaderno'>     <label id='quadInput3' style='font-size: 120%;'>          </label>     </div>    <div>     <label id='quadInput4' style=''> </label>    </div>          <label class='fasequad' style='text-align:left;'> <%= dic_quad_p3_title %> </label>    <div class='primerLcuaderno'>     <label id='quadInput5' style='font-size: 120%;'>          </label>     </div>       <label id='quadInput6' style='font-size: 120%;'> </label> 	</br> 	<label id='quadInput7' style='font-size: 120%;'> </label>           <label class='fasequad' style='text-align:left;'> <%= dic_quad_p4_title %> </label>    <div class='primerLcuaderno'>     <label id='quadInput8' style='font-size: 120%;'>          </label>     </div>    <div>     <label id='quadInput9' style='font-size: 120%;'> </label>    </div>       </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart backtolist' data-role='button' data-transition='none'>     <%= dic_back %>    </a>     </div>   ";
				quadAudioHistory = " <div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno recycling' data-role='header'>        <h2>         <%= dic_quad_header %>        </h2>       </div>    <div data-role='content'>     <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno writtingarea'>     <label for='quadInputS'>      <%= dic_quad_pS_text1 %>     </label>     <textarea class='writtingtextarea ui-disabled' rows='9' name='' id='quadInputS' class='mandatory' placeholder='<%= dic_quad_pS_placeholder1 %>'><%= answer %></textarea>    </div>           <a id='downloadAndPlay' class='colorverde' data-role='button' data-mini='true'>      <%= dic_loadaudio %>     </a>      <div data-role='content' class='sinmargin'> 	       <h3 class='timeTag'> <%= dic_time %> </h3>       <div data-role='fieldcontain' id='songPositionControl'> 			<label for='songPosition' id='songCurrentTime' class='ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-mini ui-slider-input'>0:00</label> 			<input type='range' value='0' min='0' data-highlight='true' data-mini='true' id='songPosition' style='display: none;' /> 		</div> 		 <h3 class='timeTag'> <%= dic_volume %> </h3>       <div data-role='fieldcontain' id='volumePositionControl'>        <input value='10' min='0' max='10' data-highlight='true' data-mini='true' name='volText' id='volText' type='range' />       </div> 	       </div>    </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev backtolist stopaudio' data-role='button' data-transition='none' href='#summary' data-icon='arrow-l'>     <%= dic_prev %>    </a>     </div>";
				summary = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno summaryheader' data-role='header'>        <h2>         <%= dic_summary_header %>        </h2>       </div>    <div data-role='content'>       <div class='quotes sombrafrase' data-role='content'>    <p class='frasediaria'> <%= quote %></p>    <p class='frasediariaAuthor'> <%= quoteAuthor %></p>    </div>       <a id='suggestionbutton' class='summary toolbutton' data-role='button' data-controltype='panelbutton' href='#panelhoffman' data-transition='none' data-inset='false'>          <%= dic_summary_text2 %>     </a>    <ul id='summarylist' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-inset='true' data-icon='none'>      	</ul> 	<ul id='listasummarytools' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-icon='none' data-inset='true'> 						 	</ul>    </div>   </div> </div> ";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#profile0' class='configuration toolbutton'>                 <%= dic_hoffman_connect %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='share_link' href='#share_link' class='transfer toolbutton'>                 <%= dic_share_link %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";
				
                this.history=historycollection;
				this.router=router;
				self = this;
                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( quad0 );
						
						setTimeout(function(){
							$('#checkboxes1').change(function() {
								console.log("Change");
								self.checkboxevt();
							});
						},400);	
		
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
						url: "http://appv2.hoffman-international.com/hoffapp/" + "node/" + AUDIO_NID + ".jsonp",
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
					
					if(this.historicAudiodownloaded == "no" || typeof this.historicAudiodownloaded === 'undefined'){ //Hay que descargar el audio
						$.ajax(params_audio_node);
					}
					else{ //Tenemos el audio en local
						console.log("nodownload, fichero de audio ya existente");
						console.log(this.model);
						selfR=this;
						this.model.set("audioName",historycollection.get("languages").get("quadAudioDownloaded"));
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
							target='cdvfile://localhost/persistent/audios/';
							//target=cordova.file.documentsDirectory+"audios/";
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
				this.router.recordActivity('quad', this.model.get("version"), new Date());
		
            },
			
	
            downloadAndPlay: function(){
                var self=this;
                if(this.historicAudiodownloaded=="no" || typeof this.historicAudiodownloaded === 'undefined'){ //download
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
					console.log("Compruebo si existe el fichero: " + cordova.file.externalDataDirectory+"audios/"+selfR.model.get("audioName"));
					target="";
					
					if(device.platform!='Android'){	//iOS
						console.log("Mi plataforma es: " + device.platform);
						target='cdvfile://localhost/persistent/audios/';
					 }
					 else{
						 target=cordova.file.externalDataDirectory+"audios/";
					 }
					selfR.my_media = new Media(target+selfR.model.get("audioName"), selfR.mediasuccess, selfR.nada, selfR.onStatus);
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
                    var uri = encodeURI("http://appv2.hoffman-international.com/system/files/"+audiofilename);
                    
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
							url=entry.toInternalURL();
							
							//guardamos el nombre del quadAudio
							auxlanguages = self.history.get("languages");
							self.history.get("languages").destroy();
							auxlanguages.set("quadAudioDownloaded",audiofilename);
							auxlanguages.save();
							self.history.create(auxlanguages);
							if(device.platform!='Android')
								target='cdvfile://localhost/persistent/audios/';
							//self.my_media = new Media(target+self.model.get("audioName"), self.mediasuccess, self.nada, self.onStatus);
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
                //console.log(e);
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
				setTimeout(function() {
					if(device.platform!='Android')
						self.my_media.stop();
				}, 200); 
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
						window.plugins.insomnia.keepAwake();
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
				this.router.recordActivity('quad', this.model.get("version"), new Date());
            },
	
            checkboxevt: function (){
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
