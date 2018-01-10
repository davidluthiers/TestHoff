

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/beatyour0.html',
    'text!../Templates/beatyour1.html',
    'text!../Templates/beatyour2.html',
    'text!../Templates/beatyourhistory.html',
    'beatyourModel',
    'languageModel',
    'text!../Templates/headerandpanel.html',
    'paper',
    'jquerymobile'
  
    ], function($, _, Backbone, beatyour0, beatyour1, beatyour2, beatyourhistory, beatyourModel, languageModel, headerandpanel, paper){



        beatyourdarkView = Backbone.View.extend({
  
            events:{
	
                "click .imagenbeatyour":"beatthumbnail",
                "click .save":"save",
				"click .donotshowagain":"checkboxevt",
                "click #getgalleryphoto":"getfromgallery"
	
            },
   
            render: function(id, historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
				
				if(id=='2'){
					this.$el.attr('class', 'beatfixed page');
				}
				else{
					 this.$el.attr('class', 'page');
				}

                this.collection=historycollection;
				
				self=this;
		
                if(id=='0'){ 
                    compiledTemplate = _.template( beatyour0 );
					setTimeout(function(){
						$('#checkboxes1').change(function() {
							console.log("Change");
							self.checkboxevt();
						});
					},400);	
                }
		
                if(id=='1'){
                    compiledTemplate = _.template( beatyour1 );
		
                }
		
                if(id=='2'){
                    compiledTemplate = _.template( beatyour2 );
		
                }
		
                if(id>19){
                    historyindex=id-20;
                    compiledTemplate = _.template( beatyourhistory );
                    this.model= historycollection.at(historyindex);
                }
		
                var self=this;
                this.history=historycollection;
				this.router=router;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_beatyour_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
			
                if(id=='1'){
				
					router.drupaldo(this.getBeatImages.bind(this),"null");
		
                }
                if(id=='2') {
                    var canvas = this.$el.find('canvas')[0];
			
                    try{
                        navigator.notification.confirm(self.history.get("languages").get("dic_beat_start"), function(indexans){}, self.history.get("languages").get("dic_Hoffman"),[self.history.get("languages").get("dic_start")+"!"]);
                    }
                    catch(e){
                        console.log(e);
                    }
			
                    try{
                        var url = "http://appv2.hoffman-international.com/sites/default/files/TaDa.mp3";
                        console.log("url: " + url);
                        self.my_media = new Media("http://appv2.hoffman-international.com/sites/default/files/TaDa.mp3", self.mediasuccess, self.nada, self.onStatus);
                    }
                    catch(e){
                        console.log("Intento de cargar media en PC fallido");
                    }
                    $(document).delegate(".ui-content", "scrollstart", false);
                    $(document).delegate(".ui-content", "touchmove", false);
                    this.gioconda(canvas, this.model.get("imgsrc"),this.history, this.my_media);
                }
	
            },
	
            save: function(){
                this.clearPaperEvents();
                this.model.set("tool","beatyour");
                this.history.create(this.model);
                Backbone.history.navigate("#summary", {
                    trigger: true
                });
            },
	
            putGridPics: function(length){
		
                var self=this;
                totalcolumnas=3;
                for(i=0;i<length;i++){
                    columna=i%totalcolumnas;
                    console.log("Columna: " + columna);
                    if(columna==0)
                        $('#imagegrid').append("<div class='ui-block-a'><img class='imagenbeatyour' src='" + this.images.get(i).image + "' /></div>");
                    if(columna==1)
                        $('#imagegrid').append("<div class='ui-block-b'><img class='imagenbeatyour' src='" + this.images.get(i).image + "' /></div>");
                    if(columna==2)
                        $('#imagegrid').append("<div class='ui-block-c'><img class='imagenbeatyour' src='" + this.images.get(i).image + "' /></div>");
                }
                $('#imagegrid').trigger("create");
            },
 
            beatthumbnail: function(ev){
		
                this.model.set("imgsrc",$(ev.target).attr("src"));
                Backbone.history.navigate("#beatyourdark2", {
                    trigger: true
                });
	 
            },
			
			getBeatImages: function(){
			
				var self=this;
				var params_images = {
					type: 'GET',
					dataType: 'jsonp',
					url: "http://appv2.hoffman-international.com/hoffapp/"+ "dark-side",
					processData: true,
					success: function(data) {
						console.log("images: ", data);
						self.images =new languageModel(data);
						self.putGridPics(data.length);
						console.log(self.images.get(0).name);
					},
					error: function(code) {
						console.log("petada", code);
					}
				};
   
					
                $.ajax(params_images);
			
			},
	
            getfromgallery:function(){
                var self=this;
                try{
                    window.imagePicker.getPictures(
                        function(results) {
                            for (var i = 0; i < results.length; i++) {
                                console.log('Image URI: ' + results[i]);
                                self.model.set("imgsrc",results[i]);
                                Backbone.history.navigate("#beatyourdark2", {
                                    trigger: true
                                });
                            }
                        }, function (error) {
                            console.log('Error: ' + error);
                        }, {
                            maximumImagesCount: 1
                        }
                        );
                }
                catch(e){
                    console.log(e);
                }
	
            },
	
            checkboxevt: function (){
                donot=this.history.get("donotshow");

                if($("#checkbox").attr("data-icon")=="checkbox-on") //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    donot.set("beatDoNotShow",false);
                else
                    donot.set("beatDoNotShow",true);
	
                this.history.get("donotshow").destroy();
                this.history.create(donot);
	
            },
	
            clearPaperEvents: function(){

                paper.clear();
                $(document).undelegate(".ui-content", "scrollstart", false);
                $(document).undelegate(".ui-content", "touchmove", false);
	
            },
	 
 
            gioconda: function(canvas, imgsrc, giohistory, giomedia) {

                console.log("gioconda");
                this.$(".panelbutton").hide();
                this.$(".dic_help").hide();
                paper.setup(canvas);
                ancho_uicontent = $(".ui-content").width();
                paper.view.viewSize.width = ancho_uicontent;
                paper.view.viewSize.height = $(window).height() - 200;  // la resta es para dar espacio a la cabecera y el pie

                proporcion = 1.77; // Proporción que debe haber entre la dimension vertical y la horizontal de la foto

                if ((paper.view.viewSize.height / paper.view.viewSize.width) >= proporcion) {
                    paper.view.viewSize.height = Math.round(paper.view.viewSize.width * proporcion);
                } else {
                    paper.view.viewSize.width = Math.round(paper.view.viewSize.height / proporcion);
                };

                // Arreglo un par de propiedades de CSS para cuadrar la foto.
                this.$(".ui-content").css("padding-bottom","0px");
                this.$(".hojacuaderno").css("min-height","0px");
                margen_izq = (ancho_uicontent - 30 - paper.view.viewSize.width) / 2;
                this.$("#myCanvas").css("padding-left", Math.round(margen_izq)+"px");

                // Manejador de eventos para touchmove
                //this.$("canvas").bind("touchmove", touchHandler);
		
                //document.addEventListener("touchstart", touchHandler, true); //necesario para movil?
                //document.addEventListener("touchmove", touchHandler, true);
                //document.addEventListener("touchend", touchHandler, true);
                //document.addEventListener("touchcancel", touchHandler, true);

                // Corregir bug de Android con el evento touchmove. Otro trozo más abajo
                // http://uihacker.blogspot.com.es/2011/01/android-touchmove-event-bug.html

                // function onStart ( touchEvent ) {
                //   			touchEvent.preventDefault();
                // }

                // Based on 'JPEG Raster' by Jonathan Puckey:
                // http://www.flickr.com/photos/puckey/3179779686/in/photostream/

                // Create a raster item:
                var raster = new paper.Raster(imgsrc);
                var loaded = false;

                var area_total = 0;
                var MIN = 1.0 / 150;
                var area_en_blanco = 0.0;

                raster.on('load', function() {
                    loaded = true;
                    onResize();
                });

                // Make the raster invisible:
                raster.visible = true;

                var lastPos = paper.view.center;
		
                function finishHandler(event) {
		
                    paper.clear();
                    try{
                        giomedia.play();
                    }
                    catch(e){}
			
			
                    $(document).undelegate(".ui-content", "scrollstart", false);
                    $(document).undelegate(".ui-content", "touchmove", false);
			
                    $('.beatyourgratz').text(giohistory.get("languages").get("dic_bash_p0_congrats"));
                    for(blinks=0;blinks<12;blinks++) {
                        $('.beatyourgratz').fadeOut(500);
                        $('.beatyourgratz').fadeIn(500);
                    }
		
                }

                function moveHandler(event) {
                    console.log("moveHandler", event);
                    if (!loaded)
                        return;
                    if (calculaDistancia(lastPos, event.point) < 10)	//Uncaught TypeError: Object #<Touch> has no method 'getDistance'
                        return;
                    lastPos = event.point;


                    var size = this.bounds.size.clone();
                    var isLandscape = size.width > size.height;

                    // If the path is in landscape orientation, we're going to
                    // split the path horizontally, otherwise vertically:

                    //size /= isLandscape ? [2, 1] : [1, 2];
                    if (isLandscape) {
                        size.width /= 2;
                    } else {
                        size.height /= 2;
                    }


                    a = (size.width * size.height) / area_total;
                    if (a<=MIN) {
                        opacidad = 1.0;
                        area_en_blanco += 2*a;
                    }
                    else opacidad = Math.log(a)/Math.log(MIN); //Uncaught TypeError: Object #<Object> has no method 'log10'
			
                    if (area_en_blanco > 0.79) {
                        var blanco_total = new paper.Path.Rectangle({
                            rectangle: paper.view.bounds,
                            fillColor: 'white',
                            opacity: 1,
                            onMouseMove: finishHandler
                        });
                    }
                    else{
                        if (a<=MIN) {
                            var path = new paper.Path.Rectangle({
                                point: this.bounds.topLeft.floor(),
                                size: this.bounds.size.ceil()
                            });
                            path.fillColor = 'white';
                            path.opacity = opacidad;

                            console.log(area_en_blanco);
                            console.log("path.area: " + path.area);
                            console.log("area_total: " + area_total);
                            console.log(path);

                        }
                        else {

                            var path = new paper.Path.Rectangle({
                                point: this.bounds.topLeft.floor(),
                                size: size.ceil(),
                                onMouseMove: moveHandler
                            });
                            path.fillColor = 'white';
                            path.opacity = opacidad;

					
                            console.log(area_en_blanco);
                            console.log("path.area: " + path.area);
                            console.log("area_total: " + area_total);
                            console.log(path);

                            var path = new paper.Path.Rectangle({
                                point: isLandscape
                                ? this.bounds.topCenter.ceil()
                                : this.bounds.leftCenter.ceil(),
                                size: size.floor(),
                                onMouseMove: moveHandler
                            });
                            path.fillColor = 'white';
                            path.opacity = opacidad;
                        }
				
                    }
                    this.remove();
                }
                function calculaDistancia(a, b) {
                    return Math.sqrt(Math.pow(a.screenX-b.screenX) + Math.pow(a.screenY-b.screenY));
                };

                function onResize(event) {
                    if (!loaded)
                        return;
                    //project.activeLayer.removeChildren();

                    // Transform the raster so that it fills the bounding rectangle
                    // of the view:
                    raster.fitBounds(paper.view.bounds, false);
                    console.log(paper.view.bounds);

                    // Create a path that fills the view, and fill it with
                    // the average color of the raster:
                    area_total = new paper.Path.Rectangle({
                        rectangle: paper.view.bounds,
                        fillColor: 'white',
                        opacity: 0,
                        onMouseMove: moveHandler
                    }).area;
                // Bug de Android
                //if( device.platform=='Android' ) {
                //	area_total.addEventListener( "touchstart", function(e){ e.preventDefault(); }, false );
                //}

                }

                // Traductor de touchmove a mousemove
                // http://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events
		
                function touchHandler(event)
                {
		
		
                    var aux= new Object;
                    console.log("toucHandler", event);
                    aux["point"] = event.changedTouches[0];
                    moveHandler(aux);
		
                /*
		    var touches = event.changedTouches,
		        first = touches[0],
		        type = "mousemove";

		    var simulatedEvent = document.createEvent("MouseEvent");
		    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
		                              first.screenX, first.screenY, 
		                              first.clientX, first.clientY, false, 
		                              false, false, false, 0, null);

            first.target.dispatchEvent(simulatedEvent);
		    event.preventDefault();*/
                }
		


            }






 

        });

        return beatyourdarkView;
    });