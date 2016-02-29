

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/pattern0.html',
    'text!../Templates/pattern1.html',
    'paper',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, pattern0, pattern1, paper, headerandpanel){

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