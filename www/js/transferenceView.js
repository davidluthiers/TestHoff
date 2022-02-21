

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!Templates/transference0.html',
    'text!Templates/transference1.html',
    'text!Templates/transference2.html',
    'text!Templates/transference3.html',
    'text!Templates/transference4.html',
    'text!Templates/transference5.html',
    'text!Templates/transference6.html',
    'text!Templates/transference7.html',
    'text!Templates/transference8.html',
    'text!Templates/transference9.html',
    'text!Templates/transferencehistory.html',
    'text!Templates/transferencehistorylong.html',
    'text!Templates/summary.html',
    'text!Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, transference0, transference1, transference2, transference3, transference4, transference5, transference6, transference7, transference8, transference9, transferencehistory, transferencehistorylong, summary, headerandpanel){



        transferenceView = Backbone.View.extend({
  
            events:{
                "click .addsusnegas":"addnegas",
                "click .deletenega":"deletenega",
                "click .addmisreac":"addreactions",
                "click .deletereaction":"deletereaction",
                //"mousedown .markperceptionorigen":"perceptionorigen",
                "touchstart .markperceptionorigen":"perceptionorigen",
                //"mousedown .markreactionorigen":"reactionorigen",
                "touchstart .markreactionorigen":"reactionorigen",
                "click .eleccionfinal":"eleccionfinal",
                "click .ui-input-text":"footerfix",
                "click .addsuscual":"addQuality",
                "click .deletequal":"deleteQuality",
                "click #textareadesctransfer":"footerfix"
            },
	 
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
                languagevar=this.history.get("languages");
                this.M = languagevar.get("dic_transf_M");
                this.F = languagevar.get("dic_transf_F");
                this.MS = languagevar.get("dic_transf_MS");
                this.FS = languagevar.get("dic_transf_FS");

                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( transference0 );
                        this.model.set("tool", "transference");
		
                        break;
                    case '1':
                        compiledTemplate = _.template( transference1 );
						if(typeof $('#textinput6').val() != "undefined"){
							this.model.set({
								transferencewith:$('#textinput6').val(),
								situations:$('#textareadesctransfer').val(),
								finished: false
							});
						}
			  
                        break;
                    case '2':
                        compiledTemplate = _.template( transference2);
			 
                        break;
                    case '3':
                        compiledTemplate = _.template( transference3 );
			  
                        break;
                    case '4':
                        compiledTemplate = _.template( transference4 );
			  
                        break;
                    case '5':
                        compiledTemplate = _.template( transference5 );//LONG
			  
                        break;
                    case '6':
                        compiledTemplate = _.template( transference6 );//LONG
			  
                        break;
                    case '7':
                        compiledTemplate = _.template( transference7 );//LONG
			  
                        break;
                    case '8':
                        compiledTemplate = _.template( transference8 );//LONG
			  
                        break;
                    case '9':
                        compiledTemplate = _.template( transference9 );
			  
                        break;
                    case '10':
                        compiledTemplate = _.template( summary );
			  
                        break;
                    case '11':
                        compiledTemplate = _.template( transferencehistory ); //transference resume
			  
                        break;
                }
	
	
				console.log("transference model: ");
				console.log(this.model);
                if(id>19){
                    historyindex=id-20;
                    var self=this;
                    this.model= historycollection.at(historyindex);
                    if(historycollection.at(historyindex).get("version")=="Long") //long
                        compiledTemplate = _.template( transferencehistorylong );
                    else
                        compiledTemplate = _.template( transferencehistory ); //short
                    result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                    compiledheaderandpanel=_.template( headerandpanel );
                    this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
		
                }
                else{
	
                    this.model.set("notify",true);
                    var self=this;
                    historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_transf_helppanel"));
                    result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                    compiledheaderandpanel=_.template( headerandpanel );
                    this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
                }
			

                if(id=='1'){
	
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listsusnegas").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+perceptions[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletenega elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
	
                }
	
                if(id=='2'){
	
                    var reactions=  _.clone(this.model.get("reactions"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listmisreac").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+reactions[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletereaction elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
	
                }
	
                if(id=='3'){
	
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listadjorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+perceptions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' name='' type='checkbox'"+ perceptionslike[i][0] +"> <label for='checkbox14' class='markperceptionorigen'>" + this.M + "</label> <input id='checkbox15' name='' type='checkbox'"+ perceptionslike[i][1] +"> <label for='checkbox15' class='markperceptionorigen'>" + this.F + "</label> <input id='checkbox16' name='' type='checkbox'"+ perceptionslike[i][2] +"> <label for='checkbox16' class='markperceptionorigen'>" + this.MS + "</label> <input id='checkbox17' name='' type='checkbox'"+ perceptionslike[i][3] +"> <label for='checkbox17' class='markperceptionorigen'>" + this.FS + "</label> </fieldset> </div></li>");
	
                }
	
                if(id=='4'){
	
                    var reactions=  _.clone(this.model.get("reactions"));
                    var reactionslike=  _.clone(this.model.get("reactionslike"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listreacorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+reactions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' name='' type='checkbox'"+ reactionslike[i][0] +"> <label for='checkbox14' class='markreactionorigen'>" + this.M + "</label> <input id='checkbox15' name='' type='checkbox'"+ reactionslike[i][1] +"> <label for='checkbox15' class='markreactionorigen'>" + this.F + "</label> <input id='checkbox16' name='' type='checkbox'"+ reactionslike[i][2] +"> <label for='checkbox16' class='markreactionorigen'>" + this.MS + "</label> <input id='checkbox17' name='' type='checkbox'"+ reactionslike[i][3] +"> <label for='checkbox17' class='markreactionorigen'>" + this.FS + "</label> </fieldset> </div></li>");

                }
	
                if(id=='6'){
                    if($('#textareaotrasareas').val()!=undefined){
                        this.model.set("otherAreas", $('#textareaotrasareas').val());
                    }
                }
	
                if(id=='7'){
		
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listsusnegas").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+perceptions[i]+"</h1></a><a data-icon='delete' style='display:none' class='ui-icon-alt deletenega elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
		
                    if($('#textareadarkside').val()!=undefined){
                        this.model.set("darkSideWin", $('#textareadarkside').val());
                    }
                }
	
                if(id=='8'){
	
                    var qualities=  _.clone(this.model.get("qualities"));
                    for(i=0; i< qualities.length; i++)
                        this.$("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+qualities[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
                }
	
	
                if(id=='9'){
                    var self=this;
                    this.switchlistener = setInterval(function () {
                        if($("#freeswitch").val()!=this.lastoption){
                            console.log($("#freeswitch").val());
                            this.lastoption=$("#freeswitch").val();
                            if(this.lastoption=='yes'){
                                $('#transferbar1').show();
                                $('#transferbar2').hide();
                                $('#transferbar3').hide();
                            }
                            else {
                                $('#transferbar2').show();
                                $('#transferbar3').hide();
                                $('#transferbar1').hide();
                                if(typeof self.model==='undefined'){}
                                else self.model.set("notify",false);
				
                            }
                        }
                        $('.ui-slider-inneroffset > a').attr('href','');
                    }, 1000);
	
                }
	
	
                if (id=='10'){ // fin del transference, guardar
                    this.model.set("finished",true);
                    clearInterval(this.switchlistener);
                    historycollection.create(this.model);
				
                }
		
                if(id=='11'){
		
                    this.$(".botonstart").attr("href","#transference4"); //botón back
                    this.$(".botonstart").attr("class","botonprev");
                    this.$("#transresumeFooter").append("<a class='botonnext' data-role='button' data-transition='none' href='#transference9' data-icon='arrow-r' data-iconpos='right'>" + historycollection.get("languages").get("dic_next") + "</a>"); //botón next (a la silueta)
                    if(this.model.get("version")=="Long"){
                        var qualities=  _.clone(this.model.get("qualities"));
                        for(i=0; i< qualities.length; i++)
                            this.$("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+qualities[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' style='display:none' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    }
	
                    this.$('#reactionto').append("<span class='datoshistorytransference'>" + this.model.get("transferencewith") + "</span>");
                    this.$('#situations').append("<span class='datoshistorytransference'>" + this.model.get("situations") + "</span>");
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listadjorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+
                            perceptions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
                    var reactions=  _.clone(this.model.get("reactions"));
                    var reactionslike=  _.clone(this.model.get("reactionslike"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listreacorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+reactions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
	
			
		
                }
		
                if(id>19){ //this.model=historycollection...
		
                    if(historycollection.at(historyindex).get("version")=="Long"){
                        var qualities=  _.clone(this.model.get("qualities"));
                        for(i=0; i< qualities.length; i++)
                            this.$("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+qualities[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' style='display:none' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    }
	
                    this.$('#reactionto').append("<span class='datoshistorytransference'>" + historycollection.at(historyindex).get("transferencewith") + "</span>");
                    this.$('#situations').append("<span class='datoshistorytransference'>" + historycollection.at(historyindex).get("situations") + "</span>");
                    var perceptions=  _.clone(historycollection.at(historyindex).get("perceptions"));
                    var perceptionslike=  _.clone(historycollection.at(historyindex).get("perceptionslike"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listadjorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+
                            perceptions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
                    var reactions=  _.clone(historycollection.at(historyindex).get("reactions"));
                    var reactionslike=  _.clone(historycollection.at(historyindex).get("reactionslike"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listreacorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+reactions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
	
	
                }
	
            },
	
            addQuality: function(){
	
                try{
                    if(device.platform=='Android'){
                        $('#keyspace').attr('style','visibility: hidden;');
                    }
                }
                catch(e){
                    console.log(e);
                }
                if($('#actualsuscual').val()!=""){
                    var quali=  _.clone(this.model.get("qualities"));
                    quali.push($('#actualsuscual').val());

                    this.model.set("qualities", quali);

                    $("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+$('#actualsuscual').val()+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
					
                    $("#listsuscual").listview("refresh");
                    $('#actualsuscual').val('');
                    setTimeout(function(){
                        $('#actualsuscual').focus();
                    },0);
                    this.footerfix();
                }
            },
	
		
            perceptionorigen: function(ev){
	
                var index = $( "#listadjorig li" ).index($(ev.target).parents('li'));
                var clave;
                console.log(index);
                console.log($(ev.target).text());
                var perceptionslike=  _.clone(this.model.get("perceptionslike"));

                if($(ev.target).text()==this.M || $(ev.target).text()==this.F|| $(ev.target).text()==this.MS|| $(ev.target).text()==this.FS)
                    clave=$(ev.target).text();
                else if($(ev.target).html()==this.M || $(ev.target).html()==this.F|| $(ev.target).html()==this.MS|| $(ev.target).html()==this.FS)
                    clave=$(ev.target).html();
                else clave= $(ev.target).find(".ui-btn-text").text();
	
                console.log("justo ->"+clave+"<-");
	
                switch(clave)
                {
                    case this.M:
                        if(perceptionslike[index][0]==="checked='checked'")
                            perceptionslike[index][0]='';
                        else perceptionslike[index][0]="checked='checked'";
			
                        break;
                    case this.F:
                        if(perceptionslike[index][1]==="checked='checked'")
                            perceptionslike[index][1]='';
                        else perceptionslike[index][1]="checked='checked'";
		
                        break;
                    case this.MS:
                        if(perceptionslike[index][2]==="checked='checked'")
                            perceptionslike[index][2]='';
                        else perceptionslike[index][2]="checked='checked'";
		
                        break;
                    case this.FS:
                        if(perceptionslike[index][3]==="checked='checked'")
                            perceptionslike[index][3]='';
                        else perceptionslike[index][3]="checked='checked'";
		
                        break;
			  
                }
                console.log($(ev.target));

                this.model.set("perceptionslike", perceptionslike);
	
            },
	
            footerfix: function (){
	
                if(device.platform=='Android'){
                    setTimeout(function(){
                        $("div[data-role='footer']").attr('class', 'ui-footer ui-bar-a ui-footer-fixed slideup ui-panel-content-fixed-toolbar ui-panel-content-fixed-toolbar-closed');
                    },1500);
                }
            },
	
            reactionorigen: function(ev){
	
                var index = $( "#listreacorig li" ).index($(ev.target).parents('li'));
                var clave;
                var reactionslike=  _.clone(this.model.get("reactionslike"));
                console.log("TEXTO:");
                console.log($(ev.target).find(".ui-btn-text").text());
                console.log("HTML:");
                console.log($(ev.target).html());
                console.log("Event element:");
                console.log($(ev.target));
                if($(ev.target).text()==this.M || $(ev.target).text()==this.F|| $(ev.target).text()==this.MS|| $(ev.target).text()==this.FS)
                    clave=$(ev.target).text();
                else if($(ev.target).html()==this.M || $(ev.target).html()==this.F|| $(ev.target).html()==this.MS|| $(ev.target).html()==this.FS)
                    clave=$(ev.target).html();
                else clave= $(ev.target).find(".ui-btn-text").text();
	
                console.log("index: " + index);
                switch(clave)
                {
                    case this.M:
                        if(reactionslike[index][0]==="checked='checked'")
                            reactionslike[index][0]='';
                        else reactionslike[index][0]="checked='checked'";
			
                        break;
                    case this.F:
                        if(reactionslike[index][1]==="checked='checked'")
                            reactionslike[index][1]='';
                        else reactionslike[index][1]="checked='checked'";
		
                        break;
                    case this.MS:
                        if(reactionslike[index][2]==="checked='checked'")
                            reactionslike[index][2]='';
                        else reactionslike[index][2]="checked='checked'";
		
                        break;
                    case this.FS:
                        if(reactionslike[index][3]==="checked='checked'")
                            reactionslike[index][3]='';
                        else reactionslike[index][3]="checked='checked'";
		
                        break;
			  
                }
			 
                this.model.set("reactionslike", reactionslike);
                console.log(reactionslike);
            },
	
            addnegas: function(){
                if($('#actualsusnegas').val()!=''){
                    var altura=470 + ($("#listsusnegas").length*50);
                    $('.hojacuaderno').attr("style","min-height:" + altura + "px");
                    var addnegas=  _.clone(this.model.get("perceptions"));
                    var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                    addnegas.push($('#actualsusnegas').val());
                    this.model.set("perceptions", addnegas);
                    perceptionslike[addnegas.length-1]= ['','','',''];
                    this.model.set("perceptionslike", perceptionslike);
                    if($('#actualsusnegas').val()!="")
                        $("#listsusnegas").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+$('#actualsusnegas').val()+"</h1></a><a data-icon='delete' class='ui-icon-alt deletenega elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    $("#listsusnegas").listview("refresh");
                    $('#actualsusnegas').val('');
                }
                setTimeout(function(){
                    $('#actualsusnegas').focus();
                },0);
	
	
            },
	
            deletenega: function(ev){
	
                var index = $( "#listsusnegas li" ).index($(ev.target).parent().parent());
                var negas=  _.clone(this.model.get("perceptions"));
                var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                negas.splice(index, 1);
                perceptionslike.splice(index, 1);
                this.model.set("perceptions", negas);
                this.model.set("perceptionslike", perceptionslike);
                $(ev.target).parents('li').remove();
            //$("#listfeeders").listview("refresh");
	 
            },
	
            deleteQuality: function(ev){
		
                var index = $( "#listsuscual li" ).index($(ev.target).parent().parent());
                var quals=  _.clone(this.model.get("qualities"));
                quals.splice(index, 1);
                this.model.set("qualities", quals);
                $(ev.target).parents('li').remove();
	
            },
	
            addreactions: function(){
                if($('#actualmisreac').val()!=''){
                    var altura=470 + ($("#listmisreac").length*50);
                    $('.hojacuaderno').attr("style","min-height:" + altura + "px");
                    var addreactions=  _.clone(this.model.get("reactions"));
                    var reactionslike=  _.clone(this.model.get("reactionslike"));
                    addreactions.push($('#actualmisreac').val());
                    this.model.set("reactions", addreactions);
                    reactionslike[addreactions.length-1]= ['','','',''];
                    this.model.set("reactionslike", reactionslike);
                    if($('#actualmisreac').val()!="")
                        $("#listmisreac").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+$('#actualmisreac').val()+"</h1></a><a data-icon='delete' class='ui-icon-alt deletereaction elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    $("#listmisreac").listview("refresh");
                    $('#actualmisreac').val('');
                }
                setTimeout(function(){
                    $('#actualmisreac').focus();
                },0);
	
	
            },
	
            deletereaction: function(ev){
	
                var index = $( "#listmisreac li" ).index($(ev.target).parent().parent());
                var reactions=  _.clone(this.model.get("reactions"));
                var reactionslike=  _.clone(this.model.get("reactionslike"));
                reactions.splice(index, 1);
                reactionslike.splice(index, 1);
                this.model.set("reactions", reactions);
                this.model.set("reactionslike", reactionslike);
                $(ev.target).parents('li').remove();
            //$("#listfeeders").listview("refresh");
	 
            },
	
            eleccionfinal: function(ev){
	
                var modelaux=this; //settimeout pierde el scope de this, necesito una variable auxiliar...
                setTimeout(function(){	//pongo delay puesto que el evento del click se lanza mucho antes de que cambie el HTML del radiobutton a checked, por lo que hay que esperar
	
                    if($("input[type='radio'][name='myButtonho']:checked").val()=='1'){		//free of transference
	
                        $('#transferbar1').show();
                        $('#transferbar2').hide();
                        $('#transferbar3').hide();

                    }
                    else{
	
                        $('#transferbar2').show();
                        $('#transferbar3').hide();
                        $('#transferbar1').hide();
                        modelaux.model.set("notify",false);
                    }
	
                },50);
	
	
	 
            }

        });

        return transferenceView;
    });