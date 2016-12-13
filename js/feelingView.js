
define([
    'jquery',
    'underscore',
    'backbone',
    'konva.min',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/feeling.html',
    'text!../Templates/feelinghistory.html',
    'feelingModel',
    'list',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'

    ], function($, _, Backbone, Konva, feeling, feelinghistory, feelingModel, list, headerandpanel){


        feelingView = Backbone.View.extend({

            events:{
                "click .feelingsel":"myruleta",
                "click #shareb":"share",
                "click .golink":"golink",
                "click #newfeeling":"askType",
                "click #goAgain":"goAgain",
                "click .stopAnim":"stopAnim"
            },

            render: function(id,historycollection, router){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page ruletaoverflow');

                if(id>9){
                    historyindex=id-20;
                    compiledTemplate = _.template( feelinghistory );
                    this.model= historycollection.at(historyindex);
                }
                else
                    compiledTemplate = _.template( feeling );
                var self=this;
                this.flag=true;
                this.history = historycollection;
				this.router = router;
                this.NUM_WEDGES = 17;
                this.actions=[];
                this.SELECTED_ACTIONS = [];
                this.action_words =[];
                this.history=historycollection;
                this.serverfeelings=[];
				this.feelingsLoaded=false;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_feeling_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
                if(id>9){
			
                }
                else{
                    try{
                        window.plugins.spinnerDialog.show(self.history.get("languages").get("dic_loading"), "", function () {
                            console.log("callback");
                        });
                    }
                    catch(e){
                        console.log(e);
                    }

					try{
						if((navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN) && typeof this.history.get("languages").get("actionsList") !== "string"){ //Si no hay internet
							setTimeout(function(){
								self.getLastFeelingsActions();
							},300);
						}
						else{
							router.drupaldo(this.getFeelings.bind(this),"null");
							setTimeout(function(){
								if(!self.feelingsLoaded)
									self.getLastFeelingsActions();
							},5000);
						}
					}
					catch(e){ //Este bloque se ejecuta solo en PC
						if(typeof this.history.get("languages").get("actionsList") == "string"){
							router.drupaldo(this.getFeelings.bind(this),"null");
							setTimeout(function(){
								if(!self.feelingsLoaded)
									self.getLastFeelingsActions();
							},5000);
						}
						else{
							setTimeout(function(){
								self.getLastFeelingsActions();
							},300); //Delay para no meter los feelings en el dom antes de que se haya cargado
						}
					}
                }
				this.collection=historycollection;
				this.ruletaflag=true;
		
				$( document ).one( "pageshow", function() {
					$("#customfeeling").hide();
					$("#selectedfeeling").hide();
					self.writeevent();
				});
		
				this.addflag=false;
                
            },
			
			getLastFeelingsActions: function(){
			
				self=this;
				
				myactions=this.history.get("languages").get("actionsList");
				myactions.forEach(this.putActions, this);
				
				for (index = 0; index < this.history.get("languages").get("feelingsList").length; ++index) {
					self.serverfeelings[index] = this.history.get("languages").get("feelingsList")[index];
					self.serverfeelings[index].type=self.serverfeelings[index].type[0];
					$("#feelinglist").append("<li feelingtype='" + self.serverfeelings[index].type + "'><h3 class='feelingsel' >" + self.serverfeelings[index].feeling + "</h3></li>");
				
				}
				var customFeelings = self.history.get("languages").get("customFeelings");
				for (index = 0; index < customFeelings.length; ++index) {
					$("#feelinglist").append("<li feelingtype='" + customFeelings[index][1] + "'><h3 class='feelingsel' >" + customFeelings[index][0] + "</h3></li>");
				}
				//$("#feelinglist").prepend("<li id='customfeeling'><a id='newfeeling' class='newfeeling' feelingtype=''></a></li>");
				var options = {
					valueNames: [ 'feelingsel' ],
					page: 400
				};

				self.feelList = new list("feelingco", options);
				self.feelList.sort('feelingsel', {
					order: "asc"
				});
				try{
					window.plugins.spinnerDialog.hide();
				}
				catch(e){
					console.log(e);
				}
			
			},

            share: function(){
                var self=this;
                try{
                    window.plugins.socialsharing.share(self.model.get("result"), null, self.model.get("uri"), null);
                }
                catch(e){
                    alert(e);
                }
            },
	
            putActions: function(element){
                this.actions[this.actions.length] = element;
            },
	
            ontypeConfirm: function(indexans){
				var self=this;
                if(indexans==1){
                    $("#feelinglist").prepend("<li feelingtype='Positive'><h3 class='feelingsel' >" + self.input.value + "</h3></li>");
                    $("#customfeeling").hide();
                    $("#textIfeel").hide();
                    var options = {
                        valueNames: [ 'feelingsel' ]
                    };
                    self.feelList = new list("feelingco", options);
                    this.ctype="Positive";
                }
                if(indexans==2){
                    $("#feelinglist").prepend("<li feelingtype='Negative'><h3 class='feelingsel' >" + self.input.value + "</h3></li>");
                    $("#customfeeling").hide();
                    $("#textIfeel").hide();
                    var options = {
                        valueNames: [ 'feelingsel' ]
                    };
                    self.feelList = new list("feelingco", options);
                    this.ctype="Negative";
                }
                if(indexans==1 || indexans==2){
		
                    if(this.history.get("languages").get("customFeelings")==""){
                        this.history.get("languages").set("customFeelings",[]);
                        this.customFeelings = this.history.get("languages").get("customFeelings");
                        this.customFeelings[this.customFeelings.length]=[self.input.value,this.ctype];
                        console.log(this.customFeelings);
                        this.history.get("languages").set("customFeelings",this.customFeelings);
                        aux=this.history.get("languages");
                        this.history.get("languages").destroy();
                        this.history.create(aux);
                        this.addflag=true;
                        this.myruleta();
                        console.log("first custom feeling added: " + this.customFeelings[this.customFeelings.length-1]);
                    }
                    else{
                        this.customFeelings = this.history.get("languages").get("customFeelings");
                        this.customFeelings[this.customFeelings.length]=[self.input.value,this.ctype];
                        console.log(this.customFeelings);
                        this.history.get("languages").set("customFeelings",this.customFeelings);
                        aux=this.history.get("languages");
                        this.history.get("languages").destroy();
                        this.history.create(aux);
                        this.addflag=true;
                        this.myruleta();
                        console.log("custom feeling added: " + this.customFeelings[this.customFeelings.length-1]);
                    }
                }
		
            },
	
            stopAnim: function(){
	
                try{
                    this.anim.stop();
                }
                catch(e){
					console.log("this.anim.stop(): " + e);
				}
	
            },
	
            askType: function(){
				var self=this;
                try{
                    navigator.notification.confirm(self.history.get("languages").get("dic_feeling_p0_feelingType"), function(indexans){
                        self.ontypeConfirm(indexans);
                    }, "", [self.history.get("languages").get("dic_positive"),self.history.get("languages").get("dic_negative")]);
                }
                catch(e){
                    self.ontypeConfirm(1); //en PC es siempre positive
                    console.log(e);
                }
	
            },
            getActions: function(){

                var self=this;
                var params_languages = { //active languages
                    context: this,
                    type: 'GET',
                    dataType: 'jsonp',
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/actions_" + self.history.get("languages").get("languageAC"),
                    processData: true,
                    success: function(data) {
						aux=self.history.get("languages");
						self.history.get("languages").destroy();
						aux.set("actionsList",data);
						self.history.create(aux);
						
                        data.forEach(this.putActions, this);
                    },
                    error: function(code) {
                        console.log("petada, intento loguear", code);
                    }
                };

                $.ajax(params_languages);


            },
	
            writeevent: function(){
                var self=this;
                this.input = document.querySelector('input');
                $( "#feelingco" ).on( "input", function() {
                    console.log($('ul#feelinglist h3:first').text().toUpperCase(), self.input.value.toUpperCase());
                    if(self.input.value.length>=3 && $('ul#feelinglist h3:first').text().toUpperCase()!= self.input.value.toUpperCase()){
                        $( "#newfeeling" ).text(self.input.value);
                        $("#customfeeling").show();
                        $("#textIfeel").show();
                    }
                    else
                        $("#customfeeling").hide();
                    $("#textIfeel").hide();
                });
            },

            getFeelings: function(){

                var self=this;
				this.getActions();
	
                console.log("LANGUAGEAC: " + self.history.get("languages").get("languageAC"));
                var params_languages = { //active languages
                    type: 'GET',
                    dataType: 'json',
                    url: "http://hoffmanapp.indret.webfactional.com/hoffapp/feelings_" + self.history.get("languages").get("languageAC"),
                    processData: true,
                    success: function(data) {
                        console.log(data);
						self.feelingsLoaded = true;
                        for (index = 0; index < data.length; ++index) {
                            self.serverfeelings[index] = data[index];
                            self.serverfeelings[index].type=self.serverfeelings[index].type[0];
                            $("#feelinglist").append("<li feelingtype='" + self.serverfeelings[index].type + "'><h3 class='feelingsel' >" + self.serverfeelings[index].feeling + "</h3></li>");
						
                        }
                        var customFeelings = self.history.get("languages").get("customFeelings");
                        for (index = 0; index < customFeelings.length; ++index) {
                            $("#feelinglist").append("<li feelingtype='" + customFeelings[index][1] + "'><h3 class='feelingsel' >" + customFeelings[index][0] + "</h3></li>");
                        }
                        //$("#feelinglist").prepend("<li id='customfeeling'><a id='newfeeling' class='newfeeling' feelingtype=''></a></li>");
                        var options = {
                            valueNames: [ 'feelingsel' ],
							page: 400
                        };

                        self.feelList = new list("feelingco", options);
                        self.feelList.sort('feelingsel', {
                            order: "asc"
                        });
                        try{
                            window.plugins.spinnerDialog.hide();
                        }
                        catch(e){
                            console.log(e);
                        }
						
						aux=self.history.get("languages");
						self.history.get("languages").destroy();
						aux.set("feelingsList",data);
						self.history.create(aux);
                    },
                    error: function(code) {
                        console.log("petada, intento loguear", code);
                    }
                };

                $.ajax(params_languages);


            },
	
            showLink: function(text){
	
		
                for(index=0;index<this.SELECTED_ACTIONS.length;index++){
                    if(this.SELECTED_ACTIONS[index].action==text){//actionDesc
                        
                        this.model.set("result",this.SELECTED_ACTIONS[index].info);
                        console.log(this.SELECTED_ACTIONS[index].link);
                        console.log(typeof this.SELECTED_ACTIONS[index].link);
                        console.log(typeof this.SELECTED_ACTIONS[index].tool);
                        if(typeof this.SELECTED_ACTIONS[index].link == "string"){//tiene link
                            $("#linkortool").attr("style", "");
							if($("#actionDesc").text()==" ")
								$("#linkortool").fadeOut(0);
                            $("#linkortool").fadeIn(1500);
                            $("#linkortool").text($("#linkortool").text()+this.history.get("languages").get("link"));
                            $("#linkortool").attr("class",$("#linkortool").attr("class") + " " + "golink");
                            this.outsidelink=this.SELECTED_ACTIONS[index].link;

                        }
                        else //tiene tool
                            $("#linkortool").attr("style", "visibility:hidden; margin:0px;");
                        

						if($("#actionDesc").text()==" ")
							$("#actionDesc").fadeOut(0);
						$("#actionDesc").text(this.SELECTED_ACTIONS[index].info);
                        $("#actionDesc").fadeIn(1500);
                    }
                }
	
            },
	
            golink: function(){
                var self=this;
                try{
                    console.log("Opening link: " + self.outsidelink);
                    var ref = window.open(self.outsidelink, '_system',"location=yes");
                    $("#linkortool").fadeOut(0);
                }
                catch(e){}
	
            },
	
            goAgain: function(){
                Backbone.history.loadUrl();
            },


            myruleta: function(e){

                var self=this;
                this.$(".panelbutton").hide();
                this.$(".dic_help").hide();
		
                if(!this.addflag){
                    this.feelingtype = $(e.target).parents('li').attr("feelingtype");
                    this.model.set("feeling", $(e.target).text().toLowerCase());
                }
                else{
                    this.customFeelings = this.history.get("languages").get("customFeelings");
                    console.log("DEBUG2: ");
                    console.log(this.customFeelings);
                    console.log("trying to spin the wheel with the new feeling: " +  this.customFeelings[this.customFeelings.length-1][0]);
                    this.feelingtype = this.customFeelings[this.customFeelings.length-1][1];
                    this.model.set("feeling", this.customFeelings[this.customFeelings.length-1][0]);
                }
		
                if(this.ruletaflag){
                    $("#selectedfeeling").text(this.history.get("languages").get("dic_feeling_selected") + " " + this.model.get("feeling"));
                    $("#selectedfeeling").show();
                    $("#textIfeel").hide();
		
                    $("#feelingco").hide();
                    this.ruletaflag=false;
	
                    function wrapText (str, int_width, str_break, cut) {
                        // From: http://phpjs.org/functions
                        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
                        // +   improved by: Nick Callen
                        // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
                        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                        // +   improved by: Sakimori
                        // +   bugfixed by: Michael Grier
                        // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
                        // *     returns 1: 'Kevin |van |Zonnev|eld'
                        // *     example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
                        // *     returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
                        // *     example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
                        // *     returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'
                        // PHP Defaults
                        var m = ((arguments.length >= 2) ? arguments[1] : 75);
                        var b = ((arguments.length >= 3) ? arguments[2] : "\n");
                        var c = ((arguments.length >= 4) ? arguments[3] : false);

                        var i, j, l, s, r;

                        str += '';

                        if (m < 1) {
                            return str;
                        }

                        for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
                            for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
                                j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
                            }
                        }

                        return r.join("\n");
                    }


                    var MAX_ANGULAR_VELOCITY = 360 * 5;
                    var NUM_WEDGES = self.NUM_WEDGES;
                    var WHEEL_RADIUS = 400;
                    var ANGULAR_FRICTION = 0.2;
                    var TEXT_LENGTH = 13;

                    // globals
                    var angularVelocity = 360;
                    var lastRotation = 0;
                    var controlled = false;
                    var target, activeWedge, stage, layer, wheel,
                    pointer, pointerTween, startRotation, startX, startY;


                    function purifyColor(color) {
                        var randIndex = Math.round(Math.random() * 3);
                        color[randIndex] = 0;
                        return color;
                    }
                    function getRandomColor() {
                        var color_palette = [[163, 144, 43], [200, 200, 200], [225, 229, 226],
                        [190, 160, 128], [163, 152, 137], [167, 170, 112],
                        [201, 188, 135], [162, 150, 137], [227, 206, 148],
                        [190, 195, 121], [232, 211, 150]];

                        var color = color_palette[[Math.floor(Math.random()*color_palette.length)]];
                        //color = purifyColor(color);
                        return color;
                    }
	  
                    function getRandomReward(context) {

                        //En word pongo la string y en SELECTED_ACTIONS el objeto con su tipo (positivo&negativo) y link
                        typeflag=false;
                        while(!typeflag){
                            randomIndex=Math.floor(Math.random()*context.actions.length);
                            if(context.feelingtype==context.actions[randomIndex].type[0] || context.actions[randomIndex].type.length==2){
                                modifiedText = wrapText(context.actions[randomIndex].action, TEXT_LENGTH, "\n", true);
                                context.action_words[context.action_words.length]=modifiedText;
                                context.SELECTED_ACTIONS[context.SELECTED_ACTIONS.length] = context.actions[randomIndex];
                                typeflag=true;
                            }
                        }
                        return modifiedText;
                    }

                    function addWedge(n, context) {
                        var s = getRandomColor();
                        var reward = getRandomReward(context);
                        console.log("reward:", reward);
                        var ACLARAR = 1.15;
                        var r = Math.round(s[0]*ACLARAR);
                        var g = Math.round(s[1]*ACLARAR);
                        var b = Math.round(s[2]*ACLARAR);
                        var angle = 360 / NUM_WEDGES;

                        var endColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                        r += 100;
                        g += 100;
                        b += 100;

                        var startColor = 'rgb(' + r + ',' + g + ',' + b + ')';

                        var wedge = new Konva.Group({
                            rotation: n * 360 / NUM_WEDGES,
                        });

                        var wedgeBackground = new Konva.Wedge({
                            radius: WHEEL_RADIUS,
                            angle: angle,
                            fillRadialGradientStartRadius: 0,
                            fillRadialGradientEndRadius: WHEEL_RADIUS,
                            fillRadialGradientColorStops: [0, startColor, 1, endColor],
                            fill: '#64e9f8',
                            fillPriority: 'radial-gradient',
                            stroke: '#ccc',
                            strokeWidth: 2,
                            rotation: (90 + angle/2) * -1
                        });

                        wedge.add(wedgeBackground);

                        var text = new Konva.Text({
                            text: reward,
                            fontFamily: 'Calibri',
                            fontSize: 20,
                            fill: 'gray',
                            align: 'center',
                            stroke: 'gray',
                            strokeWidth: 1,
                            listening: false,
                            lineHeight: 1

                        });

                        text.offsetX(text.width()/2);
                        text.offsetY(WHEEL_RADIUS - 20);

                        wedge.add(text);

                        wheel.add(wedge);

                    }

                    var showshare= true;
                    var self=this;
                    function animate(frame, context) {
                        // wheel
                        var angularVelocityChange = angularVelocity * frame.timeDiff * (1 - ANGULAR_FRICTION) / 1000;
                        angularVelocity -= angularVelocityChange;

                        wheel.rotate(frame.timeDiff * angularVelocity / 1000);
                        if(angularVelocity<0.8 && showshare){ //rueda a punto de parar
                            showshare = false;
                            self.showLink(this.selectedActionText);
                            $("#shareb").attr("style", "");
                            $("#shareb").fadeOut(0);
                            $("#shareb").fadeIn(1500);
                            micanvas=$("#container canvas");
                            micanvas.attr("id","micanvas");
                            canvasid=document.getElementById("micanvas");

                            // ponemos fondo blanco y exportamos
                            destinationCanvas = document.createElement("canvas");
                            destinationCanvas.width = canvasid.width;
                            destinationCanvas.height = canvasid.height;
                            destCtx = destinationCanvas.getContext('2d');
                            destCtx.fillStyle = "#FFFFFF";
                            destCtx.fillRect(0,0,canvasid.width,canvasid.height);
                            destCtx.drawImage(canvasid, 0, 0);
                            canvasimage=destinationCanvas.toDataURL("image/png");

                            self.model.set("tool","feeling");
                            self.model.set("uri",canvasimage);
                            self.collection.create(self.model);
			
                            //Muestro el botón go again
                            $("#goAgain").fadeIn(500);
                            setTimeout(function() {
                                try{
                                    anim.stop();
                                    this.$(".panelbutton").show();
                                    this.$(".dic_help").show();
                                }
                                catch(e){}
                            }, 500);
			
                        }
                        lastRotation = wheel.getRotation();

                        // pointer
                        var intersectedWedge = layer.getIntersection({
                            x: stage.getWidth()/2,
                            y: stage.getHeight()/2
                            });

                        if (intersectedWedge && (!activeWedge || activeWedge._id !== intersectedWedge._id)) {
                            pointerTween.reset();
                            pointerTween.play();
                            activeWedge = intersectedWedge;
                            this.selectedActionText=""
                            for(wordSections=0;wordSections<activeWedge.getParent().children[1].textArr.length;wordSections++){
                                this.selectedActionText = this.selectedActionText + activeWedge.getParent().children[1].textArr[wordSections].text;
                            }
                        }


                    }
                    function init(context) {
                        if ($(window).width() >= 360) {
                            stage = new Konva.Stage({
                                container: 'container',
                                width: 300,
                                height: 200
                            });
                        } else {
                            stage = new Konva.Stage({
                                container: 'container',
                                width: 260,
                                height: 200
                            });
                        }
                        layer = new Konva.Layer();
						
						console.log("wheel");
						console.log(stage.getWidth() / 2);
						console.log(WHEEL_RADIUS + 20);
                        wheel = new Konva.Group({
                            x: stage.getWidth() / 2,
                            y: WHEEL_RADIUS
                        });

                        for(var n = 0; n < NUM_WEDGES; n++) {
                            addWedge(n, context);
                        }
                        pointer = new Konva.Wedge({
                            fillRadialGradientStartPoint: 0,
                            fillRadialGradientStartRadius: 0,
                            fillRadialGradientEndPoint: 0,
                            fillRadialGradientEndRadius: 30,
                            fillRadialGradientColorStops: [0, 'white', 1, 'red'],
                            stroke: 'white',
                            strokeWidth: 2,
                            lineJoin: 'round',
                            angle: 30,
                            radius: 30,
                            x: stage.getWidth() / 2,
                            y: 20,
                            rotation: -105,
                            shadowColor: 'black',
                            shadowOffset: {
                                x:3,
                                y:3
                            },
                            shadowBlur: 2,
                            shadowOpacity: 0.5
                        });

                        // add components to the stage
                        layer.add(wheel);
                        layer.add(pointer);
                        stage.add(layer);

                        pointerTween = new Konva.Tween({
                            node: pointer,
                            duration: 0.1,
                            easing: Konva.Easings.EaseInOut,
                            y: 30
                        });

                        pointerTween.finish();

                        var radiusPlus2 = WHEEL_RADIUS + 2;


                        layer.draw();

                        // bind events


                        var anim = new Konva.Animation(animate, layer);
						self.anim=anim;

                        //document.getElementById('debug').appendChild(layer.hitCanvas._canvas);

                        // wait one second and then spin the wheel

                        setTimeout(function() {
                            anim.start();
                        }, 1000);
                        setTimeout(function() {
                            try{
                                anim.stop();
                            }
                            catch(e){}
                        }, 15000);
                    }
	  
                    init(self);
                }
            }



        });

        return feelingView;
    });
