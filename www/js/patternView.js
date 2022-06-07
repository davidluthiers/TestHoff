

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'paper',
    'jquerymobile'
  
    ], function($, _, Backbone, paper){
		

        patternView = Backbone.View.extend({

            events:{
                "click #botonpaso":"paso",
                "click #botonvolume":"noisevolume",
                "click #graba":"graba",
                "click #stoprecording":"leersonido"
            },
   
            render: function(id,historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
				
				pattern0 = "";
				pattern1 = "";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#profile0' class='configuration toolbutton'>                 <%= dic_hoffman_connect %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='share_link' href='#share_link' class='transfer toolbutton'>                 <%= dic_share_link %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";

                switch(id) {
                    case '0':
                        compiledTemplate = _.template( pattern0 );
                        break;
                    case '1':
                        compiledTemplate = _.template( pattern1 );
                        console.log("id="+ id);
                        console.log(pattern1);

                        break;
                };
			
                self=this;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_pattern_helppanel"));
                result= historycollection.get("languages").toJSON();
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));

                if(id == '1') {
                    var canvas = this.$el.find('canvas')[0];
                    console.log(this.$el.find('canvas'));
                    console.log(canvas);
                    paper.indice_animacion = 0;
                    this.pintar(canvas);
                }
            },

            paso: function() {
                paper.indice_animacion += 1;
                console.log(paper.indice_animacion);
            },
		
		
            graba: function() {
                console.log("empieza");
                self=this;
		
			
                var src = "assets/myrecording.amr";
                this.mediaRec = new Media(src,
                    // success callback
                    function() {
                        console.log("recordAudio():Audio Success");
					
					
                    },

                    // error callback
                    function(err) {
                        console.log("recordAudio():Audio Error: "+ err.code);
                    });
                console.log("prestartRecord");
                // Record audio
                this.mediaRec.startRecord();
                console.log("posstartRecord");
			
		
            },
		
            leersonido: function() {
		
                this.mediaRec.stopRecord();
                this.mediaRec.release();
			
                this.mediaPlayer = new Media('/mnt/sdcard/tmprecording.3gp',
                    // success callback
                    function() {
                        console.log("Audio Success");
					
					
                    },

                    // error callback
                    function(err) {
                        console.log("Audio Error: "+ err.code);
                    });
			
                this.mediaPlayer.play();
			
            },
		
            noisevolume: function() {
				
				
                createjs.Sound.initializeDefaultPlugins();
                var context = createjs.WebAudioPlugin.context;
                console.log(context);
                var audioBuffer;
                var sourceNode;
				
                if (createjs.Sound.activePlugin.toString() == "[HTMLAudioPlugin]") {
                    alert("cagada");
                }
			 
                // load the sound
                setupAudioNodes();
                loadSound("meencuentromal.mp3");
			 
                function setupAudioNodes() {
			
                    // setup a javascript node
                    javascriptNode = context.createScriptProcessor(2048, 1, 1);
                    // connect to destination, else it isn't called
                    javascriptNode.connect(context.destination);
					
                    // setup a analyzer
                    analyser = context.createAnalyser();
                    analyser.smoothingTimeConstant = 0.3;
                    analyser.fftSize = 1024;
					
                    // create a buffer source node
                    sourceNode = context.createBufferSource();

                    // connect the source to the analyser
                    sourceNode.connect(analyser);
					
                    // we use the javascript node to draw at a specific interval.
                    analyser.connect(javascriptNode);
			 
                    // and connect to destination, if you want audio
                    sourceNode.connect(context.destination);
                    console.log(sourceNode);
                    self=this;
				   
                    stopwatching(javascriptNode);
				   
                    console.log(analyser);
                    console.log(sourceNode);
                    console.log(javascriptNode);
					
                }
                flag=true;
                function stopwatching(javascriptNode){
				
                    console.log("hola");
				
                    setTimeout(function(){
                        context.uninitialize();
                    },4000);
				
				
                }
			 
                // load the specified sound
                function loadSound(url) {
                    var request = new XMLHttpRequest();
                    request.open('GET', url, true);
                    request.responseType = 'arraybuffer';
			 
                    // When loaded decode the data
                    request.onload = function() {
			 
                        // decode the data
                        context.decodeAudioData(request.response, function(buffer) {
                            // when the audio is decoded play the sound
                            playSound(buffer);
                        }, onError);
                    }
                    request.send();
                }
			 
			 
                function playSound(buffer) {
                    sourceNode.buffer = buffer;
                    sourceNode.start(0);
                }
			 
                // log if an error occurs
                function onError(e) {
                    console.log(e);
                }
				
                javascriptNode.onaudioprocess = window.audioProcess = function() {
 
                    // get the average, bincount is fftsize / 2
                    var array =  new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    var average = getAverageVolume(array);
                    console.log(average);
	
                }
		 
                function getAverageVolume(array) {
                    var values = 0;
                    var average;
		 
                    var length = array.length;
		 
                    // get all the frequency amplitudes
                    for (var i = 0; i < length; i++) {
                        values += array[i];
                    }
		 
                    average = values / length;
                    return average;
                }
			
            },

            // Pintar y animar
            pintar: function(canvas) {

                paper.setup(canvas);
                // Chapuza: calculo las dimensiones del dispositivo y le resto a ojo los márgenes
                paper.view.viewSize.width = $(window).width() - 70;
                paper.view.viewSize.height = $(window).height() - 400;

                var x = paper.view.viewSize.width / 2;
                var y = paper.view.viewSize.height / 2;
                var globo = this.$el.find('#elglobo')[0];
                var imagen = new paper.Raster(globo, [x, y]);
                imagen.scale(0.3);
                paper.animacion = paper.indice_animacion;
                paper.view.onFrame = function(event) {
                    // Si se ha apretado el botón
                    if(paper.animacion != paper.indice_animacion) {
                        paper.animacion = paper.indice_animacion;
                        imagen.size = [imagen.width + 10, imagen.height + 10];
                    }

                }
                paper.view.draw();
            }
        });

        return patternView;
    });