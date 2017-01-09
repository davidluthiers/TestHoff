

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/viciousN1.html',
    'text!../Templates/vicious0.html',
    'text!../Templates/vicious1.html',
    'text!../Templates/vicious2.html',
    'text!../Templates/vicious3.html',
    'text!../Templates/vicioushistory.html',
    'paper',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, viciousN1, vicious0, vicious1, vicious2, vicious3, vicioushistory, paper, headerandpanel){



        viciousView = Backbone.View.extend({
      
            events:{
                "click .addfeeder":"addfeeder",
                "click .deletefeeder":"deletefeeder",
                "click .finishtool":"finish",
                "click .donotshowagain":"checkboxevt",
                "click #shareb":"share"
            },
	
	
            render: function(id, historycollection){
	
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
	
                console.log("id", id);
                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( viciousN1 );
						setTimeout(function(){
						$('#checkboxes1').change(function() {
								console.log("Change");
								self.checkboxevt();
							});
						},400);	
                        break;
                    case '1':
                        compiledTemplate = _.template( vicious1 );
                        this.model.set("finished",false);
                        if($('#corebelieve').val()!=undefined){
                            this.model.set({
                                corebelieve:$('#corebelieve').val(),
                                coreissue:$('#coreissue').val()
                            });
                        }
                        break;
                    case '2':
                        compiledTemplate = _.template( vicious2 );
                        this.model.set("finished",false);
			  
                        break;
                    case '3':
                        compiledTemplate = _.template( vicious3 );
                        this.model.set("finished",true);

                        break;
			  
                    case '4': //nueva página 1
                        compiledTemplate = _.template( vicious0 );
                        this.model.set("tool", "vicious");

                        break;
                }
	
                if(id>9){
                    historyindex=id-20;
                    compiledTemplate = _.template( vicioushistory );
                    this.model= historycollection.at(historyindex);
                }
			
                var self=this;
                this.history=historycollection;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_vicious_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
                if(id=='4') {
                    this.$('#corebelieve').val(this.model.get("corebelieve"));
                    this.$('#coreissue').val(this.model.get("coreissue"));
                    var feeders=  _.clone(this.model.get("feeders"));
                    console.log("feeders.length: " + feeders.length);
                    for(i=0; i< feeders.length; i++){
                        this.$("#listfeeders").append("<li class='elementosfinos'><a><h1>"+feeders[i][0]+"</h1></a><a class='ui-icon-alt elementosfinos deletefeeder' data-transition='none' ></a> </li>");
                    }
                }
	
                if(id=='1') {
                    // Gráfico sin feeders.
                    var canvas = this.$el.find('canvas')[0];
                    console.log("canvas primero metido");
                    this.pintar(canvas, "no feeders");
                }

                if(id=='2'){ //LLENAR FEEDERS PARA MARCAR EXITS
                    var feeders=  _.clone(this.model.get("feeders"));
                    for(i=0; i< feeders.length; i++){
                        if(feeders[i].length>1){
                            console.log("feeder con exit: " + feeders[i]);
                            this.$("#feederexitlist").append("<li><h3 class='hoffmanfont'>" + feeders[i][0] + "</h3><div data-role='fieldcontain' data-controltype='textinput'><input placeholder='" + historycollection.get("languages").get("dic_vicious_setexit") + "' value='" + feeders[i][1] + "' type='text'></div></li>");
                        }
                        else
                            this.$("#feederexitlist").append("<li><h3 class='hoffmanfont'>" + feeders[i] + "</h3><div data-role='fieldcontain' data-controltype='textinput'><input placeholder='" + historycollection.get("languages").get("dic_vicious_setexit") + "' value='' type='text'></div></li>");
                    }
                }

                if(id=='3'){
                    var feeders=  _.clone(this.model.get("feeders"));
                    $("#feederexitlist input").each(function( index ) {

                        if($(this).val()!='') feeders[index].push($(this).val());
	
                    });
                    this.model.set("feeders", feeders);
                    console.log(feeders);
                    var canvas = this.$el.find('canvas')[0];
                    console.log("canvas segundo metido");
                    this.pintar(canvas, "with feeders");
                    this.$("#auxcanvas").append("<canvas id='canvas' style='display:none'></canvas>");
                    setTimeout(function(){
                        // ponemos fondo blanco y exportamos
                        canvasid=document.getElementById("myCanvas");
                        destinationCanvas = document.getElementById("canvas");
                        destinationCanvas.width = canvasid.width;
                        destinationCanvas.height = canvasid.height;
                        destCtx = destinationCanvas.getContext('2d');
                        destCtx.fillStyle = "#FFFFFF";
                        destCtx.fillRect(0,0,canvasid.width,canvasid.height);
                        destCtx.drawImage(canvasid, 0, 0);
		
                    },500);
		
                }
		
            },
	
	
            finish: function(){
		
                destinationCanvas = document.getElementById("canvas");
                canvasimageShare=destinationCanvas.toDataURL("image/png");
                this.model.set("uriShare",canvasimageShare);
		
                canvasid=document.getElementById("myCanvas");
                canvasimage=canvasid.toDataURL("image/png");
                this.model.set("uri",canvasimage);
		
                this.model.set("tool","vicious");
                this.history.create(this.model);
                Backbone.history.navigate("#summary", {
                    trigger: true
                });
	
            },
	
            checkboxevt: function (){
                donot=this.history.get("donotshow");

                if($("#checkbox").attr("data-icon")=="checkbox-on") //La lógica parece estar al revés, pero es que el evento de click llega antes de que cambie el estado del elemento
                    donot.set("viciousDoNotShow",false);
                else
                    donot.set("viciousDoNotShow",true);
	
                this.history.get("donotshow").destroy();
                this.history.create(donot);
	
            },
	
            share: function(){
                var self=this;
		
                if(this.model.get("uriShare")!=""){//para el history
                    canvasimageShare=this.model.get("uriShare");
                    console.log("Cargando ShareUri del modelo:");
                    console.log(this.model.get("uriShare"));
                }
                else{//para cuando lo acabas de hacer
                    console.log("Cargando ShareUri del DOM:");
                    destinationCanvas=document.getElementById("canvas");
                    canvasimageShare=destinationCanvas.toDataURL("image/png");
                    console.log(canvasimageShare);
                }
                try{
                    window.plugins.socialsharing.share("", null, canvasimageShare, null);
                }
                catch(e){
                    alert(e);
                }
            },
	
            addfeeder: function(){
                try{
                    if(device.platform=='Android'){
                        $('#keyspace').attr('style','visibility: hidden;');
                    }
                }
            catch(e){}
            if($('#actualfeeder').val()!=""){
                var feeders=  _.clone(this.model.get("feeders"));
                feeders.push([$('#actualfeeder').val()]); // Va metido en una lista para poder añadir después las exits.

                this.model.set("feeders", feeders);
			
			
                $("#listfeeders").append("<li class='elementosfinos'><a><h1>"+$('#actualfeeder').val()+"</h1></a><a class='ui-icon-alt elementosfinos deletefeeder' data-transition='none' ></a> </li>");
					
                $("#listfeeders").listview("refresh");
                $('#actualfeeder').val('');
                setTimeout(function(){
                    $('#actualfeeder').focus();
                },0);
                try{
                    if(device.platform=='Android'){
                        setTimeout(function(){
                            $("div[data-role='footer']").attr('class', 'ui-footer ui-bar-a ui-footer-fixed slideup ui-panel-content-fixed-toolbar ui-panel-content-fixed-toolbar-closed');
                        },200);
                    }
				
                }
                catch(e){}
			
            }
        },
	
        deletefeeder: function(ev){
	
            var index = $( "#listfeeders li" ).index($(ev.target).parent().parent());
            console.log ($(ev.target).parent().parent());
            console.log("Elimino el elemento con índice " + index);
            var feeders=  _.clone(this.model.get("feeders"));
            console.log("La lista era " + feeders);
            feeders.splice(index, 1);
            console.log("Y queda así " + feeders);
            this.model.set("feeders", feeders);

            $(ev.target).parents('li').remove();
	 
            $("#listfeeders").listview("refresh");
            //feeders[1]=[feeders[1], "salida"];
            console.log(feeders);
	 
        },
	

        wrapText: function  (str, int_width, str_break, cut) {
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
        },



	
        pintar: function(canvas, level){
	
            // Level can be "no feeders" or "with feeders"
            console.log("HOLA "+ this.model.get("corebelieve"));
            // Datos que después tendrán que pasarse como parámetros
            var feeders = _.clone(this.model.get("feeders"));
            var corebelieve = this.model.get("corebelieve");
            var coreissue = this.model.get("coreissue");
            feeders.unshift([corebelieve]);
            //[["Esta es la primera caja"], ["Esta es la segunda caja"],
            //			 ["Esta es la tercera caja",  "Salgo también por este lado de aquí."],
            //		     ["Esta es la cuarta caja", "Salgo por allá."], ["Esta es la quinta caja y es más larga que las otras"],
            //		     ["La sexta es corta"]];
            // Create an empty project and a view for the canvas:
            paper.setup(canvas);
            // Chapuza: calculo el ancho del dispositivo y le resto a ojo los márgenes
            paper.view.viewSize.width = $(window).width() - 70;
            paper.view.viewSize.height = 400;
            console.log(canvas);
            console.log(feeders);


		
            // Variables de dimensiones
            console.log("width:", paper.view.size.width);
            var col1 = paper.view.size.width * 0.40;
            var col2 = paper.view.size.width * 0.60;
            if (level == "no feeders") {
                col1 = paper.view.size.width * 0.30;
                col2 = paper.view.size.width * 0.70;
            }
            var mitad = paper.view.size.width * 0.5;
            var y = 50, delta_y = 50, mini_delta_y = 20, margen_y = 25;
            var ancho_palabras_caja_texto = 25;
            var ancho_palabras_caja_titulo = 40;
            var alto_flecha_curva = 40;
            var redondeo_curva = 15;
            var angulo_punta_flecha = 160;
            var long_punta_flecha = 10;
            var long_flecha_horiz = 40;
            var separacion_horiz_texto = 10;
            var talla_fuente_titulo = 16;
            var talla_fuente = 12;
            var separacion_titulo = 50;
            var color = 'black';
            var grosor = 2;
            var font = 'wiesbadenswingroman, ITCNewBaskervilleStdRoman, Arial';
            var diam_bola = 5;
            // Afinar ancho palabras caja texto (para pantallas estrechas)
            var ancho_pixels_caja_texto = paper.view.size.width * 0.15;
            var texto = new paper.PointText(new paper.Point(0,0));
            texto.justification = 'left';
            texto.fontFamily = font;
            texto.fontSize = talla_fuente;
            texto.content = this.wrapText("a b c d e f g h i j k l m n o p q r s t u v w x y z",
                ancho_palabras_caja_texto);
            while(texto.bounds.width > ancho_pixels_caja_texto) {
                texto.remove();
                ancho_palabras_caja_texto --;
                texto = new paper.PointText(new paper.Point(0,0));
                texto.justification = 'left';
                texto.fontFamily = font;
                texto.fontSize = talla_fuente;
                texto.content = this.wrapText("a b c d e f g h i j k l m n o p q r s t u v w x y z",
                    ancho_palabras_caja_texto);
            }
            texto.remove();
            // Afinar ancho palabras caja título (para pantallas estrechas)
            var ancho_pixels_caja_titulo = paper.view.size.width * 0.80;
            var texto = new paper.PointText(new paper.Point(0,0));
            texto.justification = 'left';
            texto.fontFamily = font;
            texto.fontSize = talla_fuente_titulo;
            texto.content = this.wrapText("a b c d e f g h i j k l m n o p q r s t u v w x y z",
                ancho_palabras_caja_titulo);
            while(texto.bounds.width > ancho_pixels_caja_titulo) {
                texto.remove();
                ancho_palabras_caja_titulo --;
                texto = new paper.PointText(new paper.Point(0,0));
                texto.justification = 'left';
                texto.fontFamily = font;
                texto.fontSize = talla_fuente_titulo;
                texto.content = this.wrapText("a b c d e f g h i j k l m n o p q r s t u v w x y z",
                    ancho_palabras_caja_titulo);
            }
            texto.remove();

            // puntas de flecha
            var vect_pta_flecha_abajo = new paper.Point(0,long_punta_flecha);
            var vect_pta_flecha_abajo1 = vect_pta_flecha_abajo.rotate(angulo_punta_flecha);
            var vect_pta_flecha_abajo2 = vect_pta_flecha_abajo.rotate( - angulo_punta_flecha);
            var vect_pta_flecha_arriba = new paper.Point(0,-long_punta_flecha);
            var vect_pta_flecha_arriba1 = vect_pta_flecha_arriba.rotate(angulo_punta_flecha);
            var vect_pta_flecha_arriba2 = vect_pta_flecha_arriba.rotate( - angulo_punta_flecha);
            var vect_pta_flecha_der = new paper.Point(long_punta_flecha, 0);
            var vect_pta_flecha_der1 = vect_pta_flecha_der.rotate(angulo_punta_flecha);
            var vect_pta_flecha_der2 = vect_pta_flecha_der.rotate( - angulo_punta_flecha);
            var vect_pta_flecha_izq = new paper.Point(-long_punta_flecha,0);
            var vect_pta_flecha_izq1 = vect_pta_flecha_izq.rotate(angulo_punta_flecha);
            var vect_pta_flecha_izq2 = vect_pta_flecha_izq.rotate( - angulo_punta_flecha);

            // Core Issue

            var texto = new paper.PointText(new paper.Point(mitad, y));
            texto.justification = 'left';
            texto.fillColor = color;
            texto.fontFamily = font;
            texto.fontSize = talla_fuente_titulo;
            texto.content = this.wrapText(coreissue, ancho_palabras_caja_titulo, "\n", true);
            texto.position.x -= texto.bounds.width / 2;
            y += texto.bounds.height + separacion_titulo;

            // Flecha superior
            var flecha_sup = new paper.Path();
            flecha_sup.strokeColor = color;
            flecha_sup.strokeWidth = grosor;
            var punta = new paper.Point(col2, y);
            flecha_sup.add(new paper.Point(col1, y),
                new paper.Point(col1, y - alto_flecha_curva + redondeo_curva),
                new paper.Point(col1 + redondeo_curva, y - alto_flecha_curva),
                new paper.Point(mitad, y - alto_flecha_curva),
                new paper.Point(col2 - redondeo_curva, y - alto_flecha_curva),
                new paper.Point(col2, y - alto_flecha_curva + redondeo_curva),
                punta);
            console.log(flecha_sup);
            flecha_sup.smooth();

            // Punta de la flecha
            var punta_flecha = new paper.Path();
            punta_flecha.strokeColor = color;
            punta_flecha.strokeWidth = grosor;
            punta_flecha.add(new paper.Point(punta.x + vect_pta_flecha_abajo1.x, punta.y + vect_pta_flecha_abajo1.y),
                punta,
                new paper.Point(punta.x + vect_pta_flecha_abajo2.x, punta.y + vect_pta_flecha_abajo2.y));


            // Recorrido de los textos
            y1 = y;
            y2 = y + margen_y;
		
            var textos = [];
            var flecha;
            var bola;
            // Columna derecha
            for(var i=0; i<feeders.length/2; i++) {
                textos.push(new paper.PointText(new paper.Point(col2, y2)));
                texto = textos[textos.length - 1];
                texto.justification = 'left';
                texto.fillColor = color;
                texto.fontFamily = font;
                texto.fontSize = talla_fuente;

                texto.content = this.wrapText(feeders[i][0], ancho_palabras_caja_texto, "\n", true);
                y2 += texto.bounds.height;
                texto.position.x -= texto.bounds.width / 2;

                // Exit si lo hay
                if (level == "with feeders" && feeders[i].length > 1) {
                    flecha = new paper.Path();
                    flecha.add(new paper.Point(col2, y2), new paper.Point(col2, y2 + mini_delta_y));
                    flecha.strokeColor = color;
                    flecha.strokeWidth = grosor;

                    y2 += mini_delta_y;

                    bola = new paper.Path.Circle(new paper.Point(col2, y2 + diam_bola), diam_bola);
                    bola.strokeColor = color;
                    bola.strokeWidth = grosor;

                    flecha = new paper.Path();
                    punta = new paper.Point(col2 + diam_bola  + long_flecha_horiz, y2 + diam_bola);
                    flecha.add(new paper.Point(col2 + diam_bola, y2 + diam_bola),
                        punta);
                    flecha.strokeColor = color;
                    flecha.strokeWidth = grosor;


                    // Punta de la flecha
                    punta_flecha = new paper.Path();
                    punta_flecha.strokeColor = color;
                    punta_flecha.strokeWidth = grosor;
                    punta_flecha.add(new paper.Point(punta.x + vect_pta_flecha_der1.x, punta.y + vect_pta_flecha_der1.y),
                        punta,
                        new paper.Point(punta.x + vect_pta_flecha_der2.x, punta.y + vect_pta_flecha_der2.y));
				
                    // Texto
                    punta.x += separacion_horiz_texto;
                    textos.push(new paper.PointText(punta));
                    texto = textos[textos.length - 1];
                    texto.justification = 'left';
                    texto.fillColor = color;
                    texto.fontFamily = font;
                    texto.fontSize = talla_fuente;
                    texto.content = this.wrapText(feeders[i][1], ancho_palabras_caja_texto, "\n", true);
                    //y2 += texto.bounds.height;
                    //texto.position.x -= texto.bounds.width / 2;
                    y2 += diam_bola * 2;

                }


                if (i != Math.ceil(feeders.length/2) - 1) {
                    flecha = new paper.Path();
                    punta = new paper.Point(col2, y2 + delta_y);
                    flecha.add(new paper.Point(col2, y2), punta);
                    flecha.strokeColor = color;
                    flecha.strokeWidth = grosor;
                    // Punta de la flecha
                    punta_flecha = new paper.Path();
                    punta_flecha.strokeColor = color;
                    punta_flecha.strokeWidth = grosor;
                    punta_flecha.add(new paper.Point(punta.x + vect_pta_flecha_abajo1.x, punta.y + vect_pta_flecha_abajo1.y),
                        punta,
                        new paper.Point(punta.x + vect_pta_flecha_abajo2.x, punta.y + vect_pta_flecha_abajo2.y));

                    y2 += delta_y + margen_y;
                }
            }
		
            // Columna izquierda
            for(var i = feeders.length - 1 ; i >= Math.ceil(feeders.length/2); i--) {

                // Exit si lo hay
                if (level == "with feeders" && feeders[i].length > 1) {

                    bola = new paper.Path.Circle(new paper.Point(col1, y1 + diam_bola), diam_bola);
                    bola.strokeColor = color;
                    bola.strokeWidth = grosor;

                    flecha = new paper.Path();
                    punta = new paper.Point(col1 - diam_bola  - long_flecha_horiz, y1 + diam_bola);
                    flecha.add(new paper.Point(col1 - diam_bola, y1 + diam_bola),
                        punta);
                    flecha.strokeColor = color;
                    flecha.strokeWidth = grosor;

                    // Punta de la flecha
                    punta_flecha = new paper.Path();
                    punta_flecha.strokeColor = color;
                    punta_flecha.strokeWidth = grosor;
                    punta_flecha.add(new paper.Point(punta.x + vect_pta_flecha_izq1.x, punta.y + vect_pta_flecha_izq1.y),
                        punta,
                        new paper.Point(punta.x + vect_pta_flecha_izq2.x, punta.y + vect_pta_flecha_izq2.y));
				
                    // Texto
                    punta.x -= separacion_horiz_texto;
                    textos.push(new paper.PointText(punta));
                    texto = textos[textos.length - 1];
                    texto.justification = 'left';
                    texto.fillColor = color;
                    texto.fontFamily = font;
                    texto.fontSize = talla_fuente;
                    texto.content = this.wrapText(feeders[i][1], ancho_palabras_caja_texto, "\n", true);
                    texto.position.x -= texto.bounds.width;
				

                    flecha = new paper.Path();
                    flecha.add(new paper.Point(col1, y1 + diam_bola * 2),
                        new paper.Point(col1, y1 + diam_bola * 2  + mini_delta_y));
                    flecha.strokeColor = color;
                    flecha.strokeWidth = grosor;

                    y1 += mini_delta_y + diam_bola * 2 + margen_y;


                }
                else y1 += margen_y;


                //y1 += margen_y;
                textos.push(new paper.PointText(new paper.Point(col1, y1)));
                texto = textos[textos.length - 1];
                texto.justification = 'left';
                texto.fillColor = color;
                texto.fontFamily = font;
                texto.fontSize = talla_fuente;
                texto.content = this.wrapText(feeders[i][0], ancho_palabras_caja_texto, "\n", true); //Formula para posicion en lista feeders
                y1 += texto.bounds.height;
                texto.position.x -= texto.bounds.width / 2;


                if (i > Math.ceil(feeders.length/2)) {
                    flecha = new paper.Path();
                    punta = new paper.Point(col1, y1);
                    flecha.add(punta, new paper.Point(col1, y1 + delta_y));
                    flecha.strokeColor = color;
                    flecha.strokeWidth = grosor;
                    // Punta de la flecha
                    punta_flecha = new paper.Path();
                    punta_flecha.strokeColor = color;
                    punta_flecha.strokeWidth = grosor;
                    punta_flecha.add(new paper.Point(punta.x + vect_pta_flecha_arriba1.x, punta.y + vect_pta_flecha_arriba1.y),
                        punta,
                        new paper.Point(punta.x + vect_pta_flecha_arriba2.x, punta.y + vect_pta_flecha_arriba2.y));

                    y1 += delta_y;
                }
            }


            // Flecha inferior

            var ymax = y1 > y2 ? y1 : y2;
            var flecha_inf = new paper.Path();
            punta = new paper.Point(col1, y1);
            flecha_inf.strokeColor = color;
            flecha_inf.strokeWidth = grosor;
            flecha_inf.add(punta,
                new paper.Point(col1, ymax + alto_flecha_curva - redondeo_curva),
                new paper.Point(col1, ymax + alto_flecha_curva),
                new paper.Point(col1 + redondeo_curva, ymax + alto_flecha_curva),
                new paper.Point(mitad, ymax + alto_flecha_curva),
                new paper.Point(col2 - redondeo_curva, ymax + alto_flecha_curva),
                new paper.Point(col2, ymax + alto_flecha_curva),
                new paper.Point(col2, ymax + alto_flecha_curva - redondeo_curva),
                new paper.Point(col2, y2));
            //flecha_inf.fullySelected = true;
            flecha_inf.smooth();
            // Punta de la flecha
            punta_flecha = new paper.Path();
            punta_flecha.strokeColor = color;
            punta_flecha.strokeWidth = grosor;
            punta_flecha.add(new paper.Point(punta.x + vect_pta_flecha_arriba1.x, punta.y + vect_pta_flecha_arriba1.y),
                punta,
                new paper.Point(punta.x + vect_pta_flecha_arriba2.x, punta.y + vect_pta_flecha_arriba2.y));

            // Actualiza la altura del canvas.
            paper.view.viewSize.height = ymax + alto_flecha_curva + delta_y;
            // Dibuja la página
            paper.view.draw(); //esta instrucción da error si en la página cargada no hay elemento canvas
	
        }

        });

    return viciousView;
});
